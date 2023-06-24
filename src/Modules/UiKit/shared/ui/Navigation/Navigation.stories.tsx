import type { Meta, StoryObj } from '@storybook/react';

import { Navigation } from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {} as any,
});
const meta = {
  title: 'shared/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'Home',
    path: '/page1',
  },
};
