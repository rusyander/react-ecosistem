import type { Meta, StoryObj } from "@storybook/react";

import { TreeViewInPopup } from "./TreeViewInPopup";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

const meta = {
  title: "features/TreeViewInPopup",
  component: TreeViewInPopup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof TreeViewInPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

// let values: any = "";

export const Primary: Story = {
  args: {
    data: [
      {
        label: "Node 1",
        id: "1",
        children: [
          {
            label: "Node 1.1",
            id: "2",
            children: [
              { label: "Node 1.1.1", id: "3" },
              {
                label: "Node 1.1.2",
                id: "4",
                children: [{ id: "5", label: "Node 1.1.2" }],
              },
            ],
          },
          { id: "6", label: "Node 1.2" },
        ],
      },
      {
        id: "7",
        label: "Node 2",
        children: [
          { label: "Node 2.1", id: "8" },
          { label: "Node 2.2", id: "9" },
        ],
      },
    ],
  },
};
