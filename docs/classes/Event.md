[@ftrack/api](../README.md) / [Exports](../modules.md) / Event

# Class: Event

ftrack API Event class.

## Table of contents

### Constructors

- [constructor](Event.md#constructor)

### Methods

- [addSource](Event.md#addsource)
- [getData](Event.md#getdata)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new Event**(`topic`, `data`, `options?`)

Construct Event instance with `topic`, `data` and additional `options`.

`topic` should be a string representing the event.

`data` should be an object with the event payload.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `topic`   | `string` |
| `data`    | `object` |
| `options` | `Object` |

#### Defined in

[event.ts:24](https://github.com/ftrackhq/ftrack-javascript/blob/91f099c/source/event.ts#L24)

## Methods

### <a id="addsource" name="addsource"></a> addSource

▸ **addSource**(`source`): `void`

Add source to event data.

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `source` | `any` |

#### Returns

`void`

#### Defined in

[event.ts:45](https://github.com/ftrackhq/ftrack-javascript/blob/91f099c/source/event.ts#L45)

---

### <a id="getdata" name="getdata"></a> getData

▸ **getData**(): `Object`

Return event data.

#### Returns

`Object`

#### Defined in

[event.ts:40](https://github.com/ftrackhq/ftrack-javascript/blob/91f099c/source/event.ts#L40)
