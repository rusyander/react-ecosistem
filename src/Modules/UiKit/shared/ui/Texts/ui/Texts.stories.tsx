import type { Meta, StoryObj } from "@storybook/react";

import { Texts } from "./Texts";

const meta: Meta<typeof Texts> = {
  title: "shared/Texts",
  component: Texts,
  tags: ["autodocs"],
  // decorators: [
  //   (Story) => (
  //     <Suspense fallback={''}>
  //       <BrowserRouter>
  //         <StoreProvider>
  //           <ThemeProvider>
  //             <Story />
  //           </ThemeProvider>
  //         </StoreProvider>
  //       </BrowserRouter>
  //     </Suspense>
  //   ),
  // ],
  // decorators: [
  //   (Story) => (
  //     <div className={`'app' ${Theme.DARK}`}>
  //       <Story />
  //     </div>
  //   ),
  // ],
};

export default meta;
type Story = StoryObj<typeof Texts>;

export const Title: Story = {
  args: {
    title: "title TITLE",
  },
};

export const Textss: Story = {
  args: {
    text: "text TEXT",
  },
};

export const TitleDark: Story = {
  args: {
    title: "title TITLE",
  },
};

export const TextsDark: Story = {
  args: {
    text: "text TEXT",
  },
};

export const TextM: Story = {
  args: {
    text: "text TEXT",
    size: "sizeM",
  },
};

export const TextsL: Story = {
  args: {
    text: "text TEXT",
    size: "sizeL",
  },
};

export const TextsPrimary: Story = {
  args: {
    text: "text Primary",
    theme: "primary",
  },
};
export const TextsError: Story = {
  args: {
    text: "text Error",
    theme: "error",
  },
};
