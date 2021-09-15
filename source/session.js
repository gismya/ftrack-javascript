// :copyright: Copyright (c) 2016 ftrack

import forIn from 'lodash/forIn';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import find from 'lodash/find';
import moment from 'moment';
import loglevel from 'loglevel';
import uuidV4 from 'uuid/v4';

import EventHub from './event_hub';
import { queryOperation, createOperation, updateOperation, deleteOperation, searchOperation } from './operation';
import { ServerPermissionDeniedError, ServerValidationError, ServerError, CreateComponentError } from './error';
import { SERVER_LOCATION_ID } from './constant';
import encodeUriParameters from './util/encode_uri_parameters';
import normalizeString from './util/normalize_string';

const logger = loglevel.getLogger('ftrack_api');

const ENCODE_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

/**
 * Create component from *file* and add to server location.
 *
 * @param  {fileName} The name of the file.
 * @return {array} Array with [basename, extension] from filename.
 */
function splitFileExtension(fileName) {
    let basename = fileName || '';
    let extension = fileName.slice(
        (
            Math.max(
                0, fileName.lastIndexOf('.')
            ) || Infinity
        ) + 1
    ) || '';

    if (extension.length) {
        extension = `.${extension}`;
        basename = fileName.slice(0, -1 * extension.length) || '';
    }

    return [basename, extension];
}

/**
 * ftrack API session
 * @class  Session
 *
 */
export class Session {
    /**
     * Construct Session instance with API credentials.
     *
     * @param  {string}  serverUrl -                  ftrack server URL
     * @param  {string}  apiUser -                    ftrack username for API user.
     * @param  {string}  apiKey -                     User API Key
     * @param  {Object}  options  -                   options
     * @param  {Boolean} [options.autoConnectEventHub=false] - Automatically connect to event hub,
     * @param  {Array|null} [options.serverInformationValues=null] - List of server information values to retrieve.
     * @param  {Object}  [options.eventHubOptions={}] - Options to configure event hub with.
     * @param  {string} [options.clientToken] - Client token for update events.
     * @param  {string} [options.apiEndpoint=/api] - API endpoint.
     *
     * @constructs Session
     */
    constructor(
        serverUrl,
        apiUser,
        apiKey,
        {
            autoConnectEventHub = false,
            serverInformationValues = null,
            eventHubOptions = {},
            clientToken = null,
            apiEndpoint = '/api',
        } = {}
    ) {
        if (!serverUrl || !apiUser || !apiKey) {
            throw new Error(
                'Invalid arguments, please construct Session with ' +
                    '*serverUrl*, *apiUser* and *apiKey*.'
            );
        }

        /**
         * Username of ftrack user used by API
         * @memberof Session
         * @instance
         * @type {string}
         */
        this.apiUser = apiUser;

        /**
         * API Key
         * @memberof Session
         * @instance
         * @type {string}
         */
        this.apiKey = apiKey;

        /**
         * ftrack server URL
         * @memberof Session
         * @instance
         * @type {string}
         */
        this.serverUrl = serverUrl;

        /**
         * API Endpoint. Specified relative to server URL with leading slash.
         * @memberof Session
         * @instance
         * @type {string}
         */
        this.apiEndpoint = apiEndpoint;

        /**
         * session event hub
         * @memberof Session
         * @instance
         * @type {EventHub}
         */
        this.eventHub = new EventHub(
            serverUrl,
            apiUser,
            apiKey,
            eventHubOptions
        );

        if (autoConnectEventHub) {
            this.eventHub.connect();
        }

        if (clientToken) {
            this.clientToken = clientToken;
        } else {
            this.clientToken = `ftrack-javascript-api--${uuidV4()}`;
        }

        // Always include is_timezone_support_enabled as required by API.
        if (
            serverInformationValues &&
            !serverInformationValues.includes('is_timezone_support_enabled')
        ) {
            serverInformationValues.push('is_timezone_support_enabled');
        }

        const operations = [
            {
                action: 'query_server_information',
                values: serverInformationValues,
            },
            { action: 'query_schemas' },
        ];

        /**
         * true if session is initialized
         * @memberof Session
         * @instance
         * @type {Boolean}
         */
        this.initialized = false;

        /**
         * Resolved once session is initialized.
         * @memberof Session
         * @instance
         * @type {Promise}
         */
        this.initializing = this.call(operations).then(responses => {
            this.serverInformation = responses[0];
            this.schemas = responses[1];
            this.serverVersion = this.serverInformation.version;
            this.initialized = true;

            return Promise.resolve(this);
        });
    }

