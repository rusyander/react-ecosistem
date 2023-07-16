import type { Meta, StoryObj } from "@storybook/react";

import OS_ORG_STRUCTURE from "./OS_ORG_STRUCTURE";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { Suspense } from "react";

const meta: Meta<typeof OS_ORG_STRUCTURE> = {
  title: "pages/OS_ORG_STRUCTURE",
  component: OS_ORG_STRUCTURE,
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
type Story = StoryObj<typeof OS_ORG_STRUCTURE>;

export const Dark: Story = {};
export const Light: Story = {};
