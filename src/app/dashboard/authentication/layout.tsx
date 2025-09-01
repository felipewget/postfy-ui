"use client";

import ThemeProvider from "@/providers";
// import { Logo } from '@/ui-kit/ui/site/logo';
import { Avatar, Box, Card, Divider, Flex, Text } from "@mantine/core";
// import '@mantine/core/styles.css';
import Link from "next/link";
import { FC } from "react";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider themeKey="dashboard-theme">
      <Flex
        align="center"
        bg="violet"
        style={{
          minHeight: "100vh",
        }}
      >
        <BgDots side="left" />

        <BgDots side="rihgt" />

        <Flex w="100%" justify="center">
          <Card withBorder radius="md" shadow="xs" my={20}>
            <Flex direction="column" justify="space-between" w="500px">
              <Flex justify="space-between" align="center">
                <Flex gap={10} align="center" m={20} mb={10}>
                  <Flex w="40px" h="40px" bg="blue" />

                  <Text fw="bold" size="sm">
                    Teamtime
                  </Text>
                </Flex>

                <Link href="/">Back to site</Link>
              </Flex>

              {children}
            </Flex>

            <Divider mt={20} />

            <Text mt={20} size="xs" ta="center" c="dimmed">
              © Teamtime 2025. All rights reserved
            </Text>
          </Card>
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}

const BgDots: FC<{ side: string }> = ({ side }) => (
  <Flex
    gap={40}
    pos="absolute"
    left={side === "left" ? 60 : "auto"}
    right={side !== "left" ? 60 : "auto"}
    direction={side === "left" ? "row" : "row-reverse"}
    display={{ base: "none", md: "flex" }}
  >
    <Flex direction="column" gap={40}>
      {[...Array(6)].map(() => (
        <Dot />
      ))}
    </Flex>

    <Flex direction="column" gap={40}>
      {[...Array(6)].map(() => (
        <Dot />
      ))}
    </Flex>

    <Flex direction="column" gap={40}>
      {[...Array(6)].map(() => (
        <Dot />
      ))}
    </Flex>

    <Flex direction="column" gap={40}>
      {[...Array(4)].map(() => (
        <Dot />
      ))}
    </Flex>

    <Flex direction="column" gap={40}>
      {[...Array(4)].map(() => (
        <Dot />
      ))}
    </Flex>

    <Flex direction="column" gap={40}>
      {[...Array(2)].map(() => (
        <Dot />
      ))}
    </Flex>
  </Flex>
);

const Dot = () => (
  <Box
    bg="violet.3"
    w={5}
    h={5}
    style={{
      borderRadius: "50%",
    }}
  />
);
