"use client";

import ThemeProvider from "@/providers";
import { Dashboard } from "@/components/dashboard/templates/navbar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider themeKey="dashboard-theme">
        <Dashboard children={children} />
    </ThemeProvider>
  );
}
