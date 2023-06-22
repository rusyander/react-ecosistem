import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';

const meta: Meta<typeof Loader> = {
  title: 'shared/Loader',
  component: Loader,
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
type Story = StoryObj<typeof Loader>;

export const PRIMARY: Story = {
  args: {
    className: 'lds-ellipsis',
  },
};
