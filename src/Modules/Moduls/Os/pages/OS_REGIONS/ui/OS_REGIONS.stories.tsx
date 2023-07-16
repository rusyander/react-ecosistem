import type { Meta, StoryObj } from "@storybook/react";

import OS_REGIONS from "./OS_REGIONS";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { Suspense } from "react";

const meta: Meta<typeof OS_REGIONS> = {
  title: "pages/OS_REGIONS",
  component: OS_REGIONS,
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
type Story = StoryObj<typeof OS_REGIONS>;

export const Dark: Story = {};
export const Light: Story = {};
