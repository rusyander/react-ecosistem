import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenu } from './DropdownMenu';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  reducer: {} as ReducersMapObject,
});

const meta = {
  title: 'shared/DropdownMenu',
  component: DropdownMenu,
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
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    menuItems: [
      {
        title: 'Home',
        url: '/page1',
      },
      {
        title: 'Services',
        url: '/page1',
        submenu: [
          {
            title: 'web design',
            url: '/page2',
          },
          {
            title: 'web development',
            url: '/page1',
            submenu: [
              {
                title: 'Frontend',
                url: '/page3',
              },
              {
                title: 'Backend',
                submenu: [
                  {
                    title: 'NodeJS',
                    url: '/page2',
                  },
                  {
                    title: 'PHP',
                    url: '/page1',
                  },
                ],
              },
            ],
          },
          {
            title: 'SEO',
            url: '/page1',
          },
        ],
      },
      {
        title: 'About',
        url: '//page1',
        submenu: [
          {
            title: 'Who we are',
            url: '/page2',
          },
          {
            title: 'Our values',
            url: '/page3',
          },
        ],
      },
    ],
  },
};
