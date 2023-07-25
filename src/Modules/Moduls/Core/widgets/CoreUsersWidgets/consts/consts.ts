import { GridRow } from '../../../shared/types/filterBlock';

export const pageCountOptions = [
  { value: 2, label: '2' },
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];
export const gridCols: GridRow[] = [
  // { field: 'user_id', size: '220px', is_sortable_flag: true },
  { field: 'org_name', size: '220px', is_sortable_flag: true },
  { field: 'first_last_name', size: '220px', is_sortable_flag: true },
  { field: 'login', size: '140px', is_sortable_flag: true },
  { field: 'start_date', size: '100px', is_sortable_flag: true },
  { field: 'end_date', size: '200px', is_sortable_flag: true },
  { field: 'is_active_flag_name', size: '70px', is_sortable_flag: true },
];

export const filterBlock = [
  {
    itemName: 'org_name',
    colName: 'e.organizationId',
    dataType: 2,
    condition: '=',
    value: '',
    displayType: 'FB',
    dictCode: 'TEST',
    codeProperty: '-1',
  },
  {
    itemName: 'user_id',
    colName: 'user_id',
    dataType: 2,
    condition: 'BETWEEN',
    value: '',
    displayType: 'F',
  },
  {
    itemName: 'first_last_name',
    colName: 'e.firstLastName',
    dataType: 1,
    condition: 'LIKE',
    upperSign: 'BOTH',
    likePercSign: 'ALL',
    value: '',
    displayType: 'F',
  },
  {
    itemName: 'login',
    colName: 'e.login',
    dataType: 1,
    condition: 'LIKE',
    upperSign: 'BOTH',
    likePercSign: 'ALL',
    value: '',
    displayType: 'F',
  },
  {
    itemName: 'is_active_flag_name',
    colName: 'e.isActiveFlagCode',
    condition: '=',
    dataType: 1,
    displayType: 'L',
    dictCode: 'TEST',
    codeProperty: 'code',
    nameProperty: 'name',
    attrCode: 'YES_NO',
  },
];

//     organizationId: 43,
//     organizationCode: 'main_seven',
//     name: 'Головная организация 7',
//     iconCode: null,
//     childCount: 2,
//     parentOrganizationId: null,

export const standartInputs = [
  {
    itemName: 'first',
    colName: 'e.first',
    dataType: 1,
    displayType: 'F',
    value: '',
    required: true,
  },
  {
    itemName: 'two',
    colName: 'e.two',
    dataType: 1,
    displayType: 'F',
    value: '',
    required: true,
  },
  {
    itemName: 'tree',
    colName: 'e.tree',
    dataType: 1,
    displayType: 'F',
    value: '',
    required: false,
  },
];
