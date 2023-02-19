# Namespace: operation

## Interfaces

- [CreateOperation](../interfaces/operation.CreateOperation.md)

## Functions

### <a id="create" name="create"></a> create

▸ **create**(`type`, `data`): [`CreateOperation`](../interfaces/operation.CreateOperation.md)

Return create operation object for entity `type` and `data`.

**`Function`**

operation.create

**`Memberof`**

operation

#### Parameters

| Name   | Type     | Description                     |
| :----- | :------- | :------------------------------ |
| `type` | `string` | Entity type                     |
| `data` | `any`    | Entity data to use for creation |

#### Returns

[`CreateOperation`](../interfaces/operation.CreateOperation.md)

- API operation

#### Defined in

[operation.ts:84](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L84)

---

### <a id="delete" name="delete"></a> delete

▸ **delete**(`type`, `keys`): `DeleteOperation`

Return delete operation object for entity `type` identified by `keys`.

**`Function`**

operation.delete

**`Memberof`**

operation

#### Parameters

| Name   | Type       | Description                               |
| :----- | :--------- | :---------------------------------------- |
| `type` | `string`   | Entity type                               |
| `keys` | `string`[] | Identifying keys, typically [<entity id>] |

#### Returns

`DeleteOperation`

API operation

#### Defined in

[operation.ts:161](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L161)

---

### <a id="query" name="query"></a> query

▸ **query**(`expression`): `QueryOperation`

Return query operation object for `expression`.

**`Function`**

operation.query

**`Memberof`**

operation

#### Parameters

| Name         | Type     | Description          |
| :----------- | :------- | :------------------- |
| `expression` | `string` | API query expression |

#### Returns

`QueryOperation`

API operation

#### Defined in

[operation.ts:100](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L100)

---

### <a id="search" name="search"></a> search

▸ **search**(`expression`): `SearchOperation`

Return search operation object for `expression`.

**`Function`**

operation.query

**`Memberof`**

operation

#### Parameters

| Name         | Type                     | Description          |
| :----------- | :----------------------- | :------------------- |
| `expression` | `SearchOperationOptions` | API query expression |

#### Returns

`SearchOperation`

- API operation

#### Defined in

[operation.ts:112](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L112)

---

### <a id="update" name="update"></a> update

▸ **update**(`type`, `keys`, `data`): `UpdateOperation`

Return update operation object for entity `type` identified by `keys`.

**`Function`**

operation.update

**`Memberof`**

operation

#### Parameters

| Name   | Type       | Description                               |
| :----- | :--------- | :---------------------------------------- |
| `type` | `string`   | Entity type                               |
| `keys` | `string`[] | Identifying keys, typically [<entity id>] |
| `data` | `any`      | Values to update                          |

#### Returns

`UpdateOperation`

API operation

#### Defined in

[operation.ts:139](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/operation.ts#L139)
