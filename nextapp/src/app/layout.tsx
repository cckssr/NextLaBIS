// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css" assert { type: "css" };
import "@mantine/dates/styles.css" assert { type: "css" };
import "mantine-react-table/styles.css" assert { type: "css" };
import { theme } from "./styles/theme";
import AppShellLayout from "@/components/shell/AppShellLayout.server";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

export const metadata = {
  title: "NextLaBIS",
  description: "A modern ELN/LIMS interface for OpenBIS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShellLayout>{children}</AppShellLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
