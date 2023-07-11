import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

const meta = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// let values: any = "";

export const Primary: Story = {
  args: {
    label: 'label value',
    placeholder: 'placeholder value',
    autoFocus: true,
    onChange: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (value: any) => null;
    },
    value: '',
  },
};
