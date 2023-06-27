import type { Meta, StoryObj } from '@storybook/react';

import CORE_SCHEDULER_ADMIN from './CORE_SCHEDULER_ADMIN';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof CORE_SCHEDULER_ADMIN> = {
  title: 'pages/CORE_SCHEDULER_ADMIN',
  component: CORE_SCHEDULER_ADMIN,
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
type Story = StoryObj<typeof CORE_SCHEDULER_ADMIN>;

export const Dark: Story = {};
export const Light: Story = {};
