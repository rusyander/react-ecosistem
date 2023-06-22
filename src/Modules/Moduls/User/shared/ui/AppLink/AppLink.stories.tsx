import type { Meta, StoryObj } from '@storybook/react';

import AppLink from './AppLink';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof AppLink> = {
  title: 'shared/AppLink',
  component: AppLink,
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

  args: {
    to: '/',
  },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const PRIMARY: Story = {
  args: {
    children: 'AppLink PRIMARY',
    theme: 'primary',
  },
};
export const RED: Story = {
  args: {
    children: 'AppLink RED',
    theme: 'red',
  },
};
export const SECONDARY: Story = {
  args: {
    children: 'AppLink SECONDARY',
    theme: 'secondary',
  },
};
