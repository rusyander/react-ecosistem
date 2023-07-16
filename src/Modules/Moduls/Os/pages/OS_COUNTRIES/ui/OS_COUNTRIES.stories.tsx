import type { Meta, StoryObj } from "@storybook/react";

import OS_COUNTRIES from "./OS_COUNTRIES";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { Suspense } from "react";

const meta: Meta<typeof OS_COUNTRIES> = {
  title: "pages/OS_COUNTRIES",
  component: OS_COUNTRIES,
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
type Story = StoryObj<typeof OS_COUNTRIES>;

export const Dark: Story = {};
export const Light: Story = {};
