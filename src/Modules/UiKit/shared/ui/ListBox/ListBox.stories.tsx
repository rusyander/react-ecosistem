import type { Meta, StoryObj } from '@storybook/react';

import { ListBox } from './ListBox';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/StoreDecorator';

const meta: Meta<typeof ListBox> = {
  title: 'shared/ListBox',
  component: ListBox,
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
type Story = StoryObj<typeof ListBox>;

export const Primary: Story = {
  args: {
    items: [
      {
        content: 'Item 1',
        value: 'Item 1',
      },
      {
        content: 'Item 2',
        value: 'Item 2',
      },
      {
        content: 'Item 3',
        value: 'Item 3',
      },
      {
        content: 'Item 4',
        value: 'Item 4',
      },
    ],
    defaultValue: 'Item 1',
    value: 'Item 1',
    direction: 'top left',
  },
};

Primary.decorators = [
  (Story) => (
    <ThemeProvider>
      <div className={`'app' ${Theme.DARK}`}>
        <Story />
      </div>
    </ThemeProvider>
  ),
  // StoreDecorator({
  //   articleDetails: {
  //     data: {},
  //   },
  // }),
];

export const TopRight: Story = {
  args: {
    items: [
      {
        content: 'Item 1',
        value: 'Item 1',
      },
      {
        content: 'Item 2',
        value: 'Item 2',
      },
      {
        content: 'Item 3',
        value: 'Item 3',
      },
      {
        content: 'Item 4',
        value: 'Item 4',
      },
    ],
    defaultValue: 'Item 1',
    value: 'Item 1',
    direction: 'top right',
  },
};
export const BottomLeft: Story = {
  args: {
    items: [
      {
        content: 'Item 1',
        value: 'Item 1',
      },
      {
        content: 'Item 2',
        value: 'Item 2',
      },
      {
        content: 'Item 3',
        value: 'Item 3',
      },
      {
        content: 'Item 4',
        value: 'Item 4',
      },
    ],
    defaultValue: 'Item 1',
    value: 'Item 1',
    direction: 'bottom left',
  },
};
export const BottomRight: Story = {
  args: {
    items: [
      {
        content: 'Item 1',
        value: 'Item 1',
      },
      {
        content: 'Item 2',
        value: 'Item 2',
      },
      {
        content: 'Item 3',
        value: 'Item 3',
      },
      {
        content: 'Item 4',
        value: 'Item 4',
      },
    ],
    defaultValue: 'Item 1',
    value: 'Item 1',
    direction: 'bottom right',
  },
};
