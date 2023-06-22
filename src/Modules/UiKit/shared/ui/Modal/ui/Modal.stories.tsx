import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./Modal";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "shared/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <h1>MODAL</h1>,
    isOpen: true,
    lazy: true,
  },
};
