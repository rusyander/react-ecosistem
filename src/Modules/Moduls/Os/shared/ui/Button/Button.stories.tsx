import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
  // decorators: [
  //   (Story) => (
  //     <div className={`'app' ${Theme.DARK}`}>
  //       <Story />
  //     </div>
  //   ),
  // ],

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
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Text',
  },
};

export const Clear: Story = {
  args: {
    children: 'Text',
    theme: 'clear',
  },
};

export const ClearInverted: Story = {
  args: {
    children: 'Text',
    theme: 'clearInvert',
  },
};

export const Outline: Story = {
  args: {
    children: 'Text',
    theme: 'outline',
  },
};

export const OutlineSizeL: Story = {
  args: {
    children: 'Text',
    theme: 'outline',
    size: 'size_l',
  },
};

export const OutlineSizeM: Story = {
  args: {
    children: 'Text',
    theme: 'outline',
    size: 'size_m',
  },
};

export const OutlineSizeXL: Story = {
  args: {
    children: 'Text',
    theme: 'background',
    size: 'size_xl',
  },
};

export const BackgroundTheme: Story = {
  args: {
    children: 'Text',
    theme: 'background',
  },
};

export const BACKGROUND_INVERTED: Story = {
  args: {
    children: 'Text',
    theme: 'backgroundInverted',
  },
};
export const Disabled: Story = {
  args: {
    children: 'Text',
    theme: 'backgroundInverted',
    disabled: true,
  },
};

export const Square: Story = {
  args: {
    children: '>',
    theme: 'backgroundInverted',
    square: true,
  },
};

export const SquareSizeL: Story = {
  args: {
    children: '>',
    theme: 'backgroundInverted',
    square: true,
    size: 'size_l',
  },
};

export const SquareSizeM: Story = {
  args: {
    children: '>',
    theme: 'backgroundInverted',
    square: true,
    size: 'size_m',
  },
};

export const SquareSizeXL: Story = {
  args: {
    children: '>',
    theme: 'backgroundInverted',
    square: true,
    size: 'size_xl',
  },
};
