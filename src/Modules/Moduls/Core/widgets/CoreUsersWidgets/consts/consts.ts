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
  { field: 'org_name', size: '220px', is_sortable_flag: true },
  { field: 'first_last_name', size: '220px', is_sortable_flag: true },
  { field: 'login', size: '140px', is_sortable_flag: true },
  { field: 'start_date', size: '100px', is_sortable_flag: true },
  { field: 'end_date', size: '200px', is_sortable_flag: true },
  { field: 'is_active_flag_name', size: '70px', is_sortable_flag: true },
];
