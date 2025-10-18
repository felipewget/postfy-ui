import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import ThemeProvider, { QueryClientProvider } from '@/providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  {...mantineHtmlProps} >
      <head>
         <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
