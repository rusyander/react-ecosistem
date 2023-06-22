import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "shared/Tooltip",
  component: Tooltip,
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
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    text: "text TEXT",
    children: (props: any) => (
      <button
        {...props({
          onMouseEnter: (e: any) => console.log(e, "enter"),
        })}
      >
        Tooltip text
      </button>
    ),
  },
};