    /**
     * Get primary key attributes from schema
     *
     * @return {Array|null} List of primary key attributes.
     */
    getPrimaryKeyAttributes(entityType) {
        const schema = find(this.schemas, item => item.id === entityType);
        if (!schema || !schema.primary_key) {
            logger.warn('Primary key could not be found for: ', entityType);
            return null;
        }
        return schema.primary_key;
    }

    /**
     * Get identifying key for *entity*
     *
     * @return {String|null} Identifying key for *entity*
     */
    getIdentifyingKey(entity) {
        const primaryKeys = this.getPrimaryKeyAttributes(
            entity.__entity_type__
        );
        if (primaryKeys) {
            return [
                entity.__entity_type__,
                ...primaryKeys.map(attribute => entity[attribute]),
            ].join(',');
        }
        return null;
    }

    /**
     * Return encoded *data* as JSON string.
     *
     * This will translate objects with type moment into string representation.
     * If time zone support is enabled on the server the date
     * will be sent as UTC, otherwise in local time.
     *
     * @private
     * @param  {*} data  The data to encode.
     * @return {*}      Encoded data
     */
    encode(data) {
        if (data && data.constructor === Array) {
            return data.map(item => this.encode(item));
        }

        if (data && data.constructor === Object) {
            const out = {};
            forIn(data, (value, key) => {
                out[key] = this.encode(value);
            });

            return out;
        }

        if (data && data._isAMomentObject) {
            if (
                this.serverInformation &&
                this.serverInformation.is_timezone_support_enabled
            ) {
                // Ensure that the moment object is in UTC and format
                // to timezone naive string.
                return {
                    __type__: 'datetime',
                    value: data.utc().format(ENCODE_DATETIME_FORMAT),
                };
            }

            // Ensure that the moment object is in local time zone and format
            // to timezone naive string.
            return {
                __type__: 'datetime',
                value: data.local().format(ENCODE_DATETIME_FORMAT),
            };
        }

        return data;
    }

    /** Return error instance from *response*.
     *
     * @private
     * @param  {*} response  A server error response object.
     * @return {*}      error instance.
     */
    getErrorFromResponse(response) {
        let ErrorClass;

        if (response.exception === 'ValidationError') {
            ErrorClass = ServerValidationError;
        } else if (
            response.exception === 'FTAuthenticationError' ||
            response.exception === 'PermissionError'
        ) {
            ErrorClass = ServerPermissionDeniedError;
        } else {
            ErrorClass = ServerError;
        }

        const error = new ErrorClass(response.content, response.error_code);

        return error;
    }

    /**
     * Iterate *data* and decode entities with special encoding logic.
     *
     * Iterates recursively through objects and arrays.
     *
     * Will merge ftrack entities multiple occurrences which have been
     * de-duplicated in the back end and point them to a single object in
     * *identityMap*.
     *
     * datetime objects will be converted to timezone-aware moment objects.
     *
     * @private
     * @param  {*} data  The data to decode.
     * @return {*}      Decoded data
     */
    decode(data, identityMap = {}) {
        if (data == null) {
            return data;
        } else if (isArray(data)) {
            return this._decodeArray(data, identityMap);
        } else if (isPlainObject(data)) {
            if (data.__entity_type__) {
                return this._mergeEntity(data, identityMap);
            } else if (data.__type__ === 'datetime') {
                return this._decodeDateTime(data);
            }
            return this._decodePlainObject(data, identityMap);
        }
        return data;
    }

    /**
     * Decode datetime *data* into moment objects.
     *
     * Translate objects with __type__ equal to 'datetime' into moment
     * datetime objects. If time zone support is enabled on the server the date
     * will be assumed to be UTC and the moment will be in utc.
     * @private
     */
    _decodeDateTime(data) {
        if (
            this.serverInformation &&
            this.serverInformation.is_timezone_support_enabled
        ) {
            // Return date as moment object with UTC set to true.
            return moment.utc(data.value);
        }

        // Return date as local moment object.
        return moment(data.value);
    }

    /**
     * Return new object where all values have been decoded.
     * @private
     */
    _decodePlainObject(object, identityMap) {
        return Object.keys(object).reduce((previous, key) => {
            previous[key] = this.decode(object[key], identityMap);
            return previous;
        }, {});
    }

    /**
     * Return new Array where all items have been decoded.
     * @private
     */
    _decodeArray(collection, identityMap) {
        return collection.map(item => this.decode(item, identityMap));
    }

