"use client";

import {
  Divider,
  Flex,
  Paper,
  Switch,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBusinessplan,
  IconChevronRight,
  IconCircleDottedLetterP,
  IconClockHour9,
  IconContract,
  IconFlask,
  IconImageInPicture,
  IconLayoutCollage,
  IconLibraryPhoto,
  IconListCheck,
  IconLogout,
  IconMinus,
  IconMoon,
  IconNote,
  IconNotebook,
  IconNotes,
  IconPlus,
  IconSettings,
  IconSun,
  IconUser,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import classes from "./Dashboard.module.css";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../atoms/logo";
import { useList } from "@/apis/crud.api";
import { Account } from "@/declarators";

type DashboardContextType = {
  accounts: Account[];
  selectedAccount?: Account;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) throw new Error("Values are undefined");

  return context;
};

export const Dashboard = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { data: dataAccount } = useList({ entity: "accounts", params: {} });

  const accounts = (dataAccount?.pages.flat() ?? []) as Account[];
  const selectedAccount = accounts[0]; // @TODO a hook here

  const collapsed = useMediaQuery(`(max-width: 900px)`);

  const [reportItemOpened, setReportItemOpened] = useState<boolean>(false);

  return (
    <DashboardContext.Provider value={{ accounts, selectedAccount }}>
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
                w={collapsed ? 30 : 35}
                h={30}
                m={collapsed ? 15 : 20}
                mb={40}
              >
                <Logo size={30} />
              </Flex>

              <Flex direction="column" w="100%">
                {menuItems.map((item) => {
                  if (item.type === "section") {
                    if (collapsed) return null;

                    return (
                      <Flex mt={10} mb={5} px={20}>
                        <Text size="xs">{item.text}</Text>
                      </Flex>
                    );
                  }

                  return (
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
                            <Text
                              color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))"
                              size="sm"
                              fw={500}
                              flex={1}
                            >
                              {item.text}
                            </Text>
                          )}

                          <Flex color="black">{item.icon}</Flex>
                        </Flex>
                      </Link>
                    </Tooltip>
                  );
                })}

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
                    <Text
                      size="sm"
                      fw={500}
                      flex={1}
                      color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))"
                    >
                      Analytics
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
                  menuAnalyticsItems.map((reportItem) => (
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
                              color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))"
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
              {collapsed ? (
                <Paper m={10} withBorder={false} p={10}>
                  <Flex align="center" justify="center">
                    <IconUser size="11px" />
                  </Flex>
                </Paper>
              ) : (
                <Paper m={10} withBorder={false} p={10}>
                  <Flex align="center">
                    <Flex direction="column" flex={1}>
                      <Text size="xs">Account</Text>

                      <Text size="sm" fw={500}>
                        Google
                      </Text>
                    </Flex>

                    <IconChevronRight size="11px" />
                  </Flex>
                </Paper>
              )}

              <Divider m={10} mb={0} />

              <SidebarActionsFooter />
            </Flex>
          </Flex>

          <Flex
            justify="center"
            ml={collapsed ? 60 : 210}
            style={{
              backgroundColor: `light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))`,
              width: `calc(100% - ${collapsed ? 60 : 210}px)`,
            }}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </DashboardContext.Provider>
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
    type: "link",
    text: "Dashboard",
    icon: <IconLayoutCollage {...iconAttributes} />,
    link: "/",
  },
  {
    type: "link",
    text: "Create Publication",
    icon: <IconUsersGroup {...iconAttributes} />,
    link: "/publications/create",
  },
  {
    type: "link",
    text: "Campaigns",
    icon: <IconFlask {...iconAttributes} />,
    link: "/campaings",
  },
  {
    type: "link",
    text: "Calendar",
    icon: <IconFlask {...iconAttributes} />,
    link: "/schedule",
  },
  {
    type: "section",
    text: "Account configuration",
  },
  {
    text: "Knowledgment AI",
    icon: <IconContract {...iconAttributes} />,
    link: "/knowledgment-ai",
  },
  {
    text: "Social Profiles",
    icon: <IconCircleDottedLetterP {...iconAttributes} />,
    link: "/social-profiles",
  },
  {
    text: "Media bank",
    icon: <IconLibraryPhoto {...iconAttributes} />,
    link: "/social-profiles",
  },
  {
    text: "Settings",
    icon: <IconSettings {...iconAttributes} />,
    link: "/settings",
  },
  {
    type: "section",
    text: "Others",
  },
  {
    text: "Support",
    icon: <IconNotebook {...iconAttributes} />,
    link: "/supports",
  },
  {
    text: "My plan",
    icon: <IconCircleDottedLetterP {...iconAttributes} />,
    link: "/my-plan",
  },
];

const menuAnalyticsItems = [
  {
    text: "General",
    icon: <IconClockHour9 {...iconAttributes} />,
    link: "/reports/time",
  },
  {
    text: "Engagement",
    icon: <IconNote {...iconAttributes} />,
    link: "/reports/tasks",
  },
  {
    text: "Reach",
    icon: <IconBusinessplan {...iconAttributes} />,
    link: "/reports/clients",
  },
];
