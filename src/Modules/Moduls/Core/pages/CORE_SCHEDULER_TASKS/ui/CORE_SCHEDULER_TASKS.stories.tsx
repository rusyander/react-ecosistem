import type { Meta, StoryObj } from '@storybook/react';

import CORE_SCHEDULER_TASKS from './CORE_SCHEDULER_TASKS';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof CORE_SCHEDULER_TASKS> = {
  title: 'pages/CORE_SCHEDULER_TASKS',
  component: CORE_SCHEDULER_TASKS,
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
type Story = StoryObj<typeof CORE_SCHEDULER_TASKS>;

export const Dark: Story = {};
export const Light: Story = {};
