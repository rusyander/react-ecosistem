import type { Meta, StoryObj } from "@storybook/react";

import OS_POPULATED_LOCALITIES from "./OS_POPULATED_LOCALITIES";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { Suspense } from "react";

const meta: Meta<typeof OS_POPULATED_LOCALITIES> = {
  title: "pages/OS_POPULATED_LOCALITIES",
  component: OS_POPULATED_LOCALITIES,
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <Suspense fallback={""}>
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
};

export default meta;
type Story = StoryObj<typeof OS_POPULATED_LOCALITIES>;

export const Dark: Story = {};
export const Light: Story = {};
