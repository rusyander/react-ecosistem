import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "./Loader";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "shared/Loader",
  component: Loader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
