import type { Meta, StoryObj } from '@storybook/react';

import CORE_SYS_PARAMS from './CORE_SYS_PARAMS';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof CORE_SYS_PARAMS> = {
  title: 'pages/CORE_SYS_PARAMS',
  component: CORE_SYS_PARAMS,
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
type Story = StoryObj<typeof CORE_SYS_PARAMS>;

export const Dark: Story = {};
export const Light: Story = {};
