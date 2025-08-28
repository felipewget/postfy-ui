"use client";

import ThemeProvider from "@/providers";
import { Flex, Text } from "@mantine/core";
import {
  IconDiamond,
  IconHome,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import classes from "./Dashboard.module.css";
import Link from "next/link";
import { useState } from "react";

export const Dashboard = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const collapsed = false;
  const [reportItemOpened, setReportItemOpened] = useState<boolean>(false);

  return (
    <ThemeProvider themeKey="dashboard-theme">
      <Flex w="100%" justify="center" className={classes.background}>
        <Flex
          w="100%"
          bg="#F5F5F5"
          style={{
            minHeight: "100vh",
          }}
        >
          <Flex
            direction="column"
            pos="fixed"
            w={collapsed ? 60 : 210}
            h="100%"
            bg="white"
            gap={20}
            justify="space-between"
            style={{
              boxShadow: "1px 0px 1px #DDD",
            }}
          >
            <Flex direction="column" w="100%" align="end">
              <Flex
                w={collapsed ? 30 : 50}
                h={collapsed ? 30 : 50}
                m={collapsed ? 15 : 20}
                bg="dark"
                mb={40}
              >
                logo
              </Flex>

              <Flex direction="column" w="100%">
                {menuItems.map((item) => (
                  <Link
                    href={item.link}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Flex
                      className={classes.menu}
                      h={40}
                      w="100%"
                      align="center"
                      pl={20}
                      pr={30}
                      style={{
                        minWidth: "60px",
                      }}
                    >
                      {!collapsed && (
                        <Text color="black" size="sm" fw={500} flex={1}>
                          {item.text}
                        </Text>
                      )}

                      <Flex color="black">{item.icon}</Flex>
                    </Flex>
                  </Link>
                ))}

                {/*  */}
                <Flex
                  className={classes.menu}
                  h={40}
                  w="100%"
                  align="center"
                  pl={20}
                  pr={30}
                  onClick={() => setReportItemOpened(!reportItemOpened)}
                  style={{
                    minWidth: "60px",
                  }}
                >
                  {!collapsed && (
                    <Text color="black" size="sm" fw={500} flex={1}>
                      Reports
                    </Text>
                  )}

                  <Flex color="black">
                    {reportItemOpened ? (
                      <IconMinus size="14px" />
                    ) : (
                      <IconPlus size="14px" />
                    )}
                  </Flex>
                </Flex>

                {reportItemOpened &&
                  menuReportItems.map((reportItem) => (
                    <Link href={reportItem.link}>
                      <Flex
                        className={classes.menu}
                        h={40}
                        w="100%"
                        align="center"
                        pl={20}
                        pr={30}
                        style={{
                          minWidth: "60px",
                        }}
                      >
                        {!collapsed && (
                          <Text
                            ml={10}
                            color="black"
                            size="sm"
                            fw={500}
                            flex={1}
                          >
                            {reportItem.text}
                          </Text>
                        )}

                        <Flex color="black">
                          <IconDiamond />
                        </Flex>
                      </Flex>
                    </Link>
                  ))}
              </Flex>
            </Flex>

            <Flex mb={10}>
              <Flex
                className={classes.menu}
                h={50}
                w="100%"
                align="center"
                px={20}
              >
                <Text size="lg" fw={500} flex={1}>
                  Felipe Olivei..
                </Text>

                <Flex
                  w={40}
                  h={40}
                  bg="blue"
                  style={{
                    borderRadius: "5px",
                  }}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex
            justify="center"
            ml={collapsed ? 60 : 210}
            style={{
              width: `calc(100% - ${collapsed ? 60 : 210}px)`,
            }}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};

const menuItems = [
  { text: "Dashboard", icon: <IconDiamond size="20" />, link: "/dashboard" },
  { text: "To do", icon: <IconDiamond size="20" />, link: "/" },
  { text: "Clients", icon: <IconDiamond size="20" />, link: "/clients" },
  { text: "Projects", icon: <IconDiamond size="20" />, link: "/projects" },
  { text: "Quotes", icon: <IconDiamond size="20" />, link: "/quotes" },
  { text: "Tasks", icon: <IconDiamond size="20" />, link: "/tasks" },
  { text: "Team", icon: <IconDiamond size="20" />, link: "/users" },
  { text: "Financials", icon: <IconDiamond size="20" />, link: "/financials" },
];

const menuReportItems = [
  { text: "Time", icon: <IconDiamond size="20" />, link: "/reports/time" },
  { text: "Tasks", icon: <IconDiamond size="20" />, link: "/reports/tasks" },
  {
    text: "Clients",
    icon: <IconDiamond size="20" />,
    link: "/reports/clients",
  },
  {
    text: "Projects",
    icon: <IconDiamond size="20" />,
    link: "/reports/projects",
  },
  { text: "Quotes", icon: <IconDiamond size="20" />, link: "/reports/quotes" },
];
