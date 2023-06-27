import type { Meta, StoryObj } from '@storybook/react';

import CORE_AUDIT_SESSIONS from './CORE_AUDIT_SESSIONS';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof CORE_AUDIT_SESSIONS> = {
  title: 'pages/CORE_AUDIT_SESSIONS',
  component: CORE_AUDIT_SESSIONS,
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
type Story = StoryObj<typeof CORE_AUDIT_SESSIONS>;

export const Dark: Story = {};
export const Light: Story = {};
