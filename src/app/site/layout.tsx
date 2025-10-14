"use client";

import ThemeProvider from "@/providers";
import { Dashboard } from "@/components/dashboard/templates/dashboard.template";
import { Button, Card, Flex, Text } from "@mantine/core";
import { SiteTemplate } from "@/components/site/templates/site-template";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider themeKey="site-theme">
      <SiteTemplate>{children}</SiteTemplate>
    </ThemeProvider>
  );
}
