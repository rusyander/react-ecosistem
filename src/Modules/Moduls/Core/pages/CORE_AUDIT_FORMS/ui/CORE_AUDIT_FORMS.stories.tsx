import type { Meta, StoryObj } from '@storybook/react';

import CORE_AUDIT_FORMS from './CORE_AUDIT_FORMS';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof CORE_AUDIT_FORMS> = {
  title: 'pages/CORE_AUDIT_FORMS',
  component: CORE_AUDIT_FORMS,
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
type Story = StoryObj<typeof CORE_AUDIT_FORMS>;

export const Dark: Story = {};
export const Light: Story = {};
