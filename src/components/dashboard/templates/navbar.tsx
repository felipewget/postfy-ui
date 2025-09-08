"use client";

import {
  Divider,
  Flex,
  Switch,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBusinessplan,
  IconCircleDottedLetterP,
  IconClockHour9,
  IconContract,
  IconFlask,
  IconLayoutCollage,
  IconListCheck,
  IconLogout,
  IconMinus,
  IconMoon,
  IconNote,
  IconNotebook,
  IconNotes,
  IconPlus,
  IconSun,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import classes from "./Dashboard.module.css";
import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";

export const Dashboard = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const isMobile = useMediaQuery(`(max-width: 900px)`);
  const pathname = usePathname();

  const collapsed = pathname === "/" || isMobile;
  const [reportItemOpened, setReportItemOpened] = useState<boolean>(false);

  return (
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
                backgroundSize: "cover",
              }}
              mb={40}
            />

            <Flex direction="column" w="100%">
              {menuItems.map((item) => (
                <Tooltip
                  label={item.text}
                  arrowSize={4}
                  position="right"
                  disabled={!collapsed}
                >
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
                </Tooltip>
              ))}

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
                  <Tooltip
                    label={reportItem.text}
                    arrowSize={4}
                    position="right"
                    disabled={!collapsed}
                  >
                    <Link
                      href={reportItem.link}
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

                        <Flex color="black">{reportItem.icon}</Flex>
                      </Flex>
                    </Link>
                  </Tooltip>
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
  );
};

const SidebarActionsFooterProps = {};
export const SidebarActionsFooter: FC<SidebarActionsFooterProps> = ({}) => {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Flex align="center">
      <Flex m={10} gap={20} w="100%" justify="center" align="center">
        <IconMoon size={16} />

        <Switch
          onChange={(e) => {
            e.currentTarget.checked
              ? setColorScheme("light")
              : setColorScheme("dark");
          }}
        />

        <IconSun size={16} />
      </Flex>

      <Flex mx={10}>
        <IconLogout size={20} />
      </Flex>
    </Flex>
  );
};

const iconAttributes = {
  color: "light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))",
  size: "18",
};

const menuItems = [
  {
    text: "Dashboard",
    icon: <IconLayoutCollage {...iconAttributes} />,
    link: "/dashboard",
  },
  { text: "To do", icon: <IconListCheck {...iconAttributes} />, link: "/" },
  {
    text: "Clients",
    icon: <IconUsersGroup {...iconAttributes} />,
    link: "/clients",
  },
  {
    text: "Projects",
    icon: <IconFlask {...iconAttributes} />,
    link: "/projects",
  },
  {
    text: "Quotes",
    icon: <IconContract {...iconAttributes} />,
    link: "/quotes",
  },
  { text: "Tasks", icon: <IconNotebook {...iconAttributes} />, link: "/tasks" },
  { text: "Team", icon: <IconUsers {...iconAttributes} />, link: "/users" },
  {
    text: "My plan",
    icon: <IconCircleDottedLetterP {...iconAttributes} />,
    link: "/my-plan",
  },
];

const menuReportItems = [
  {
    text: "Time",
    icon: <IconClockHour9 {...iconAttributes} />,
    link: "/reports/time",
  },
  {
    text: "Tasks",
    icon: <IconNote {...iconAttributes} />,
    link: "/reports/tasks",
  },
  {
    text: "Clients",
    icon: <IconBusinessplan {...iconAttributes} />,
    link: "/reports/clients",
  },
  {
    text: "Projects",
    icon: <IconFlask {...iconAttributes} />,
    link: "/reports/projects",
  },
  {
    text: "Quotes",
    icon: <IconNotes {...iconAttributes} />,
    link: "/reports/quotes",
  },
];
