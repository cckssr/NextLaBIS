// Package import
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

// Style import
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import DefaultAppShell from "@/components/appshell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextLaBIS",
  description: "Modern web interface for OpenBIS",
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
        <MantineProvider>
          <DefaultAppShell>{children}</DefaultAppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
