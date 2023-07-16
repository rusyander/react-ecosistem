import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { type Preview } from "@storybook/react";
import { StoreProviderOs } from "../../../../app/providers/StoreProvider/ui/StoreProviderOs";

export const ProvidersWrapper: Preview = {
  decorators: [
    (Story) => (
      <Suspense fallback={""}>
        <StoreProviderOs>
          <BrowserRouter>
            {/* <div className={`'app' ${Theme.DARK}`}> */}
            <div>
              <Story />
            </div>
            <Story />
          </BrowserRouter>
        </StoreProviderOs>
      </Suspense>
    ),
  ],
};
