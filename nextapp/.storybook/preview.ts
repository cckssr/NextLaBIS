import type { Preview } from "@storybook/nextjs-vite";
import { MantineProvider } from "@mantine/core";
import type { Decorator } from "@storybook/react";
import React from "react";
import { theme } from "../src/app/styles/theme";
import "@mantine/core/styles.css";

// Mantine decorator to wrap all stories with MantineProvider
const mantineDecorator: Decorator = (Story) =>
  React.createElement(MantineProvider, { theme }, React.createElement(Story));

const preview: Preview = {
  decorators: [mantineDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
