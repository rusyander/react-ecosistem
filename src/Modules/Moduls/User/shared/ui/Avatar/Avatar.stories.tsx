import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ImageAvatar from '../../assets//test/avatar.jpg';

const meta: Meta<typeof Avatar> = {
  title: 'shared/Avatar',
  component: Avatar,
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
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    src: ImageAvatar,
    size: 150,
  },
};

export const Small: Story = {
  args: {
    src: ImageAvatar,
    size: 50,
  },
};
