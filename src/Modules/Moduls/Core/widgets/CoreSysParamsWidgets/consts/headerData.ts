export const gridColsHeader = [
  { field: 'application_name', size: '150px', is_sortable_flag: true }, //Приложение
  { field: 'description', size: '220px', is_sortable_flag: true }, // Наименования параметра
  { field: 'sys_value', size: '80px', is_sortable_flag: true }, // Система
  { field: 'appl_value', size: '150px', is_sortable_flag: true }, // Приложение
  { field: 'role_value', size: '150px', is_sortable_flag: true }, // Роль
  { field: 'org_value', size: '100px', is_sortable_flag: true }, // Организация
  { field: 'user_value', size: '100px', is_sortable_flag: true }, // Пользователь
];

export const filterBlock = [
  {
    fieldName: 'application_name',
    name: 'e.id.applicationCode',
    displayOrder: 1,
    filterCondition: '=',
    filterDisplayTypeCode: 'L',
    filterDictCode: 'TEST',
    filterCodeProperty: '-1',
    filterUpperSign: null,
    filterLikePercSign: null,
    filterAttributeCode: 'CORE_APPLICATIONS',
    width: '70',
    isSortableFlagCode: 'Y',

    applicationCode: 'CORE',
    dataTypeId: 1,
    colTypeCode: 'STANDARD',
    sortColName: 'a.name1',
    filterColName: 'e.id.applicationCode',
    filterGroup: null,
    filterNameProperty: 'name',
    filterDictFormClassRefName: null,
  },

  {
    fieldName: 'description',
    name: 'e.description1',
    displayOrder: 1,
    filterCondition: 'LIKE',
    filterDisplayTypeCode: 'F',
    filterDictCode: 'TEST',
    filterCodeProperty: '-1',
    filterUpperSign: 'BOTH',
    filterLikePercSign: 'ALL',
    width: '140',
    isSortableFlagCode: 'Y',

    applicationCode: 'CORE',
    dataTypeId: 1,
    colTypeCode: 'STANDARD',
    sortColName: 'a.name1',
    filterColName: 'e.description1',
    filterGroup: null,
    filterAttributeCode: null,
    filterNameProperty: 'name',
    filterDictFormClassRefName: null,
  },
];
