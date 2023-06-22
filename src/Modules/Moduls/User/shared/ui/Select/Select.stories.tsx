import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';

const meta: Meta<typeof Select> = {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <Suspense fallback={''}>
        <BrowserRouter>
          <StoreProvider>
            <ThemeProvider>
              <Story />
            </ThemeProvider>
          </StoreProvider>
        </BrowserRouter>
      </Suspense>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const PRIMARY: Story = {
  args: {
    label: 'Укажи значение',
    options: [
      { value: '1', content: '1' },
      { value: '2', content: '2' },
      { value: '3', content: '3' },
      { value: '4', content: '4' },
    ],
  },
};
