import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Skeleton> = {
  title: 'shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <Suspense fallback={''}>
        <BrowserRouter>
          <StoreProvider>
            <ThemeProvider>
              <div className={`'app' ${Theme.DARK}`}>
                <Story />
              </div>
            </ThemeProvider>
          </StoreProvider>
        </BrowserRouter>
      </Suspense>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Normal: Story = {
  args: {
    width: '100%',
    height: 200,
    border: '10px',
  },
};

export const Circle: Story = {
  args: {
    width: 100,
    height: 100,
    border: '50%',
  },
};

export const NormalLight: Story = {
  args: {
    width: '100%',
    height: 200,
    border: '10px',
  },
};

NormalLight.decorators = [
  (Story) => (
    <ThemeProvider>
      <div className={`'app' ${Theme.ORANGE}`}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];

export const CircleLight: Story = {
  args: {
    width: 100,
    height: 100,
    border: '50%',
  },
};

CircleLight.decorators = [
  (Story) => (
    <ThemeProvider>
      <div className={`'app' ${Theme.ORANGE}`}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];
