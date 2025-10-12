"use client";

import ThemeProvider from "@/providers";
import { Dashboard } from "@/components/dashboard/templates/navbar";
import { CreateAccount } from "@/components/dashboard/templates/create-account";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <ThemeProvider themeKey="dashboard-theme">
        <CreateAccount children={children} />
    </ThemeProvider>
  )
}