    /**
     * Return merged *entity* using *identityMap*.
     * @private
     */
    _mergeEntity(entity, identityMap) {
        const identifier = this.getIdentifyingKey(entity);
        if (!identifier) {
            logger.warn('Identifier could not be determined for: ', identifier);
            return entity;
        }

        if (!identityMap[identifier]) {
            identityMap[identifier] = {};
        }

        // Retrieve entity from identity map. Any instances which occur multiple
        // times in the encoded data will point to the same JavaScript object.
        // This means that output is not guaranteed to be JSON-serializable.
        //
        // TODO: Should we duplicate the information between the instances
        // instead of pointing them to the same instance?
        const mergedEntity = identityMap[identifier];

        forIn(entity, (value, key) => {
            mergedEntity[key] = this.decode(value, identityMap);
        });

        return mergedEntity;
    }

    /** Return encoded *operations*. */
    encodeOperations(operations) {
        return JSON.stringify(this.encode(operations));
    }

    /**
     * Call API with array of operation objects in *operations*.
     *
     * Returns promise which will be resolved with an array of decoded
     * responses.
     *
     * The return promise may be rejected with one of several errors:
     *
     * ServerValidationError
     *     Validation errors
     * ServerPermissionDeniedError
     *     Permission defined errors
     * ServerError
     *     Generic server errors or network issues
     *
     * @param {Array} operations - API operations.
     *
     */
    call(operations) {
        const url = `${this.serverUrl}${this.apiEndpoint}`;

        // Delay call until session is initialized if initialization is in
        // progress.
        let request = new Promise(resolve => {
            if (this.initializing && !this.initialized) {
                this.initializing.then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });

        request = request.then(() =>
            fetch(url, {
                method: 'post',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'ftrack-api-key': this.apiKey,
                    'ftrack-user': this.apiUser,
                    'ftrack-Clienttoken': this.clientToken,
                },
                body: this.encodeOperations(operations),
            })
        );

        // Catch network errors
        request = request.catch(reason => {
            logger.warn('Failed to perform request. ', reason);
            return Promise.resolve({
                exception: 'NetworkError',
                content: reason.message,
            });
        });

        request = request.then(
            response => (response.json && response.json()) || response
        );

        request = request.then(data => {
            if (this.initialized) {
                return this.decode(data);
            }

            return data;
        });

        // Catch badly formatted responses
        request = request.catch(reason => {
            logger.warn('Server reported error in unexpected format. ', reason);
            return Promise.resolve({
                exception: 'MalformedResponseError',
                content: reason.message,
                error: reason,
            });
        });

        // Reject promise on API exception.
        request = request.then(response => {
            if (response.exception) {
                return Promise.reject(this.getErrorFromResponse(response));
            }
            return Promise.resolve(response);
        });

        return request;
    }

    /**
     * Return promise of *entityType* with *data*, create or update if necessary.
     *
     *   *data* should be a dictionary of the same form passed to `create`
     *   method.
     *
     *   By default, check for an entity that has matching *data*. If
     *   *identifyingKeys* is specified as a list of keys then only consider the
     *   values from *data* for those keys when searching for existing entity.
     *
     *   If no *identifyingKeys* specified then use all of the keys from the
     *   passed *data*.
     *
     *   Raise an Error if no *identifyingKeys* can be determined.
     *
     *   If no matching entity found then create entity using supplied *data*.
     *
     *   If a matching entity is found, then update it if necessary with *data*.
     *
     *   Return update or create promise.
     */
    ensure(entityType, data, identifyingKeys = []) {
        let keys = identifyingKeys;

        logger.info(
            'Ensuring entity with data using identifying keys: ',
            entityType,
            data,
            identifyingKeys
        );

        if (!keys.length) {
            keys = Object.keys(data);
        }

        if (!keys.length) {
            throw new Error(
                'Could not determine any identifying data to check against ' +
                    `when ensuring ${entityType} with data ${data}. ` +
                    `Identifying keys: ${identifyingKeys}`
            );
        }

        const primaryKeys = this.getPrimaryKeyAttributes(entityType);
        let expression = `select ${primaryKeys.join(
            ', '
        )} from ${entityType} where`;
        const criteria = keys.map(identifyingKey => {
            let value = data[identifyingKey];

            if (isString(value)) {
                value = `"${value}"`;
            } else if (value && value._isAMomentObject) {
                // Server does not store microsecond or timezone currently so
                // need to strip from query.
                value = moment(value).utc().format(ENCODE_DATETIME_FORMAT);
                value = `"${value}"`;
            }
            return `${identifyingKey} is ${value}`;
        });

        expression = `${expression} ${criteria.join(' and ')}`;

        return this.query(expression).then(response => {
            if (response.data.length === 0) {
                return this.create(entityType, data).then(
                    ({ data: responseData }) => Promise.resolve(responseData)
                );
            }

            if (response.data.length !== 1) {
                throw new Error(
                    'Expected single or no item to be found but got multiple ' +
                        `when ensuring ${entityType} with data ${data}. ` +
                        `Identifying keys: ${identifyingKeys}`
                );
            }

            const updateEntity = response.data[0];

            // Update entity if required.
            let updated = false;
            Object.keys(data).forEach(key => {
                if (data[key] !== updateEntity[key]) {
                    updateEntity[key] = data[key];
                    updated = true;
                }
            });

            if (updated) {
                return this.update(
                    entityType,
                    primaryKeys.map(key => updateEntity[key]),
                    Object.keys(data).reduce((accumulator, key) => {
                        if (primaryKeys.indexOf(key) === -1) {
                            accumulator[key] = data[key];
                        }
                        return accumulator;
                    }, {})
                ).then(({ data: responseData }) =>
                    Promise.resolve(responseData)
                );
            }

            return Promise.resolve(response.data[0]);
        });
    }

