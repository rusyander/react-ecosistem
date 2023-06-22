import type { Meta, StoryObj } from "@storybook/react";

import { FilterBlock } from "./FilterBlock";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

const meta = {
  title: "features/FilterBlock",
  component: FilterBlock,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof FilterBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// let values: any = "";

export const Primary: Story = {
  args: {
    canOpenFilter: true,
  },
};
