[@ftrack/api](../README.md) / [Exports](../modules.md) / Session

# Class: Session

ftrack API session

## Table of contents

### Constructors

- [constructor](Session.md#constructor)

### Methods

- [call](Session.md#call)
- [create](Session.md#create)
- [createComponent](Session.md#createcomponent)
- [delete](Session.md#delete)
- [encodeOperations](Session.md#encodeoperations)
- [ensure](Session.md#ensure)
- [getComponentUrl](Session.md#getcomponenturl)
- [getIdentifyingKey](Session.md#getidentifyingkey)
- [getPrimaryKeyAttributes](Session.md#getprimarykeyattributes)
- [getSchema](Session.md#getschema)
- [query](Session.md#query)
- [search](Session.md#search)
- [thumbnailUrl](Session.md#thumbnailurl)
- [update](Session.md#update)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new Session**(`serverUrl`, `apiUser`, `apiKey`, `options?`)

Construct Session instance with API credentials.

**`Constructs`**

Session

#### Parameters

| Name        | Type             | Description                   |
| :---------- | :--------------- | :---------------------------- |
| `serverUrl` | `string`         | ftrack server URL             |
| `apiUser`   | `string`         | ftrack username for API user. |
| `apiKey`    | `string`         | User API Key                  |
| `options`   | `SessionOptions` | options                       |

#### Defined in

[session.ts:140](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L140)

## Methods

### <a id="call" name="call"></a> call

▸ **call**(`operations`, `options?`): `Promise`<`Response`<`Data`\>[]\>

Call API with array of operation objects in `operations`.

Returns promise which will be resolved with an array of decoded
responses.

The return promise may be rejected with one of several errors:

ServerValidationError
Validation errors
ServerPermissionDeniedError
Permission defined errors
ServerError
Generic server errors or network issues

#### Parameters

| Name         | Type          | Description     |
| :----------- | :------------ | :-------------- |
| `operations` | `Operation`[] | API operations. |
| `options`    | `CallOptions` |                 |

#### Returns

`Promise`<`Response`<`Data`\>[]\>

#### Defined in

[session.ts:491](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L491)

---

### <a id="create" name="create"></a> create

▸ **create**(`entityType`, `data`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single create operation with `type` and `data`.

#### Parameters

| Name         | Type          | Description                                                     |
| :----------- | :------------ | :-------------------------------------------------------------- |
| `entityType` | `string`      | entity type name.                                               |
| `data`       | `Data`        | data which should be used to populate attributes on the entity. |
| `options`    | `CallOptions` |                                                                 |

#### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with the response.

#### Defined in

[session.ts:775](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L775)

---

### <a id="createcomponent" name="createcomponent"></a> createComponent

▸ **createComponent**(`file`, `options?`): `Promise`<`Response`<`Data`\>[]\>

Create component from `file` and add to server location.

**`Default Value`**

From `file.name` if file object, or otherwise "component".

#### Parameters

| Name      | Type                     |
| :-------- | :----------------------- |
| `file`    | `Blob`                   |
| `options` | `CreateComponentOptions` |

#### Returns

`Promise`<`Response`<`Data`\>[]\>

Promise resolved with the response when creating
Component and ComponentLocation.

#### Defined in

[session.ts:899](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L899)

---

### <a id="delete" name="delete"></a> delete

▸ **delete**(`type`, `keys`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single delete operation.

#### Parameters

| Name      | Type                | Description                               |
| :-------- | :------------------ | :---------------------------------------- |
| `type`    | `string`            | Entity type                               |
| `keys`    | `string`[]          | Identifying keys, typically [<entity id>] |
| `options` | `MutatationOptions` |                                           |

#### Returns

`Promise`<`Response`<`Data`\>\>

Promise resolved with the response.

#### Defined in

[session.ts:825](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L825)

---

### <a id="encodeoperations" name="encodeoperations"></a> encodeOperations

▸ **encodeOperations**(`operations`): `string`

Return encoded `operations`.

#### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `operations` | `Operation`[] |

#### Returns

`string`

#### Defined in

[session.ts:465](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L465)

---

### <a id="ensure" name="ensure"></a> ensure

▸ **ensure**(`entityType`, `data`, `identifyingKeys?`): `Promise`<`Data`\>

Return promise of `entityType` with `data`, create or update if necessary.

`data` should be a dictionary of the same form passed to `create`
method.

By default, check for an entity that has matching `data`. If
`identifyingKeys` is specified as a list of keys then only consider the
values from `data` for those keys when searching for existing entity.

If no `identifyingKeys` specified then use all of the keys from the
passed `data`.

Raise an Error if no `identifyingKeys` can be determined.

If no matching entity found then create entity using supplied `data`.

If a matching entity is found, then update it if necessary with `data`.

Return update or create promise.

#### Parameters

| Name              | Type       | Default value |
| :---------------- | :--------- | :------------ |
| `entityType`      | `string`   | `undefined`   |
| `data`            | `Data`     | `undefined`   |
| `identifyingKeys` | `string`[] | `[]`          |

#### Returns

`Promise`<`Data`\>

#### Defined in

[session.ts:593](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L593)

---

### <a id="getcomponenturl" name="getcomponenturl"></a> getComponentUrl

▸ **getComponentUrl**(`componentId`): `null` \| `string`

Return an URL where `componentId` can be downloaded.

#### Parameters

| Name          | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `componentId` | `string` | Is assumed to be present in the ftrack.server location. |

#### Returns

`null` \| `string`

URL where `componentId` can be downloaded, null if component id is not specified.

#### Defined in

[session.ts:844](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L844)

---

### <a id="getidentifyingkey" name="getidentifyingkey"></a> getIdentifyingKey

▸ **getIdentifyingKey**(`entity`): `null` \| `string`

Get identifying key for `entity`

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `entity` | `Data` |

#### Returns

`null` \| `string`

Identifying key for `entity`

#### Defined in

[session.ts:272](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L272)

---

### <a id="getprimarykeyattributes" name="getprimarykeyattributes"></a> getPrimaryKeyAttributes

▸ **getPrimaryKeyAttributes**(`entityType`): `any`

Get primary key attributes from schema

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `entityType` | `string` |

#### Returns

`any`

List of primary key attributes.

#### Defined in

[session.ts:254](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L254)

---

### <a id="getschema" name="getschema"></a> getSchema

▸ **getSchema**(`schemaId`): `null` \| `Data`

Return schema with id or null if not existing.

#### Parameters

| Name       | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `schemaId` | `string` | Id of schema model, e.g. `AssetVersion`. |

#### Returns

`null` \| `Data`

Schema definition

#### Defined in

[session.ts:687](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L687)

---

### <a id="query" name="query"></a> query

▸ **query**(`expression`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single query operation with `expression`.

#### Parameters

| Name         | Type           | Description           |
| :----------- | :------------- | :-------------------- |
| `expression` | `string`       | API query expression. |
| `options`    | `QueryOptions` |                       |

#### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with an object
containing action, data and metadata

#### Defined in

[session.ts:707](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L707)

---

### <a id="search" name="search"></a> search

▸ **search**(`options`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single search operation with `expression`.

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `options` | `SearchOptions` |
| `options` | `QueryOptions`  |

#### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with an object containing data and metadata

#### Defined in

[session.ts:733](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L733)

---

### <a id="thumbnailurl" name="thumbnailurl"></a> thumbnailUrl

▸ **thumbnailUrl**(`componentId`, `options?`): `string`

Return an URL where a thumbnail for `componentId` can be downloaded.

#### Parameters

| Name           | Type                    | Description                                                                                             |
| :------------- | :---------------------- | :------------------------------------------------------------------------------------------------------ |
| `componentId`  | `string`                | Is assumed to be present in the ftrack.server location and be of a valid image file type.               |
| `options`      | `Object`                |                                                                                                         |
| `options.size` | `undefined` \| `number` | The size of the thumbnail. The image will be resized to fit within size x size pixels. Defaults to 300. |

#### Returns

`string`

URL where `componentId` can be downloaded. Returns the
URL to a default thumbnail if component id is not
specified.

#### Defined in

[session.ts:872](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L872)

---

### <a id="update" name="update"></a> update

▸ **update**(`type`, `keys`, `data`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single update operation on `type` with `keys` and `data`.

#### Parameters

| Name      | Type                | Description                               |
| :-------- | :------------------ | :---------------------------------------- |
| `type`    | `string`            | Entity type                               |
| `keys`    | `string`[]          | Identifying keys, typically [<entity id>] |
| `data`    | `Data`              |                                           |
| `options` | `MutatationOptions` |                                           |

#### Returns

`Promise`<`Response`<`Data`\>\>

Promise resolved with the response.

#### Defined in

[session.ts:798](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/session.ts#L798)