    /**
     * Return schema with id or null if not existing.
     * @param  {string} schemaId Id of schema model, e.g. `AssetVersion`.
     * @return {Object|null} Schema definition
     */
    getSchema(schemaId) {
        for (const index in this.schemas) {
            if (this.schemas[index].id === schemaId) {
                return this.schemas[index];
            }
        }

        return null;
    }

    /**
     * Perform a single query operation with *expression*.
     *
     * @param {string} expression - API query expression.
     * @return {Promise} Promise which will be resolved with an object
     * containing data and metadata
     */
    query(expression) {
        logger.debug('Query', expression);

        const operation = queryOperation(expression);
        let request = this.call([operation]);
        request = request.then(responses => {
            const response = responses[0];
            return response;
        });

        return request;
    }

    /**
     * Perform a single search operation with *expression*.
     *
     * @param {string} expression - API query expression.
     * @return {Promise} Promise which will be resolved with an object
     * containing data and metadata
     */
    search({ expression, entityType, terms = [], projectId, objectTypeId }) {
        logger.debug('Search', { expression, entityType, terms, projectId, objectTypeId });

        const operation = searchOperation({
            expression,
            entityType,
            terms,
            projectId,
            objectTypeId,
        });
        let request = this.call([operation]);
        request = request.then(responses => {
            const response = responses[0];
            return response;
        });

        return request;
    }

    /**
     * Perform a single create operation with *type* and *data*.
     *
     * @param {string} type entity type name.
     * @param {Object} data data which should be used to populate attributes on the entity.
     * @return {Promise} Promise which will be resolved with the response.
     */
    create(type, data) {
        logger.debug('Create', type, data);

        let request = this.call([createOperation(type, data)]);
        request = request.then(responses => {
            const response = responses[0];
            return response;
        });

        return request;
    }

    /**
     * Perform a single update operation on *type* with *keys* and *data*.
     *
     * @param  {string} type Entity type
     * @param  {Array} keys Identifying keys, typically [<entity id>]
     * @param  {Object} data
     * @return {Promise} Promise resolved with the response.
     */
    update(type, keys, data) {
        logger.debug('Update', type, keys, data);

        let request = this.call([updateOperation(type, keys, data)]);
        request = request.then(responses => {
            const response = responses[0];
            return response;
        });

        return request;
    }

    /**
     * Perform a single delete operation.
     *
     * @param  {string} type Entity type
     * @param  {Array} keys Identifying keys, typically [<entity id>]
     * @return {Promise} Promise resolved with the response.
     */
    delete(type, id) {
        logger.debug('Delete', type, id);

        let request = this.call([deleteOperation(type, id)]);
        request = request.then(responses => {
            const response = responses[0];
            return response;
        });

        return request;
    }

    /**
     * Return an URL where *componentId* can be downloaded.
     *
     * @param {?string} componentId Is assumed to be present in the
     *                  ftrack.server location.
     * @return {String|null} URL where *componentId* can be downloaded, null
     *                       if component id is not specified.
     */
    getComponentUrl(componentId) {
        if (!componentId) {
            return null;
        }

        const params = {
            id: componentId,
            username: this.apiUser,
            apiKey: this.apiKey,
        };

        return `${this.serverUrl}/component/get?${encodeUriParameters(params)}`;
    }

