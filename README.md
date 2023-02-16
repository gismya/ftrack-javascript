<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [@ftrack/api](#ftrackapi)
  - [Table of contents](#table-of-contents)
    - [Namespaces](#namespaces)
    - [Classes](#classes)
- [Classes](#classes-1)
  - [Class: Event](#class-event)
    - [Table of contents](#table-of-contents-1)
    - [Constructors](#constructors)
    - [Methods](#methods)
  - [Class: EventHub](#class-eventhub)
    - [Table of contents](#table-of-contents-2)
    - [Constructors](#constructors-1)
    - [Methods](#methods-1)
  - [Class: Session](#class-session)
    - [Table of contents](#table-of-contents-3)
    - [Constructors](#constructors-2)
    - [Methods](#methods-2)
- [Interfaces](#interfaces)
  - [Interface: CreateOperation](#interface-createoperation)
- [Modules](#modules)
  - [Namespace: error](#namespace-error)
    - [Table of contents](#table-of-contents-4)
    - [Variables](#variables)
  - [Namespace: operation](#namespace-operation)
    - [Table of contents](#table-of-contents-5)
    - [Functions](#functions)
  - [Namespace: projectSchema](#namespace-projectschema)
    - [Table of contents](#table-of-contents-6)
    - [Functions](#functions-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="readmemd"></a>

# @ftrack/api

## Table of contents

### Namespaces

- [error](#moduleserrormd)
- [operation](#modulesoperationmd)
- [projectSchema](#modulesprojectschemamd)

### Classes

- [Event](#classeseventmd)
- [EventHub](#classeseventhubmd)
- [Session](#classessessionmd)

# Classes

<a name="classeseventmd"></a>

## Class: Event

ftrack API Event class.

### Table of contents

#### Constructors

- [constructor](#constructor)

#### Methods

- [addSource](#addsource)
- [getData](#getdata)

### Constructors

#### <a id="constructor" name="constructor"></a> constructor

• **new Event**(`topic`, `data`, `options?`)

Construct Event instance with _topic_, _data_ and additional _options_.

_topic_ should be a string representing the event.

_data_ should be an object with the event payload.

##### Parameters

| Name      | Type     |
| :-------- | :------- |
| `topic`   | `string` |
| `data`    | `object` |
| `options` | `Object` |

##### Defined in

[event.ts:24](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event.ts#L24)

### Methods

#### <a id="addsource" name="addsource"></a> addSource

▸ **addSource**(`source`): `void`

Add source to event data.

##### Parameters

| Name     | Type  |
| :------- | :---- |
| `source` | `any` |

##### Returns

`void`

##### Defined in

[event.ts:45](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event.ts#L45)

---

#### <a id="getdata" name="getdata"></a> getData

▸ **getData**(): `Object`

Return event data.

##### Returns

`Object`

##### Defined in

[event.ts:40](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event.ts#L40)

<a name="classeseventhubmd"></a>

## Class: EventHub

ftrack API Event hub.

### Table of contents

#### Constructors

- [constructor](#constructor)

#### Methods

- [\_IsSubscriberInterestedIn](#_issubscriberinterestedin)
- [\_addSubscriber](#_addsubscriber)
- [\_getExpressionTopic](#_getexpressiontopic)
- [\_handle](#_handle)
- [\_handleReply](#_handlereply)
- [\_notifyServerAboutSubscriber](#_notifyserveraboutsubscriber)
- [\_runWhenConnected](#_runwhenconnected)
- [connect](#connect)
- [getSubscriberByIdentifier](#getsubscriberbyidentifier)
- [isConnected](#isconnected)
- [publish](#publish)
- [publishAndWaitForReply](#publishandwaitforreply)
- [publishReply](#publishreply)
- [subscribe](#subscribe)
- [unsubscribe](#unsubscribe)

### Constructors

#### <a id="constructor" name="constructor"></a> constructor

• **new EventHub**(`serverUrl`, `apiUser`, `apiKey`, `«destructured»?`)

Construct EventHub instance with API credentials.

**`Constructs`**

EventHub

##### Parameters

| Name               | Type     | Description |
| :----------------- | :------- | :---------- |
| `serverUrl`        | `string` | Server URL  |
| `apiUser`          | `string` | API user    |
| `apiKey`           | `string` | API key     |
| `«destructured»`   | `Object` | -           |
| › `applicationId?` | `string` | -           |

##### Defined in

[event_hub.ts:105](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L105)

### Methods

#### <a id="_issubscriberinterestedin" name="_issubscriberinterestedin"></a> \_IsSubscriberInterestedIn

▸ **\_IsSubscriberInterestedIn**(`subscriber`, `eventPayload`): `boolean`

Return if _subscriber_ is interested in _event_.

Only expressions on the format topic=value is supported.

TODO: Support the full event expression format.

##### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `subscriber`   | `Subscriber`   |
| `eventPayload` | `EventPayload` |

##### Returns

`boolean`

##### Defined in

[event_hub.ts:491](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L491)

---

#### <a id="_addsubscriber" name="_addsubscriber"></a> \_addSubscriber

▸ **\_addSubscriber**(`subscription`, `callback`, `metadata?`): `Object`

Add subscriber locally.

Throws an NotUniqueError if a subscriber with
the same identifier already exists.

##### Parameters

| Name           | Type                 | Description                                      |
| :------------- | :------------------- | :----------------------------------------------- |
| `subscription` | `string`             | expression                                       |
| `callback`     | `EventCallback`      | Function to be called when an event is received. |
| `metadata`     | `SubscriberMetadata` | Optional information about subscriber.           |

##### Returns

`Object`

subscriber information.

| Name           | Type                 |
| :------------- | :------------------- |
| `callback`     | `EventCallback`      |
| `metadata`     | `SubscriberMetadata` |
| `subscription` | `string`             |

##### Defined in

[event_hub.ts:411](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L411)

---

#### <a id="_getexpressiontopic" name="_getexpressiontopic"></a> \_getExpressionTopic

▸ **\_getExpressionTopic**(`subscription`): `string`

Return topic from _subscription_ expression.

Raises an error if expression is in an unsupported format. Currently,
only expressions on the format topic=value is supported.

##### Parameters

| Name           | Type     | Description |
| :------------- | :------- | :---------- |
| `subscription` | `string` | expression  |

##### Returns

`string`

topic

##### Defined in

[event_hub.ts:388](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L388)

---

#### <a id="_handle" name="_handle"></a> \_handle

▸ **\_handle**(`eventPayload`): `void`

Handle Events.

##### Parameters

| Name           | Type           | Description   |
| :------------- | :------------- | :------------ |
| `eventPayload` | `EventPayload` | Event payload |

##### Returns

`void`

##### Defined in

[event_hub.ts:506](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L506)

---

#### <a id="_handlereply" name="_handlereply"></a> \_handleReply

▸ **\_handleReply**(`eventPayload`): `void`

Handle reply event.

##### Parameters

| Name           | Type           | Description   |
| :------------- | :------------- | :------------ |
| `eventPayload` | `EventPayload` | Event payload |

##### Returns

`void`

##### Defined in

[event_hub.ts:540](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L540)

---

#### <a id="_notifyserveraboutsubscriber" name="_notifyserveraboutsubscriber"></a> \_notifyServerAboutSubscriber

▸ **\_notifyServerAboutSubscriber**(`subscriber`): `void`

Notify server of new _subscriber_.

##### Parameters

| Name         | Type         | Description            |
| :----------- | :----------- | :--------------------- |
| `subscriber` | `Subscriber` | subscriber information |

##### Returns

`void`

##### Defined in

[event_hub.ts:448](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L448)

---

#### <a id="_runwhenconnected" name="_runwhenconnected"></a> \_runWhenConnected

▸ **\_runWhenConnected**(`callback`): `void`

Run _callback_ if event hub is connected to server.

##### Parameters

| Name       | Type                 |
| :--------- | :------------------- |
| `callback` | `ConnectionCallback` |

##### Returns

`void`

##### Defined in

[event_hub.ts:322](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L322)

---

#### <a id="connect" name="connect"></a> connect

▸ **connect**(): `void`

Connect to the event server.

##### Returns

`void`

##### Defined in

[event_hub.ts:139](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L139)

---

#### <a id="getsubscriberbyidentifier" name="getsubscriberbyidentifier"></a> getSubscriberByIdentifier

▸ **getSubscriberByIdentifier**(`identifier`): `null` \| `Subscriber`

Return subscriber with matching _identifier_.

Return null if no subscriber with _identifier_ found.

##### Parameters

| Name         | Type     |
| :----------- | :------- |
| `identifier` | `string` |

##### Returns

`null` \| `Subscriber`

##### Defined in

[event_hub.ts:471](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L471)

---

#### <a id="isconnected" name="isconnected"></a> isConnected

▸ **isConnected**(): `boolean`

Return true if connected to event server.

##### Returns

`boolean`

##### Defined in

[event_hub.ts:159](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L159)

---

#### <a id="publish" name="publish"></a> publish

▸ **publish**(`event`, `«destructured»?`): `Promise`<`string`\>

Publish event and return promise resolved with event id when event has
been sent.

If _onReply_ is specified, it will be invoked when any replies are
received.

If timeout is non-zero, the promise will be rejected if the event is not
sent before the timeout is reached. Should be specified as seconds and
will default to 10.

##### Parameters

| Name             | Type                       | Description               |
| :--------------- | :------------------------- | :------------------------ |
| `event`          | [`Event`](#classeseventmd) | Event instance to publish |
| `«destructured»` | `Object`                   | -                         |
| › `onReply?`     | `EventCallback`            | -                         |
| › `timeout?`     | `number`                   | -                         |

##### Returns

`Promise`<`string`\>

##### Defined in

[event_hub.ts:218](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L218)

---

#### <a id="publishandwaitforreply" name="publishandwaitforreply"></a> publishAndWaitForReply

▸ **publishAndWaitForReply**(`event`, `«destructured»?`): `Promise`<`unknown`\>

Publish event and wait for a single reply.

Returns promise resolved with reply event if received within timeout.

##### Parameters

| Name             | Type                       | Description               |
| :--------------- | :------------------------- | :------------------------ |
| `event`          | [`Event`](#classeseventmd) | Event instance to publish |
| `«destructured»` | `Object`                   | -                         |
| › `timeout`      | `number`                   | -                         |

##### Returns

`Promise`<`unknown`\>

##### Defined in

[event_hub.ts:286](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L286)

---

#### <a id="publishreply" name="publishreply"></a> publishReply

▸ **publishReply**(`sourceEventPayload`, `data`, `source?`): `Promise`<`string`\>

Publish reply event.

##### Parameters

| Name                 | Type             | Default value | Description                       |
| :------------------- | :--------------- | :------------ | :-------------------------------- |
| `sourceEventPayload` | `EventPayload`   | `undefined`   | Source event payload              |
| `data`               | `Data`           | `undefined`   | Response event data               |
| `source?`            | `null` \| `Data` | `null`        | Response event source information |

##### Returns

`Promise`<`string`\>

##### Defined in

[event_hub.ts:554](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L554)

---

#### <a id="subscribe" name="subscribe"></a> subscribe

▸ **subscribe**(`subscription`, `callback`, `metadata?`): `string`

Register to _subscription_ events.

##### Parameters

| Name           | Type                 | Description                                                                          |
| :------------- | :------------------- | :----------------------------------------------------------------------------------- |
| `subscription` | `string`             | Expression to subscribe on. Currently, only "topic=value" expressions are supported. |
| `callback`     | `EventCallback`      | Function to be called when an event matching the subscription is returned.           |
| `metadata?`    | `SubscriberMetadata` | Optional information about subscriber.                                               |

##### Returns

`string`

Subscriber ID.

##### Defined in

[event_hub.ts:349](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L349)

---

#### <a id="unsubscribe" name="unsubscribe"></a> unsubscribe

▸ **unsubscribe**(`identifier`): `boolean`

Unsubscribe from _subscription_ events.

##### Parameters

| Name         | Type     | Description                                   |
| :----------- | :------- | :-------------------------------------------- |
| `identifier` | `string` | Subscriber ID returned from subscribe method. |

##### Returns

`boolean`

True if a subscriber was removed, false otherwise

##### Defined in

[event_hub.ts:365](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/event_hub.ts#L365)

<a name="classessessionmd"></a>

## Class: Session

ftrack API session

### Table of contents

#### Constructors

- [constructor](#constructor)

#### Methods

- [call](#call)
- [create](#create)
- [createComponent](#createcomponent)
- [delete](#delete)
- [encodeOperations](#encodeoperations)
- [ensure](#ensure)
- [getComponentUrl](#getcomponenturl)
- [getIdentifyingKey](#getidentifyingkey)
- [getPrimaryKeyAttributes](#getprimarykeyattributes)
- [getSchema](#getschema)
- [query](#query)
- [search](#search)
- [thumbnailUrl](#thumbnailurl)
- [update](#update)

### Constructors

#### <a id="constructor" name="constructor"></a> constructor

• **new Session**(`serverUrl`, `apiUser`, `apiKey`, `options?`)

Construct Session instance with API credentials.

**`Constructs`**

Session

##### Parameters

| Name        | Type             | Description                   |
| :---------- | :--------------- | :---------------------------- |
| `serverUrl` | `string`         | ftrack server URL             |
| `apiUser`   | `string`         | ftrack username for API user. |
| `apiKey`    | `string`         | User API Key                  |
| `options`   | `SessionOptions` | options                       |

##### Defined in

[session.ts:140](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L140)

### Methods

#### <a id="call" name="call"></a> call

▸ **call**(`operations`, `options?`): `Promise`<`Response`<`Data`\>[]\>

Call API with array of operation objects in _operations_.

Returns promise which will be resolved with an array of decoded
responses.

The return promise may be rejected with one of several errors:

ServerValidationError
Validation errors
ServerPermissionDeniedError
Permission defined errors
ServerError
Generic server errors or network issues

##### Parameters

| Name         | Type          | Description     |
| :----------- | :------------ | :-------------- |
| `operations` | `Operation`[] | API operations. |
| `options`    | `CallOptions` |                 |

##### Returns

`Promise`<`Response`<`Data`\>[]\>

##### Defined in

[session.ts:491](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L491)

---

#### <a id="create" name="create"></a> create

▸ **create**(`entityType`, `data`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single create operation with _type_ and _data_.

##### Parameters

| Name         | Type          | Description                                                     |
| :----------- | :------------ | :-------------------------------------------------------------- |
| `entityType` | `string`      | entity type name.                                               |
| `data`       | `Data`        | data which should be used to populate attributes on the entity. |
| `options`    | `CallOptions` |                                                                 |

##### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with the response.

##### Defined in

[session.ts:776](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L776)

---

#### <a id="createcomponent" name="createcomponent"></a> createComponent

▸ **createComponent**(`file`, `options?`): `Promise`<`Response`<`Data`\>[]\>

Create component from _file_ and add to server location.

##### Parameters

| Name       | Type                     |
| :--------- | :----------------------- |
| `file`     | `Blob`                   |
| `options?` | `CreateComponentOptions` |

##### Returns

`Promise`<`Response`<`Data`\>[]\>

Promise resolved with the response when creating
Component and ComponentLocation.

##### Defined in

[session.ts:902](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L902)

---

#### <a id="delete" name="delete"></a> delete

▸ **delete**(`type`, `keys`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single delete operation.

##### Parameters

| Name      | Type                | Description                               |
| :-------- | :------------------ | :---------------------------------------- |
| `type`    | `string`            | Entity type                               |
| `keys`    | `string`[]          | Identifying keys, typically [<entity id>] |
| `options` | `MutatationOptions` |                                           |

##### Returns

`Promise`<`Response`<`Data`\>\>

Promise resolved with the response.

##### Defined in

[session.ts:826](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L826)

---

#### <a id="encodeoperations" name="encodeoperations"></a> encodeOperations

▸ **encodeOperations**(`operations`): `string`

Return encoded _operations_.

##### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `operations` | `Operation`[] |

##### Returns

`string`

##### Defined in

[session.ts:465](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L465)

---

#### <a id="ensure" name="ensure"></a> ensure

▸ **ensure**(`entityType`, `data`, `identifyingKeys?`): `Promise`<`Data`\>

Return promise of _entityType_ with _data_, create or update if necessary.

_data_ should be a dictionary of the same form passed to `create`
method.

By default, check for an entity that has matching _data_. If
_identifyingKeys_ is specified as a list of keys then only consider the
values from _data_ for those keys when searching for existing entity.

If no _identifyingKeys_ specified then use all of the keys from the
passed _data_.

Raise an Error if no _identifyingKeys_ can be determined.

If no matching entity found then create entity using supplied _data_.

If a matching entity is found, then update it if necessary with _data_.

Return update or create promise.

##### Parameters

| Name              | Type       | Default value |
| :---------------- | :--------- | :------------ |
| `entityType`      | `string`   | `undefined`   |
| `data`            | `Data`     | `undefined`   |
| `identifyingKeys` | `string`[] | `[]`          |

##### Returns

`Promise`<`Data`\>

##### Defined in

[session.ts:593](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L593)

---

#### <a id="getcomponenturl" name="getcomponenturl"></a> getComponentUrl

▸ **getComponentUrl**(`componentId`): `null` \| `string`

Return an URL where _componentId_ can be downloaded.

##### Parameters

| Name          | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `componentId` | `string` | Is assumed to be present in the ftrack.server location. |

##### Returns

`null` \| `string`

URL where _componentId_ can be downloaded, null
if component id is not specified.

##### Defined in

[session.ts:847](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L847)

---

#### <a id="getidentifyingkey" name="getidentifyingkey"></a> getIdentifyingKey

▸ **getIdentifyingKey**(`entity`): `null` \| `string`

Get identifying key for _entity_

##### Parameters

| Name     | Type   |
| :------- | :----- |
| `entity` | `Data` |

##### Returns

`null` \| `string`

Identifying key for _entity_

##### Defined in

[session.ts:272](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L272)

---

#### <a id="getprimarykeyattributes" name="getprimarykeyattributes"></a> getPrimaryKeyAttributes

▸ **getPrimaryKeyAttributes**(`entityType`): `any`

Get primary key attributes from schema

##### Parameters

| Name         | Type     |
| :----------- | :------- |
| `entityType` | `string` |

##### Returns

`any`

List of primary key attributes.

##### Defined in

[session.ts:254](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L254)

---

#### <a id="getschema" name="getschema"></a> getSchema

▸ **getSchema**(`schemaId`): `null` \| `Data`

Return schema with id or null if not existing.

##### Parameters

| Name       | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `schemaId` | `string` | Id of schema model, e.g. `AssetVersion`. |

##### Returns

`null` \| `Data`

Schema definition

##### Defined in

[session.ts:687](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L687)

---

#### <a id="query" name="query"></a> query

▸ **query**(`expression`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single query operation with _expression_.

##### Parameters

| Name         | Type           | Description           |
| :----------- | :------------- | :-------------------- |
| `expression` | `string`       | API query expression. |
| `options`    | `QueryOptions` |                       |

##### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with an object
containing action, data and metadata

##### Defined in

[session.ts:707](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L707)

---

#### <a id="search" name="search"></a> search

▸ **search**(`options`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single search operation with _expression_.

##### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `options` | `SearchOptions` |
| `options` | `QueryOptions`  |

##### Returns

`Promise`<`Response`<`Data`\>\>

Promise which will be resolved with an object
containing data and metadata

##### Defined in

[session.ts:734](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L734)

---

#### <a id="thumbnailurl" name="thumbnailurl"></a> thumbnailUrl

▸ **thumbnailUrl**(`componentId`, `[options?`): `string`

Return an URL where a thumbnail for _componentId_ can be downloaded.

##### Parameters

| Name            | Type                    | Description                                                                               |
| :-------------- | :---------------------- | :---------------------------------------------------------------------------------------- |
| `componentId`   | `string`                | Is assumed to be present in the ftrack.server location and be of a valid image file type. |
| `[options?`     | `Object`                | = {}] - Options                                                                           |
| `[options.size` | `undefined` \| `number` | -                                                                                         |

##### Returns

`string`

URL where _componentId_ can be downloaded. Returns the
URL to a default thumbnail if component id is not
specified.

##### Defined in

[session.ts:875](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L875)

---

#### <a id="update" name="update"></a> update

▸ **update**(`type`, `keys`, `data`, `options?`): `Promise`<`Response`<`Data`\>\>

Perform a single update operation on _type_ with _keys_ and _data_.

##### Parameters

| Name      | Type                | Description                               |
| :-------- | :------------------ | :---------------------------------------- |
| `type`    | `string`            | Entity type                               |
| `keys`    | `string`[]          | Identifying keys, typically [<entity id>] |
| `data`    | `Data`              |                                           |
| `options` | `MutatationOptions` |                                           |

##### Returns

`Promise`<`Response`<`Data`\>\>

Promise resolved with the response.

##### Defined in

[session.ts:799](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/session.ts#L799)

# Interfaces

<a name="interfacesoperationcreateoperationmd"></a>

## Interface: CreateOperation

[operation](#modulesoperationmd).CreateOperation

Operations module

**`Namespace`**

operation

# Modules

<a name="moduleserrormd"></a>

## Namespace: error

### Table of contents

#### Variables

- [CreateComponentError](#createcomponenterror)
- [EventServerConnectionTimeoutError](#eventserverconnectiontimeouterror)
- [EventServerPublishError](#eventserverpublisherror)
- [EventServerReplyTimeoutError](#eventserverreplytimeouterror)
- [NotUniqueError](#notuniqueerror)
- [ServerError](#servererror)
- [ServerPermissionDeniedError](#serverpermissiondeniederror)
- [ServerValidationError](#servervalidationerror)

### Variables

#### <a id="createcomponenterror" name="createcomponenterror"></a> CreateComponentError

• `Const` **CreateComponentError**: typeof `CustomError`

Throw when file upload to event server is aborted or does not succeed.

**`Memberof`**

error

##### Defined in

[error.ts:85](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L85)

---

#### <a id="eventserverconnectiontimeouterror" name="eventserverconnectiontimeouterror"></a> EventServerConnectionTimeoutError

• `Const` **EventServerConnectionTimeoutError**: typeof `CustomError`

Throw when event server connection timeout occurs.

**`Memberof`**

error

##### Defined in

[error.ts:62](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L62)

---

#### <a id="eventserverpublisherror" name="eventserverpublisherror"></a> EventServerPublishError

• `Const` **EventServerPublishError**: typeof `CustomError`

Throw when event hub hasn't been connected to the event server.

**`Memberof`**

error

##### Defined in

[error.ts:71](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L71)

---

#### <a id="eventserverreplytimeouterror" name="eventserverreplytimeouterror"></a> EventServerReplyTimeoutError

• `Const` **EventServerReplyTimeoutError**: typeof `CustomError`

Throw when event reply timeout occurs.

**`Memberof`**

error

##### Defined in

[error.ts:53](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L53)

---

#### <a id="notuniqueerror" name="notuniqueerror"></a> NotUniqueError

• `Const` **NotUniqueError**: typeof `CustomError`

Throw when event server connection timeout occurs.

**`Memberof`**

error

##### Defined in

[error.ts:78](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L78)

---

#### <a id="servererror" name="servererror"></a> ServerError

• `Const` **ServerError**: typeof `CustomError`

Throw when a unknown server error occurs.

**`Memberof`**

error

##### Defined in

[error.ts:30](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L30)

---

#### <a id="serverpermissiondeniederror" name="serverpermissiondeniederror"></a> ServerPermissionDeniedError

• `Const` **ServerPermissionDeniedError**: typeof `CustomError`

Throw when a permission denied error occurs.

**`Memberof`**

error

##### Defined in

[error.ts:37](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L37)

---

#### <a id="servervalidationerror" name="servervalidationerror"></a> ServerValidationError

• `Const` **ServerValidationError**: typeof `CustomError`

Throw when a validation error occurs.

**`Memberof`**

error

##### Defined in

[error.ts:46](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/error.ts#L46)

<a name="modulesoperationmd"></a>

## Namespace: operation

### Table of contents

#### Interfaces

- [CreateOperation](#interfacesoperationcreateoperationmd)

#### Functions

- [create](#create)
- [delete](#delete)
- [query](#query)
- [search](#search)
- [update](#update)

### Functions

#### <a id="create" name="create"></a> create

▸ **create**(`type`, `data`): [`CreateOperation`](#interfacesoperationcreateoperationmd)

Return create operation object for entity _type_ and _data_.

**`Function`**

operation.create

**`Memberof`**

operation

##### Parameters

| Name   | Type     | Description                     |
| :----- | :------- | :------------------------------ |
| `type` | `string` | Entity type                     |
| `data` | `any`    | Entity data to use for creation |

##### Returns

[`CreateOperation`](#interfacesoperationcreateoperationmd)

API operation

##### Defined in

[operation.ts:84](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/operation.ts#L84)

---

#### <a id="delete" name="delete"></a> delete

▸ **delete**(`type`, `keys`): `DeleteOperation`

Return delete operation object for entity _type_ identified by _keys_.

**`Function`**

operation.delete

**`Memberof`**

operation

##### Parameters

| Name   | Type       | Description                               |
| :----- | :--------- | :---------------------------------------- |
| `type` | `string`   | Entity type                               |
| `keys` | `string`[] | Identifying keys, typically [<entity id>] |

##### Returns

`DeleteOperation`

API operation

##### Defined in

[operation.ts:161](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/operation.ts#L161)

---

#### <a id="query" name="query"></a> query

▸ **query**(`expression`): `QueryOperation`

Return query operation object for _expression_.

**`Function`**

operation.query

**`Memberof`**

operation

##### Parameters

| Name         | Type     | Description          |
| :----------- | :------- | :------------------- |
| `expression` | `string` | API query expression |

##### Returns

`QueryOperation`

API operation

##### Defined in

[operation.ts:100](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/operation.ts#L100)

---

#### <a id="search" name="search"></a> search

▸ **search**(`expression`): `SearchOperation`

Return search operation object for _expression_.

**`Function`**

operation.query

**`Memberof`**

operation

##### Parameters

| Name         | Type                     | Description          |
| :----------- | :----------------------- | :------------------- |
| `expression` | `SearchOperationOptions` | API query expression |

##### Returns

`SearchOperation`

API operation

##### Defined in

[operation.ts:112](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/operation.ts#L112)

---

#### <a id="update" name="update"></a> update

▸ **update**(`type`, `keys`, `data`): `UpdateOperation`

Return update operation object for entity _type_ identified by _keys_.

**`Function`**

operation.update

**`Memberof`**

operation

##### Parameters

| Name   | Type       | Description                               |
| :----- | :--------- | :---------------------------------------- |
| `type` | `string`   | Entity type                               |
| `keys` | `string`[] | Identifying keys, typically [<entity id>] |
| `data` | `any`      | values to update                          |

##### Returns

`UpdateOperation`

API operation

##### Defined in

[operation.ts:139](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/operation.ts#L139)

<a name="modulesprojectschemamd"></a>

## Namespace: projectSchema

### Table of contents

#### Functions

- [getStatuses](#getstatuses)

### Functions

#### <a id="getstatuses" name="getstatuses"></a> getStatuses

▸ **getStatuses**(`session`, `projectSchemaId`, `entityType`, `typeId?`): `Promise`<`any`\>

Return statuses from _projectSchemaId_ for _entityType_ and _typeId_.

_entityType_ should be a valid ftrack api schema id, .e.g. 'AssetVersion' or
'Task'.

_typeId_ can be used to get overridden statuses for a certain task type.

**`Memberof`**

project_schema

##### Parameters

| Name              | Type                           | Default value |
| :---------------- | :----------------------------- | :------------ |
| `session`         | [`Session`](#classessessionmd) | `undefined`   |
| `projectSchemaId` | `string`                       | `undefined`   |
| `entityType`      | `string`                       | `undefined`   |
| `typeId`          | `null` \| `string`             | `null`        |

##### Returns

`Promise`<`any`\>

##### Defined in

[project_schema.ts:21](https://github.com/ftrackhq/ftrack-javascript/blob/cbe0411/source/project_schema.ts#L21)
