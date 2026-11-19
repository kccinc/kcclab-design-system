import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";

// Built stylesheet from the workspace package (run `pnpm build` first —
// the root `storybook`/`build-storybook` scripts already do this).
import "@kccinc/kcclab-design-system/style.css";

const preview: Preview = {
  // Toolbar toggle for `data-density` — set on <html> (same as consumers do)
  // so portaled content (Dialog, Tooltip, DropdownMenu) picks it up too.
  globalTypes: {
    density: {
      description: "밀도(data-density)",
      toolbar: {
        title: "Density",
        icon: "component",
        items: [
          { value: "comfortable", title: "Comfortable (기본)" },
          { value: "compact", title: "Compact (업무 화면)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    density: "comfortable",
  },
  decorators: [
    (Story, context) => {
      const density = context.globals.density as string | undefined;
      useEffect(() => {
        const root = document.documentElement;
        if (density && density !== "comfortable") root.dataset.density = density;
        else delete root.dataset.density;
      }, [density]);
      return <Story />;
    },
  ],
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
            "Density",
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
