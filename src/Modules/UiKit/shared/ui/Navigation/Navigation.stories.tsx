import type { Meta, StoryObj } from "@storybook/react";

import { Navigation } from "./Navigation";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createReduxStore } from "../../../app/providers/StoreProvider";
const store = createReduxStore();
const meta = {
  title: "shared/Navigation",
  component: Navigation,
  tags: ["autodocs"],
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
    name: "Home",
    path: "/page1",
  },
};
