# Namespace: projectSchema

## Functions

### <a id="getstatuses" name="getstatuses"></a> getStatuses

▸ **getStatuses**(`session`, `projectSchemaId`, `entityType`, `typeId?`): `Promise`<`any`\>

Return statuses from `projectSchemaId` for `entityType` and `typeId`.

`entityType` should be a valid ftrack api schema id, .e.g. 'AssetVersion' or
'Task'.

`typeId` can be used to get overridden statuses for a certain task type.

**`Memberof`**

project_schema

#### Parameters

| Name              | Type                               | Default value |
| :---------------- | :--------------------------------- | :------------ |
| `session`         | [`Session`](../classes/Session.md) | `undefined`   |
| `projectSchemaId` | `string`                           | `undefined`   |
| `entityType`      | `string`                           | `undefined`   |
| `typeId`          | `null` \| `string`                 | `null`        |

#### Returns

`Promise`<`any`\>

#### Defined in

[project_schema.ts:21](https://github.com/ftrackhq/ftrack-javascript/blob/d4efce9/source/project_schema.ts#L21)
