"use client";

import ThemeProvider from "@/providers";
import { Dashboard } from "@/components/dashboard/templates/navbar";
import { Button, Card, Flex, Text } from "@mantine/core";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // return (
  //   <ThemeProvider themeKey="dashboard-theme">
  //     <Flex
  //       align="center"
  //       justify="center"
  //       w="100%"
  //       style={{
  //         minHeight: "100vh",
  //       }}
  //     >
  //       <Card>
  //         <Flex direction="column" gap={20}>
  //           <Text>
  //             We've have one issue with payment, please, contact the
  //             administration to resolve it
  //           </Text>
  //           ... Credit card field right here
  //           <Flex gap={20}>
  //             <Button>Try re-processing payment</Button>

  //             <Button>Cancel signature</Button>
  //           </Flex>
  //         </Flex>
  //       </Card>
  //     </Flex>
  //   </ThemeProvider>
  // );

  return (
    <ThemeProvider themeKey="dashboard-theme">
      <Dashboard children={children} />
    </ThemeProvider>
  );
}
