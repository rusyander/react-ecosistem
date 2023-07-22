import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from './Grid';
import { BrowserRouter } from 'react-router-dom';

const rowHeaderElements = [
  { id: '1', accessorKey: 'items', header: 'Items' },
  { id: '2', accessorKey: 'order', header: 'Order' },
  { id: '3', accessorKey: 'amount', header: 'Amount' },
  { id: '4', accessorKey: 'status', header: 'Status' },
  { id: '5', accessorKey: 'deliveryDriver', header: 'Delivery Driver' },
];

const rowDataElements = [
  {
    order: '3213456785',
    items: 'Large Detroit Style Pizza1',
    amount: '$31.437',
    deliveryDriver: 'John Doe',
    status: 'Delivered',
    id: '1',
  },
  {
    items: 'Large Detroit Style Pizza2',
    order: '3213456785',
    amount: '$31.434',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '2',
  },
  {
    items: 'Large Detroit Style Pizza3',
    order: '3213456785',
    amount: '$31.433',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '3',
  },
  {
    items: 'Large Detroit Style Pizza4',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '4',
  },
  {
    items: 'Large Detroit Style Pizza5',
    order: '3213456785',
    amount: '$31.431',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '5',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '6',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '7',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '8',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '9',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '10',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '11',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '12',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '13',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '14',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '15',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '16',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '17',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '18',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '19',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '20',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '21',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '22',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '23',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '24',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '25',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '26',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '27',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '28',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '29',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '30',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '31',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '32',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '33',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '34',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '35',
  },
  {
    items: 'Large Detroit Style Pizza6',
    order: '3213456785',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '36',
  },
  {
    items: '1000000000',
    order: '1000000',
    amount: '$31.432',
    status: 'Delivered',
    deliveryDriver: 'John Doe',
    id: '37',
  },
];

const selectOptions = [
  { value: 200, label: '200' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
];

const meta = {
  title: 'module/Grid',
  component: Grid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // headerData: rowHeaderElements,
    rowData: rowDataElements,
    hasOpenGridRowModal: true,
    pageCountOptions: selectOptions,
    defaultPageSize: 10,
    totalDataCount: rowDataElements.length,
    showIsOpenFilter: true,
    showRefreshButton: true,
    gridHeight: 500,
    onPaginationPageChange: (page: number, limit: number) => {
      return null;
    },
    disableSorting: true,
    gridCols: [
      { field: 'org_name', size: '220px', is_sortable_flag: true },
      { field: 'first_last_name', size: '220px', is_sortable_flag: true },
      { field: 'login', size: '140px', is_sortable_flag: true },
      { field: 'start_date', size: '100px', is_sortable_flag: true },
      { field: 'end_date', size: '200px', is_sortable_flag: true },
      { field: 'is_active_flag_name', size: '70px', is_sortable_flag: true },
    ],
    // columnSize: ['285px', '260px', '183px', '183px', '183px', '183px'],
  },
};