    /**
     * Return an URL where a thumbnail for *componentId* can be downloaded.
     *
     * @param {?string} componentId - Is assumed to be present in the
     *                  ftrack.server location and be of a valid image file type.
     * @param {?object} [options = {}] - Options
     * @param {?number} options.size - The size of the thumbnail. The image will be resized to
     *                  fit within size x size pixels. Defaults to 300.
     * @return {string} URL where *componentId* can be downloaded. Returns the
     *                  URL to a default thumbnail if component id is not
     *                  specified.
     */
    thumbnailUrl(componentId, { size = 300 } = {}) {
        if (!componentId) {
            return `${this.serverUrl}/img/thumbnail2.png`;
        }

        const params = {
            id: componentId,
            size,
            username: this.apiUser,
            apiKey: this.apiKey,
        };

        return `${this.serverUrl}/component/thumbnail?${encodeUriParameters(
            params
        )}`;
    }

    /**
     * Create component from *file* and add to server location.
     *
     * @param  {File} The file object to upload.
     * @param {?object} [options = {}] - Options
     * @param {?number} options.data - Component data. Defaults to {}.
     * @return {Promise} Promise resolved with the response when creating
     * Component and ComponentLocation.
     */
    createComponent(file, options = {}) {
        const normalizedFileName = normalizeString(file.name);
        const fileNameParts = splitFileExtension(normalizedFileName);
        const defaultProgress = progress => progress;
        const defaultAbort = () => {};

        const data = options.data || {};
        const onProgress = options.onProgress || defaultProgress;
        const xhr = options.xhr || new XMLHttpRequest();
        const onAborted = options.onAborted || defaultAbort;

        const fileType = data.file_type || fileNameParts[1];
        const fileName = data.name || fileNameParts[0];
        const fileSize = data.size || file.size;
        const componentId = data.id || uuidV4();
        const componentLocationId = uuidV4();
        let url;
        let headers;

        const updateOnProgressCallback = oEvent => {
            if (oEvent.lengthComputable) {
                onProgress(parseInt((oEvent.loaded / oEvent.total) * 100, 10));
            }
        };

        logger.debug('Fetching upload metadata.');

        const request = this.call([
            {
                action: 'get_upload_metadata',
                file_name: `${fileName}${fileType}`,
                file_size: fileSize,
                component_id: componentId,
            },
        ]);

        const componentAndLocationPromise = request.then(response => {
            url = response[0].url;
            headers = response[0].headers;
            logger.debug('Creating component and component location.');
            const component = Object.assign(data, {
                id: componentId,
                name: fileName,
                file_type: fileType,
                size: fileSize,
            });
            const componentLocation = {
                id: componentLocationId,
                component_id: componentId,
                resource_identifier: componentId,
                location_id: SERVER_LOCATION_ID,
            };

            return this.call([
                createOperation('FileComponent', component),
                createOperation('ComponentLocation', componentLocation),
            ]);
        });

        return componentAndLocationPromise.then(() => {
            logger.debug(`Uploading file to: ${url}`);

            return new Promise((resolve, reject) => {
                // wait until file is uploaded
                xhr.upload.addEventListener(
                    'progress',
                    updateOnProgressCallback
                );
                xhr.open('PUT', url, true);
                xhr.onabort = () => {
                    onAborted();
                    this.call([
                        deleteOperation('FileComponent', [componentId]),
                        deleteOperation('ComponentLocation', [
                            componentLocationId,
                        ]),
                    ]).then(() => {
                        reject(
                            new CreateComponentError(
                                'Upload aborted by client',
                                'UPLOAD_ABORTED'
                            )
                        );
                    });
                };

                for (const key in headers) {
                    if (
                        headers.hasOwnProperty(key) &&
                        key !== 'Content-Length'
                    ) {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                }
                xhr.onload = () => {
                    if (xhr.status >= 400) {
                        reject(
                            new CreateComponentError(
                                `Failed to upload file: ${xhr.status}`
                            )
                        );
                    }
                    resolve(xhr.response);
                };
                xhr.onerror = () => {
                    reject(
                        new CreateComponentError(
                            `Failed to upload file: ${xhr.status}`
                        )
                    );
                };
                xhr.send(file);
            }).then(() => componentAndLocationPromise);
        });
    }
}

export default Session;
