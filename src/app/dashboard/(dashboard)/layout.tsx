import { Dashboard } from "@/components/dashboard/templates/dashboard.template";
import ThemeProvider from "@/providers";

export const metadata = {
  title: "Postfy | Platform",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider themeKey="dashboard-theme">
        <Dashboard children={children} />
    </ThemeProvider>
  );
}
