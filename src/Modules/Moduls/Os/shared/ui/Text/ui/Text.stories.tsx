import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Text> = {
  title: 'shared/Text',
  component: Text,
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
  // decorators: [
  //   (Story) => (
  //     <div className={`'app' ${Theme.DARK}`}>
  //       <Story />
  //     </div>
  //   ),
  // ],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Title: Story = {
  args: {
    title: 'title TITLE',
  },
};

export const Texts: Story = {
  args: {
    text: 'text TEXT',
  },
};

export const TitleDark: Story = {
  args: {
    title: 'title TITLE',
  },
};
TitleDark.decorators = [
  (Story) => (
    <div className={`'app_dark_theme' ${Theme.DARK}`}>
      <Story />
    </div>
  ),
];

export const TextsDark: Story = {
  args: {
    text: 'text TEXT',
  },
};
TextsDark.decorators = [
  (Story) => (
    <div className={`'app_dark_theme' ${Theme.DARK}`}>
      <Story />
    </div>
  ),
];

export const TextM: Story = {
  args: {
    text: 'text TEXT',
    size: 'sizeM',
  },
};

export const TextsL: Story = {
  args: {
    text: 'text TEXT',
    size: 'sizeL',
  },
};

export const TextsPrimary: Story = {
  args: {
    text: 'text Primary',
    theme: 'primary',
  },
};
export const TextsError: Story = {
  args: {
    text: 'text Error',
    theme: 'error',
  },
};
