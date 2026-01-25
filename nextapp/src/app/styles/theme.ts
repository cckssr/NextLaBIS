import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  // https://mantine.dev/colors-generator/
  colors: {
    primary: [
      "#f5f5f5",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#000000",
    ],

    sidebar: [
      "#ffffff",
      "#f5f5f5",
      "#ececec",
      "#e2e2e2",
      "#d9d9d9",
      "#cfcfcf",
      "#030213",
      "#02010f",
      "#01000b",
      "#000007",
    ],
  },

  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.625rem",
    xl: "0.75rem",
  },

  fontSizes: {
    sm: "14px",
    md: "14px",
  },

  headings: {
    fontWeight: "500",
    sizes: {
      h1: { fontSize: "2rem" },
      h2: { fontSize: "1.5rem" },
      h3: { fontSize: "1.25rem" },
    },
  },

  defaultRadius: "lg",

  components: {
    Button: {
      defaultProps: {
        color: "primary.7",
      },
    },
  },
});
