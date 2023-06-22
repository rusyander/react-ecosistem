import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
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
type Story = StoryObj<typeof Input>;

export const Light: Story = {
  args: {
    placeholder: 'Наберите текст',
    autoFocus: true,
  },
};
Light.decorators = [
  (Story) => (
    <div className={`'app' ${Theme.LIGHT}`}>
      <Story />
    </div>
  ),
];

export const Dark: Story = {
  args: {
    placeholder: 'Наберите текст',
    autoFocus: true,
  },
};
Dark.decorators = [
  (Story) => (
    <div className={`'app' ${Theme.DARK}`}>
      <Story />
    </div>
  ),
];
