import type { Meta, StoryObj } from '@storybook/react';

// @ts-ignore
import { Select } from './Select';

const meta = {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: [
      { value: 200, label: '200' },
      { value: 10, label: '10' },
      { value: 20, label: '20' },
      { value: 30, label: '30' },
      { value: 40, label: '40' },
    ],
  },
};
