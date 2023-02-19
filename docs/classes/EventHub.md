[@ftrack/api](../README.md) / [Exports](../modules.md) / EventHub

# Class: EventHub

ftrack API Event hub.

## Table of contents

### Constructors

- [constructor](EventHub.md#constructor)

### Methods

- [connect](EventHub.md#connect)
- [getSubscriberByIdentifier](EventHub.md#getsubscriberbyidentifier)
- [isConnected](EventHub.md#isconnected)
- [publish](EventHub.md#publish)
- [publishAndWaitForReply](EventHub.md#publishandwaitforreply)
- [publishReply](EventHub.md#publishreply)
- [subscribe](EventHub.md#subscribe)
- [unsubscribe](EventHub.md#unsubscribe)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new EventHub**(`serverUrl`, `apiUser`, `apiKey`, `options?`)

Construct EventHub instance with API credentials.

**`Constructs`**

EventHub

#### Parameters

| Name                     | Type     | Description                                    |
| :----------------------- | :------- | :--------------------------------------------- |
| `serverUrl`              | `string` | Server URL                                     |
| `apiUser`                | `string` | API user                                       |
| `apiKey`                 | `string` | API key                                        |
| `options`                | `Object` |                                                |
| `options.applicationId?` | `string` | Application identifier, added to event source. |

#### Defined in

[event_hub.ts:106](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L106)

## Methods

### <a id="connect" name="connect"></a> connect

▸ **connect**(): `void`

Connect to the event server.

#### Returns

`void`

#### Defined in

[event_hub.ts:140](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L140)

---

### <a id="getsubscriberbyidentifier" name="getsubscriberbyidentifier"></a> getSubscriberByIdentifier

▸ **getSubscriberByIdentifier**(`identifier`): `null` \| `Subscriber`

Return subscriber with matching `identifier`.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `identifier` | `string` |

#### Returns

`null` \| `Subscriber`

null if no subscriber with `identifier` found.

#### Defined in

[event_hub.ts:465](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L465)

---

### <a id="isconnected" name="isconnected"></a> isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`

True if connected to event server.

#### Defined in

[event_hub.ts:159](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L159)

---

### <a id="publish" name="publish"></a> publish

▸ **publish**(`event`, `options?`): `Promise`<`string`\>

Publish event and return promise resolved with event id when event has
been sent.

If `onReply` is specified, it will be invoked when any replies are
received.

If timeout is non-zero, the promise will be rejected if the event is not
sent before the timeout is reached. Should be specified as seconds and
will default to 10.

#### Parameters

| Name               | Type                | Description                                      |
| :----------------- | :------------------ | :----------------------------------------------- |
| `event`            | [`Event`](Event.md) | Event instance to publish                        |
| `options`          | `Object`            |                                                  |
| `options.onReply?` | `EventCallback`     | Function to be invoked when a reply is received. |
| `options.timeout?` | `number`            | Timeout in seconds. Defaults to 30.              |

#### Returns

`Promise`<`string`\>

Promise resolved with event id.

#### Defined in

[event_hub.ts:217](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L217)

---

### <a id="publishandwaitforreply" name="publishandwaitforreply"></a> publishAndWaitForReply

▸ **publishAndWaitForReply**(`event`, `«destructured»`): `Promise`<`unknown`\>

Publish event and wait for a single reply.

#### Parameters

| Name             | Type                | Description               |
| :--------------- | :------------------ | :------------------------ |
| `event`          | [`Event`](Event.md) | Event instance to publish |
| `«destructured»` | `Object`            | -                         |
| › `timeout`      | `number`            | -                         |

#### Returns

`Promise`<`unknown`\>

Promise resolved with reply event if received within timeout.

#### Defined in

[event_hub.ts:283](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L283)

---

### <a id="publishreply" name="publishreply"></a> publishReply

▸ **publishReply**(`sourceEventPayload`, `data`, `source?`): `Promise`<`string`\>

Publish reply event.

#### Parameters

| Name                 | Type             | Default value | Description                       |
| :------------------- | :--------------- | :------------ | :-------------------------------- |
| `sourceEventPayload` | `EventPayload`   | `undefined`   | Source event payload              |
| `data`               | `Data`           | `undefined`   | Response event data               |
| `source`             | `null` \| `Data` | `null`        | Response event source information |

#### Returns

`Promise`<`string`\>

#### Defined in

[event_hub.ts:541](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L541)

---

### <a id="subscribe" name="subscribe"></a> subscribe

▸ **subscribe**(`subscription`, `callback`, `metadata?`): `string`

Register to `subscription` events.

#### Parameters

| Name           | Type                 | Description                                                                          |
| :------------- | :------------------- | :----------------------------------------------------------------------------------- |
| `subscription` | `string`             | Expression to subscribe on. Currently, only "topic=value" expressions are supported. |
| `callback`     | `EventCallback`      | Function to be called when an event matching the subscription is returned.           |
| `metadata?`    | `SubscriberMetadata` | Optional information about subscriber.                                               |

#### Returns

`string`

Subscriber ID.

#### Defined in

[event_hub.ts:346](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L346)

---

### <a id="unsubscribe" name="unsubscribe"></a> unsubscribe

▸ **unsubscribe**(`identifier`): `boolean`

Unsubscribe from `subscription` events.

#### Parameters

| Name         | Type     | Description                                   |
| :----------- | :------- | :-------------------------------------------- |
| `identifier` | `string` | Subscriber ID returned from subscribe method. |

#### Returns

`boolean`

True if a subscriber was removed, false otherwise

#### Defined in

[event_hub.ts:362](https://github.com/ftrackhq/ftrack-javascript/blob/54b9b99/source/event_hub.ts#L362)
