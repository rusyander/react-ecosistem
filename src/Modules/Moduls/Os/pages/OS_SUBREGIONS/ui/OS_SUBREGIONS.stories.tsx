import type { Meta, StoryObj } from "@storybook/react";

import OS_SUBREGIONS from "./OS_SUBREGIONS";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { Suspense } from "react";

const meta: Meta<typeof OS_SUBREGIONS> = {
  title: "pages/OS_SUBREGIONS",
  component: OS_SUBREGIONS,
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
type Story = StoryObj<typeof OS_SUBREGIONS>;

export const Dark: Story = {};
export const Light: Story = {};
