// export const gridColsHeader = [
//   { field: 'application_name', size: '150px', is_sortable_flag: true }, //Приложение
//   { field: 'description', size: '220px', is_sortable_flag: true }, // Наименования параметра
//   { field: 'sys_value', size: '80px', is_sortable_flag: true }, // Система
//   { field: 'appl_value', size: '150px', is_sortable_flag: true }, // Приложение
//   { field: 'role_value', size: '150px', is_sortable_flag: true }, // Роль
//   { field: 'org_value', size: '100px', is_sortable_flag: true }, // Организация
//   { field: 'user_value', size: '100px', is_sortable_flag: true }, // Пользователь
// ];

export const gridColsHeader = [
  {
    field: 'application_name',
    header: 'application_name',
    size: '150px',
    is_sortable_flag: true,
  }, //Приложение
  {
    field: 'description',
    header: 'description',
    size: '220px',
    is_sortable_flag: true,
  }, // Наименования параметра
  {
    field: 'sys_value',
    header: 'sys_value',
    size: '80px',
    is_sortable_flag: true,
  }, // Система
  {
    field: 'appl_value',
    header: 'appl_value',
    size: '150px',
    is_sortable_flag: true,
  }, // Приложение
  {
    field: 'role_value',
    header: 'role_value',
    size: '150px',
    is_sortable_flag: true,
  }, // Роль
  {
    field: 'org_value',
    header: 'org_value',
    size: '100px',
    is_sortable_flag: true,
  }, // Организация
  {
    field: 'user_value',
    header: 'user_value',
    size: '100px',
    is_sortable_flag: true,
  }, // Пользователь
];

// header
const dddd = {
  sys_value_style: 'Y',
  sys_update_allowed_flag: 'Y',
  displayTypeCode: 'L',
  parameter_code: 'AUDIT_ACTION',
  org_value_style: 'Y',
  appl_update_allowed_flag: 'Y',
  user_editable_flag: 'N',
  user_value: 'Не действует',
  description: 'Вести учёт действий пользователя?',
  role_enabled_flag: 'Y',
  org_value: 'Да',
  appl_value_style: 'Y',
  role_value_style: 'Y',
  application_name: 'Базовый функционал',
  role_value: 'Нет',
  appl_enabled_flag: 'Y',
  sys_enabled_flag: 'Y',
  sys_value: 'Да',
  user_update_allowed_flag: 'N',
  user_value_style: 'N',
  appl_value: 'Нет',
  org_enabled_flag: 'Y',
  role_update_allowed_flag: 'Y',
  org_update_allowed_flag: 'Y',
  application_code: 'CORE',
  user_visible_flag: 'Y',
  user_enabled_flag: 'N',
  attribute_code: 'YES_NO',
};

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
