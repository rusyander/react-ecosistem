import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';

const meta: Meta<typeof Navbar> = {
  title: 'widgets/Navbar',
  component: Navbar,
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
  //     <StoreProvider>
  //       <BrowserRouter>
  //         <div className={`'app' ${Theme.DARK}`}>
  //           <Story />
  //         </div>
  //       </BrowserRouter>
  //     </StoreProvider>
  //   ),
  // ],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Light: Story = {};

export const dark: Story = {};
