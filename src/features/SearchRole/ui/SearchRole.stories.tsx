import type { Meta, StoryObj } from '@storybook/react';

import { SearchRole } from './SearchRole';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/StoreDecorator';

const meta: Meta<typeof SearchRole> = {
  title: 'shared/SearchRole',
  component: SearchRole,
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
type Story = StoryObj<typeof SearchRole>;

export const Primary: Story = {
  args: {},
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
