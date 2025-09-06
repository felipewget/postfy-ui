"use client";

import ThemeProvider from "@/providers";
import { Divider, Flex, Switch, Text, useMantineColorScheme } from "@mantine/core";
import {
  IconDiamond,
  IconHome,
  IconLogout,
  IconMinus,
  IconMoon,
  IconPlus,
  IconSun,
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
    // <ThemeProvider themeKey="dashboard-theme">
      <Flex w="100%" justify="center" className={classes.background}>
        <Flex
          w="100%"
          style={{
            backgroundColor: `light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))`,
            minHeight: "100vh",
          }}
        >
          <Flex
            direction="column"
            pos="fixed"
            w={collapsed ? 60 : 210}
            h="100%"
            gap={20}
            justify="space-between"
          >
            <Flex direction="column" w="100%" align="end">
              <Flex
                w={collapsed ? 30 : 50}
                h={collapsed ? 30 : 50}
                m={collapsed ? 15 : 20}
                style={{
                  background: "url('/logo.svg')no-repeat",
                  backgroundSize: 'cover'
                }}
                mb={40}
              />

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
                    <Link href={reportItem.link} style={{
                      textDecoration: "none",
                    }}>
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
                          {reportItem.icon}
                        </Flex>
                      </Flex>
                    </Link>
                  ))}
              </Flex>
            </Flex>

            <Flex mb={10} direction="column">
              <Flex
                className={classes.menu}
                h={30}
                w="100%"
                align="center"
                px={10}
              >
                <Text size="sm" fw={500} flex={1}>
                  Felipe Olivei..
                </Text>

                <Flex
                  w={30}
                  h={30}
                  bg="blue"
                  style={{
                    borderRadius: "5px",
                  }}
                />
              </Flex>

              <Divider m={10} mb={0} />

              <SidebarActionsFooter />
            </Flex>
          </Flex>

          <Flex
            justify="center"
            ml={collapsed ? 60 : 210}
            style={{
              backgroundColor: `light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))`,
              width: `calc(100% - ${collapsed ? 60 : 210}px)`,
            }}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    // </ThemeProvider>
  );
};

const SidebarActionsFooterProps = {};
export const SidebarActionsFooter: FC<SidebarActionsFooterProps> = ({ }) => {
    const { setColorScheme } = useMantineColorScheme();

    return (
        <Flex align="center">
            <Flex m={10} gap={20} w="100%" justify="center" align="center">
                <IconMoon size={16} />

                <Switch onChange={(e) => {
                    e.currentTarget.checked
                        ? setColorScheme('light')
                        : setColorScheme('dark')
                }} />

                <IconSun size={16} />
            </Flex>

            <Flex mx={10}>
                <IconLogout size={20} />
            </Flex>
        </Flex>
    );
};

const menuItems = [
  { text: "Dashboard", icon: <IconDiamond size="18" />, link: "/dashboard" },
  { text: "To do", icon: <IconDiamond size="18" />, link: "/" },
  { text: "Clients", icon: <IconDiamond size="18" />, link: "/clients" },
  { text: "Projects", icon: <IconDiamond size="18" />, link: "/projects" },
  { text: "Quotes", icon: <IconDiamond size="18" />, link: "/quotes" },
  { text: "Tasks", icon: <IconDiamond size="18" />, link: "/tasks" },
  { text: "Team", icon: <IconDiamond size="18" />, link: "/users" },
  { text: "Financials", icon: <IconDiamond size="18" />, link: "/financials" },
];

const menuReportItems = [
  { text: "Time", icon: <IconDiamond size="18" />, link: "/reports/time" },
  { text: "Tasks", icon: <IconDiamond size="18" />, link: "/reports/tasks" },
  {
    text: "Clients",
    icon: <IconDiamond size="18" />,
    link: "/reports/clients",
  },
  {
    text: "Projects",
    icon: <IconDiamond size="18" />,
    link: "/reports/projects",
  },
  { text: "Quotes", icon: <IconDiamond size="18" />, link: "/reports/quotes" },
];
