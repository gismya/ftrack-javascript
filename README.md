<a name="readmemd"></a>

## ftrack Javascript API

The JavaScript API client ease integration of applications and scripts written in JavaScript.

This documentation focuses the JavaScript client. More information about the API and its concepts can be found at our [general API documentation](https://help.ftrack.com/en/collections/133732-developing-with-ftrack-studio). You may also find it useful to look at the documentation for the [Python client](https://github.com/ftrackhq/ftrack-python).

### Installation

npm:

```bash
npm install @ftrack/api
```

Or, with Yarn:

```bash
yarn add @ftrack/api
```

#### Usage with Node

Modern Node version (18+) have experimental support for the `fetch` API, and should be usable as is. Older Node versions may require you to install [cross-fetch](https://www.npmjs.com/package/cross-fetch).

### Overview

The API uses sessions to manage communication with an ftrack server. Create a session that connects to your ftrack server (changing the passed values as appropriate):

```javascript
const session = new ftrack.Session(
  "https://my-company.ftrackapp.com",
  "john.doe@example.com",
  "7545344e-a653-11e1-a82c-f22c11dd25eq"
);

await session.initializing;

console.info("API session initialized successfully.");
```

If everything works as expected, you should see the console message appear in the JavaScript console. If not, double check that the credentials you specified are correct.

The communication with the ftrack server in the JavaScript API is asynchronous, often returning Promises. When the session is constructed, the instance is returned immediately, while the API is being initialized in the background. Once the API has been initialized, the session.initializing promise will be resolved.

#### Query projects

Now, let’s start of using the API with an example. Let’s list the names of all projects.

```javascript
const response = await session.query("select name from Project");

const projects = response.data;
console.info("Listing " + projects.length + " projects");

console.log(projects.map((project) => project.name));
```

Each project returned will be a plain JavaScript object and contain the selected attributes.

The session contains a few other methods besides `query()`, such as `create()`, `update()` and `delete()`. Next up, let’s take a look at combining the query call with an update operation. Since the method return promises, we can chain various asynchronous operations one after the other.

In the example below a specific project is retrieved, and then its status is set to hidden, hiding the project from the UI.

```javascript
const projectName = "my_project";
const response = await session.query(
  "select id from Project where name is " + projectName
);
const projectId = response.data[0].id;
const response = await session.update("Project", [projectId], {
  status: "hidden",
});

console.info("Project hidden", response);
```

#### Uploading files

Files are stored as components in ftrack. Here is an example on how to create a component from a file in ftrack and upload it to the `ftrack.server` location.

```javascript
const data = { foo: "bar" };
const file = new File([JSON.stringify(data)], "data.json");

const response = await session.createComponent(file);
const component = response[0].data;
console.debug("Component", component);
console.debug("ComponentLocation", response[1].data);

console.debug("Component URL: " + session.getComponentUrl(component.id));
console.debug("Component thumbnail URL: " + session.thumbnailUrl(component.id));
```

## API Reference

## Classes

<a name="classeseventmd"></a>

### Class: Event

ftrack API Event class.

#### Constructors

##### <a id="constructor" name="constructor"></a> constructor

• **new Event**(`topic`, `data`, `options?`)

Construct Event instance with `topic`, `data` and additional `options`.

`topic` should be a string representing the event.

`data` should be an object with the event payload.

###### Parameters

| Name      | Type     |
| :-------- | :------- |
| `topic`   | `string` |
| `data`    | `object` |
| `options` | `Object` |

###### Defined in

[event.ts:24](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event.ts#L24)

#### Methods

##### <a id="addsource" name="addsource"></a> addSource

▸ **addSource**(`source`): `void`

Add source to event data.

###### Parameters

| Name     | Type  |
| :------- | :---- |
| `source` | `any` |

###### Returns

`void`

###### Defined in

[event.ts:45](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event.ts#L45)

---

##### <a id="getdata" name="getdata"></a> getData

▸ **getData**(): `Object`

Return event data.

###### Returns

`Object`

###### Defined in

[event.ts:40](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event.ts#L40)

<a name="classeseventhubmd"></a>

### Class: EventHub

ftrack API Event hub.

#### Constructors

##### <a id="constructor" name="constructor"></a> constructor

• **new EventHub**(`serverUrl`, `apiUser`, `apiKey`, `options?`)

Construct EventHub instance with API credentials.

**`Constructs`**

EventHub

###### Parameters

| Name                     | Type     | Description                                    |
| :----------------------- | :------- | :--------------------------------------------- |
| `serverUrl`              | `string` | Server URL                                     |
| `apiUser`                | `string` | API user                                       |
| `apiKey`                 | `string` | API key                                        |
| `options`                | `Object` |                                                |
| `options.applicationId?` | `string` | Application identifier, added to event source. |

###### Defined in

[event_hub.ts:106](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L106)

#### Methods

##### <a id="connect" name="connect"></a> connect

▸ **connect**(): `void`

Connect to the event server.

###### Returns

`void`

###### Defined in

[event_hub.ts:140](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L140)

---

##### <a id="getsubscriberbyidentifier" name="getsubscriberbyidentifier"></a> getSubscriberByIdentifier

▸ **getSubscriberByIdentifier**(`identifier`): `null` \| `Subscriber`

Return subscriber with matching `identifier`.

###### Parameters

| Name         | Type     |
| :----------- | :------- |
| `identifier` | `string` |

###### Returns

`null` \| `Subscriber`

null if no subscriber with `identifier` found.

###### Defined in

[event_hub.ts:465](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L465)

---

##### <a id="isconnected" name="isconnected"></a> isConnected

▸ **isConnected**(): `boolean`

###### Returns

`boolean`

True if connected to event server.

###### Defined in

[event_hub.ts:159](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L159)

---

##### <a id="publish" name="publish"></a> publish

▸ **publish**(`event`, `options?`): `Promise`<`string`\>

Publish event and return promise resolved with event id when event has
been sent.

If `onReply` is specified, it will be invoked when any replies are
received.

If timeout is non-zero, the promise will be rejected if the event is not
sent before the timeout is reached. Should be specified as seconds and
will default to 10.

###### Parameters

| Name               | Type                       | Description                                      |
| :----------------- | :------------------------- | :----------------------------------------------- |
| `event`            | [`Event`](#classeseventmd) | Event instance to publish                        |
| `options`          | `Object`                   |                                                  |
| `options.onReply?` | `EventCallback`            | Function to be invoked when a reply is received. |
| `options.timeout?` | `number`                   | Timeout in seconds. Defaults to 30.              |

###### Returns

`Promise`<`string`\>

Promise resolved with event id.

###### Defined in

[event_hub.ts:217](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L217)

---

##### <a id="publishandwaitforreply" name="publishandwaitforreply"></a> publishAndWaitForReply

▸ **publishAndWaitForReply**(`event`, `«destructured»`): `Promise`<`unknown`\>

Publish event and wait for a single reply.

###### Parameters

| Name             | Type                       | Description               |
| :--------------- | :------------------------- | :------------------------ |
| `event`          | [`Event`](#classeseventmd) | Event instance to publish |
| `«destructured»` | `Object`                   | -                         |
| › `timeout`      | `number`                   | -                         |

###### Returns

`Promise`<`unknown`\>

Promise resolved with reply event if received within timeout.

###### Defined in

[event_hub.ts:283](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L283)

---

##### <a id="publishreply" name="publishreply"></a> publishReply

▸ **publishReply**(`sourceEventPayload`, `data`, `source?`): `Promise`<`string`\>

Publish reply event.

###### Parameters

| Name                 | Type             | Default value | Description                       |
| :------------------- | :--------------- | :------------ | :-------------------------------- |
| `sourceEventPayload` | `EventPayload`   | `undefined`   | Source event payload              |
| `data`               | `Data`           | `undefined`   | Response event data               |
| `source`             | `null` \| `Data` | `null`        | Response event source information |

###### Returns

`Promise`<`string`\>

###### Defined in

[event_hub.ts:541](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L541)

---

##### <a id="subscribe" name="subscribe"></a> subscribe

▸ **subscribe**(`subscription`, `callback`, `metadata?`): `string`

Register to `subscription` events.

###### Parameters

| Name           | Type                 | Description                                                                          |
| :------------- | :------------------- | :----------------------------------------------------------------------------------- |
| `subscription` | `string`             | Expression to subscribe on. Currently, only "topic=value" expressions are supported. |
| `callback`     | `EventCallback`      | Function to be called when an event matching the subscription is returned.           |
| `metadata?`    | `SubscriberMetadata` | Optional information about subscriber.                                               |

###### Returns

`string`

Subscriber ID.

###### Defined in

[event_hub.ts:346](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L346)

---

##### <a id="unsubscribe" name="unsubscribe"></a> unsubscribe

▸ **unsubscribe**(`identifier`): `boolean`

Unsubscribe from `subscription` events.

###### Parameters

| Name         | Type     | Description                                   |
| :----------- | :------- | :-------------------------------------------- |
| `identifier` | `string` | Subscriber ID returned from subscribe method. |

###### Returns

`boolean`

True if a subscriber was removed, false otherwise

###### Defined in

[event_hub.ts:362](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/event_hub.ts#L362)

<a name="classessessionmd"></a>

### Class: Session

ftrack API session

#### Constructors

##### <a id="constructor" name="constructor"></a> constructor

• **new Session**(`serverUrl`, `apiUser`, `apiKey`, `options?`)

Construct Session instance with API credentials.

**`Constructs`**

Session

###### Parameters

| Name        | Type             | Description                   |
| :---------- | :--------------- | :---------------------------- |
| `serverUrl` | `string`         | ftrack server URL             |
| `apiUser`   | `string`         | ftrack username for API user. |
| `apiKey`    | `string`         | User API Key                  |
| `options`   | `SessionOptions` | options                       |

###### Defined in

[session.ts:140](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L140)

#### Methods

##### <a id="call" name="call"></a> call

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

###### Parameters

| Name         | Type          | Description     |
| :----------- | :------------ | :-------------- |
| `operations` | `Operation`[] | API operations. |
| `options`    | `CallOptions` |                 |

###### Returns

`Promise`<`Response`<`Data`\>[]\>

###### Defined in

[session.ts:491](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L491)

---

##### <a id="create" name="create"></a> create

▸ **create**(`entityType`, `data`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single create operation with `type` and `data`.

###### Parameters

| Name         | Type          | Description                                                     |
| :----------- | :------------ | :-------------------------------------------------------------- |
| `entityType` | `string`      | entity type name.                                               |
| `data`       | `Data`        | data which should be used to populate attributes on the entity. |
| `options`    | `CallOptions` |                                                                 |

###### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with the response.

###### Defined in

[session.ts:775](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L775)

---

##### <a id="createcomponent" name="createcomponent"></a> createComponent

▸ **createComponent**(`file`, `options?`): `Promise`<`Response`<`Data`\>[]\>

Create component from `file` and add to server location.

**`Default Value`**

From `file.name` if file object, or otherwise "component".

###### Parameters

| Name      | Type                     |
| :-------- | :----------------------- |
| `file`    | `Blob`                   |
| `options` | `CreateComponentOptions` |

###### Returns

`Promise`<`Response`<`Data`\>[]\>

Promise resolved with the response when creating
Component and ComponentLocation.

###### Defined in

[session.ts:899](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L899)

---

##### <a id="delete" name="delete"></a> delete

▸ **delete**(`type`, `keys`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single delete operation.

###### Parameters

| Name      | Type                | Description                               |
| :-------- | :------------------ | :---------------------------------------- |
| `type`    | `string`            | Entity type                               |
| `keys`    | `string`[]          | Identifying keys, typically [<entity id>] |
| `options` | `MutatationOptions` |                                           |

###### Returns

`Promise`<`Response`<`Data`\>\>

Promise resolved with the response.

###### Defined in

[session.ts:825](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L825)

---

##### <a id="encodeoperations" name="encodeoperations"></a> encodeOperations

▸ **encodeOperations**(`operations`): `string`

Return encoded `operations`.

###### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `operations` | `Operation`[] |

###### Returns

`string`

###### Defined in

[session.ts:465](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L465)

---

##### <a id="ensure" name="ensure"></a> ensure

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

###### Parameters

| Name              | Type       | Default value |
| :---------------- | :--------- | :------------ |
| `entityType`      | `string`   | `undefined`   |
| `data`            | `Data`     | `undefined`   |
| `identifyingKeys` | `string`[] | `[]`          |

###### Returns

`Promise`<`Data`\>

###### Defined in

[session.ts:593](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L593)

---

##### <a id="getcomponenturl" name="getcomponenturl"></a> getComponentUrl

▸ **getComponentUrl**(`componentId`): `null` \| `string`

Return an URL where `componentId` can be downloaded.

###### Parameters

| Name          | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `componentId` | `string` | Is assumed to be present in the ftrack.server location. |

###### Returns

`null` \| `string`

URL where `componentId` can be downloaded, null if component id is not specified.

###### Defined in

[session.ts:844](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L844)

---

##### <a id="getidentifyingkey" name="getidentifyingkey"></a> getIdentifyingKey

▸ **getIdentifyingKey**(`entity`): `null` \| `string`

Get identifying key for `entity`

###### Parameters

| Name     | Type   |
| :------- | :----- |
| `entity` | `Data` |

###### Returns

`null` \| `string`

Identifying key for `entity`

###### Defined in

[session.ts:272](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L272)

---

##### <a id="getprimarykeyattributes" name="getprimarykeyattributes"></a> getPrimaryKeyAttributes

▸ **getPrimaryKeyAttributes**(`entityType`): `any`

Get primary key attributes from schema

###### Parameters

| Name         | Type     |
| :----------- | :------- |
| `entityType` | `string` |

###### Returns

`any`

List of primary key attributes.

###### Defined in

[session.ts:254](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L254)

---

##### <a id="getschema" name="getschema"></a> getSchema

▸ **getSchema**(`schemaId`): `null` \| `Data`

Return schema with id or null if not existing.

###### Parameters

| Name       | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `schemaId` | `string` | Id of schema model, e.g. `AssetVersion`. |

###### Returns

`null` \| `Data`

Schema definition

###### Defined in

[session.ts:687](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L687)

---

##### <a id="query" name="query"></a> query

▸ **query**(`expression`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single query operation with `expression`.

###### Parameters

| Name         | Type           | Description           |
| :----------- | :------------- | :-------------------- |
| `expression` | `string`       | API query expression. |
| `options`    | `QueryOptions` |                       |

###### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with an object
containing action, data and metadata

###### Defined in

[session.ts:707](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L707)

---

##### <a id="search" name="search"></a> search

▸ **search**(`options`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single search operation with `expression`.

###### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `options` | `SearchOptions` |
| `options` | `QueryOptions`  |

###### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with an object containing data and metadata

###### Defined in

[session.ts:733](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L733)

---

##### <a id="thumbnailurl" name="thumbnailurl"></a> thumbnailUrl

▸ **thumbnailUrl**(`componentId`, `options?`): `string`

Return an URL where a thumbnail for `componentId` can be downloaded.

###### Parameters

| Name           | Type                    | Description                                                                                             |
| :------------- | :---------------------- | :------------------------------------------------------------------------------------------------------ |
| `componentId`  | `string`                | Is assumed to be present in the ftrack.server location and be of a valid image file type.               |
| `options`      | `Object`                |                                                                                                         |
| `options.size` | `undefined` \| `number` | The size of the thumbnail. The image will be resized to fit within size x size pixels. Defaults to 300. |

###### Returns

`string`

URL where `componentId` can be downloaded. Returns the
URL to a default thumbnail if component id is not
specified.

###### Defined in

[session.ts:872](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L872)

---

##### <a id="update" name="update"></a> update

▸ **update**(`type`, `keys`, `data`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single update operation on `type` with `keys` and `data`.

###### Parameters

| Name      | Type                | Description                               |
| :-------- | :------------------ | :---------------------------------------- |
| `type`    | `string`            | Entity type                               |
| `keys`    | `string`[]          | Identifying keys, typically [<entity id>] |
| `data`    | `Data`              |                                           |
| `options` | `MutatationOptions` |                                           |

###### Returns

`Promise`<`Response`<`Data`\>\>

Promise resolved with the response.

###### Defined in

[session.ts:798](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/session.ts#L798)

## Interfaces

<a name="interfacesoperationcreateoperationmd"></a>

### Interface: CreateOperation

[operation](#modulesoperationmd).CreateOperation

Operations module

**`Namespace`**

operation

<a name="modulesmd"></a>

## @ftrack/api

### Namespaces

- [error](#moduleserrormd)
- [operation](#modulesoperationmd)
- [projectSchema](#modulesprojectschemamd)

### Classes

- [Event](#classeseventmd)
- [EventHub](#classeseventhubmd)
- [Session](#classessessionmd)

## Modules

<a name="moduleserrormd"></a>

### Namespace: error

#### Variables

##### <a id="createcomponenterror" name="createcomponenterror"></a> CreateComponentError

• `Const` **CreateComponentError**: typeof `CustomError`

Throw when file upload to event server is aborted or does not succeed.

**`Memberof`**

error

###### Defined in

[error.ts:85](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L85)

---

##### <a id="eventserverconnectiontimeouterror" name="eventserverconnectiontimeouterror"></a> EventServerConnectionTimeoutError

• `Const` **EventServerConnectionTimeoutError**: typeof `CustomError`

Throw when event server connection timeout occurs.

**`Memberof`**

error

###### Defined in

[error.ts:62](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L62)

---

##### <a id="eventserverpublisherror" name="eventserverpublisherror"></a> EventServerPublishError

• `Const` **EventServerPublishError**: typeof `CustomError`

Throw when event hub hasn't been connected to the event server.

**`Memberof`**

error

###### Defined in

[error.ts:71](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L71)

---

##### <a id="eventserverreplytimeouterror" name="eventserverreplytimeouterror"></a> EventServerReplyTimeoutError

• `Const` **EventServerReplyTimeoutError**: typeof `CustomError`

Throw when event reply timeout occurs.

**`Memberof`**

error

###### Defined in

[error.ts:53](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L53)

---

##### <a id="notuniqueerror" name="notuniqueerror"></a> NotUniqueError

• `Const` **NotUniqueError**: typeof `CustomError`

Throw when event server connection timeout occurs.

**`Memberof`**

error

###### Defined in

[error.ts:78](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L78)

---

##### <a id="servererror" name="servererror"></a> ServerError

• `Const` **ServerError**: typeof `CustomError`

Throw when a unknown server error occurs.

**`Memberof`**

error

###### Defined in

[error.ts:30](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L30)

---

##### <a id="serverpermissiondeniederror" name="serverpermissiondeniederror"></a> ServerPermissionDeniedError

• `Const` **ServerPermissionDeniedError**: typeof `CustomError`

Throw when a permission denied error occurs.

**`Memberof`**

error

###### Defined in

[error.ts:37](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L37)

---

##### <a id="servervalidationerror" name="servervalidationerror"></a> ServerValidationError

• `Const` **ServerValidationError**: typeof `CustomError`

Throw when a validation error occurs.

**`Memberof`**

error

###### Defined in

[error.ts:46](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/error.ts#L46)

<a name="modulesoperationmd"></a>

### Namespace: operation

#### Interfaces

- [CreateOperation](#interfacesoperationcreateoperationmd)

#### Functions

##### <a id="create" name="create"></a> create

▸ **create**(`type`, `data`): [`CreateOperation`](#interfacesoperationcreateoperationmd)

Return create operation object for entity `type` and `data`.

**`Function`**

operation.create

**`Memberof`**

operation

###### Parameters

| Name   | Type     | Description                     |
| :----- | :------- | :------------------------------ |
| `type` | `string` | Entity type                     |
| `data` | `any`    | Entity data to use for creation |

###### Returns

[`CreateOperation`](#interfacesoperationcreateoperationmd)

- API operation

###### Defined in

[operation.ts:84](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L84)

---

##### <a id="delete" name="delete"></a> delete

▸ **delete**(`type`, `keys`): `DeleteOperation`

Return delete operation object for entity `type` identified by `keys`.

**`Function`**

operation.delete

**`Memberof`**

operation

###### Parameters

| Name   | Type       | Description                               |
| :----- | :--------- | :---------------------------------------- |
| `type` | `string`   | Entity type                               |
| `keys` | `string`[] | Identifying keys, typically [<entity id>] |

###### Returns

`DeleteOperation`

API operation

###### Defined in

[operation.ts:161](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L161)

---

##### <a id="query" name="query"></a> query

▸ **query**(`expression`): `QueryOperation`

Return query operation object for `expression`.

**`Function`**

operation.query

**`Memberof`**

operation

###### Parameters

| Name         | Type     | Description          |
| :----------- | :------- | :------------------- |
| `expression` | `string` | API query expression |

###### Returns

`QueryOperation`

API operation

###### Defined in

[operation.ts:100](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L100)

---

##### <a id="search" name="search"></a> search

▸ **search**(`expression`): `SearchOperation`

Return search operation object for `expression`.

**`Function`**

operation.query

**`Memberof`**

operation

###### Parameters

| Name         | Type                     | Description          |
| :----------- | :----------------------- | :------------------- |
| `expression` | `SearchOperationOptions` | API query expression |

###### Returns

`SearchOperation`

- API operation

###### Defined in

[operation.ts:112](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L112)

---

##### <a id="update" name="update"></a> update

▸ **update**(`type`, `keys`, `data`): `UpdateOperation`

Return update operation object for entity `type` identified by `keys`.

**`Function`**

operation.update

**`Memberof`**

operation

###### Parameters

| Name   | Type       | Description                               |
| :----- | :--------- | :---------------------------------------- |
| `type` | `string`   | Entity type                               |
| `keys` | `string`[] | Identifying keys, typically [<entity id>] |
| `data` | `any`      | Values to update                          |

###### Returns

`UpdateOperation`

API operation

###### Defined in

[operation.ts:139](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L139)

<a name="modulesprojectschemamd"></a>

### Namespace: projectSchema

#### Functions

##### <a id="getstatuses" name="getstatuses"></a> getStatuses

▸ **getStatuses**(`session`, `projectSchemaId`, `entityType`, `typeId?`): `Promise`<`any`\>

Return statuses from `projectSchemaId` for `entityType` and `typeId`.

`entityType` should be a valid ftrack api schema id, .e.g. 'AssetVersion' or
'Task'.

`typeId` can be used to get overridden statuses for a certain task type.

**`Memberof`**

project_schema

###### Parameters

| Name              | Type                           | Default value |
| :---------------- | :----------------------------- | :------------ |
| `session`         | [`Session`](#classessessionmd) | `undefined`   |
| `projectSchemaId` | `string`                       | `undefined`   |
| `entityType`      | `string`                       | `undefined`   |
| `typeId`          | `null` \| `string`             | `null`        |

###### Returns

`Promise`<`any`\>

###### Defined in

[project_schema.ts:21](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/project_schema.ts#L21)
