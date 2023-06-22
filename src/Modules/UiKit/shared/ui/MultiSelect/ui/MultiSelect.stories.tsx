import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "./MultiSelect";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "shared/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: [
      { value: "1", label: "Oon 1 sdasdasadasadasasdasdasdasd" },
      { value: "2", label: "Opion 2" },
      { value: "3", label: "Oon 3" },
      { value: "4", label: "Option 4" },
      { value: "5", label: " 4" },
      { value: "6", label: "Opon 4" },
      { value: "7", label: "On 4" },
    ],
  },
};
