import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/StoreDecorator';
import { Button } from '../Button';

const meta: Meta<typeof Dropdown> = {
  title: 'shared/Dropdown',
  component: Dropdown,
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
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    trigger: <Button>Dropdown</Button>,
    items: [
      {
        content: 'Item 1',
        onClick: () => {
          console.log('Item 1');
        },
      },
      {
        content: 'Item 2',
        onClick: () => {
          console.log('Item 1');
        },
      },
      {
        content: 'Item 3',
        onClick: () => {
          console.log('Item 1');
        },
      },
    ],
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
