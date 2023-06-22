import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Avatar> = {
  title: "shared/Avatar",
  component: Avatar,
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <Suspense fallback={""}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Suspense>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    src: "https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg",
    size: 150,
  },
};

export const Small: Story = {
  args: {
    src: "https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg",
    size: 50,
  },
};
