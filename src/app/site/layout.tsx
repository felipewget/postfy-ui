"use client";

import ThemeProvider from "@/providers";
import { Dashboard } from "@/components/dashboard/templates/navbar";
import { Button, Card, Flex, Text } from "@mantine/core";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider themeKey="dashboard-theme">
      {children}
    </ThemeProvider>
  );
}
