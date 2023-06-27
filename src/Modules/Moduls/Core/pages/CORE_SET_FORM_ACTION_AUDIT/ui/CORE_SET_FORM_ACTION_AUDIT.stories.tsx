import type { Meta, StoryObj } from '@storybook/react';

import CORE_SET_FORM_ACTION_AUDIT from './CORE_SET_FORM_ACTION_AUDIT';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof CORE_SET_FORM_ACTION_AUDIT> = {
  title: 'pages/CORE_SET_FORM_ACTION_AUDIT',
  component: CORE_SET_FORM_ACTION_AUDIT,
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
type Story = StoryObj<typeof CORE_SET_FORM_ACTION_AUDIT>;

export const Dark: Story = {};
export const Light: Story = {};
