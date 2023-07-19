import { t } from 'i18next';

export const pageCountOptions = [
  { value: 2, label: '2' },
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

export const headerGrid = [
  { id: '1', accessorKey: 'org_name', header: t('Организация') },
  { id: '2', accessorKey: 'first_last_name', header: t('ФИО') },
  { id: '3', accessorKey: 'login', header: 'Логин' },
  { id: '4', accessorKey: 'start_date', header: t('Начало действия') },
  { id: '5', accessorKey: 'end_date', header: t('Окончание действия') },
  { id: '6', accessorKey: 'is_active_flag_name', header: t('Активен') },
  // ---- not used
  { id: '', accessorKey: '', header: '' },
  { id: '', accessorKey: '', header: '' },
  { id: '', accessorKey: '', header: '' },
];
