import type { Preview } from "@storybook/react-vite";

// Built stylesheet from the workspace package (run `pnpm build` first —
// the root `storybook`/`build-storybook` scripts already do this).
import "@kccinc/kcclab-design-system/style.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Foundation",
          [
            "Colors",
            "Typography",
            "Spacing",
            "Border Radius",
            "Shadow",
            "Z-Index",
          ],
          "Components",
          "Patterns",
          "Templates",
        ],
      },
    },
  },
};

export default preview;
