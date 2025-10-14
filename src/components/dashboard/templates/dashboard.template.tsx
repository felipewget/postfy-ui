"use client";

import { Divider, Flex, Paper, Text } from "@mantine/core";
import {
  IconHome,
  IconLogout,
  IconMenu,
  IconMenu2,
  IconUser,
} from "@tabler/icons-react";
import classes from "./Dashboard.module.css";
import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Logo } from "../atoms/logo";
import { useList } from "@/apis/crud.api";
import { Account } from "@/declarators";
import { ModalAccounts } from "../molecules/account/modal-accounts";
import { ToggleThemeSwitch } from "../atoms/toggle-theme-switch";
import { CardAccount } from "../molecules/account/card-account";
import { NavbarMenu } from "../organisms/navbar-menu";

type DashboardContextType = {
  accounts: Account[];
  selectedAccount?: Account;
  selectAccount: (accountId: number) => void;
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
  const { data: dataAccount, isLoading } = useList({
    entity: "accounts",
    params: {},
  });
  const [accountId, setAccountId] = useState<number | undefined>();

  const accounts = (dataAccount?.pages.flat() ?? []) as Account[];
  const selectedAccount = accounts.find((account) => account.id === accountId);

  const collapsed = useMediaQuery(`(max-width: 800px)`);

  const selectAccount = (accountId: number) => setAccountId(accountId);
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!accountId && accounts.length > 0) {
      setAccountId(accounts[0].id);
    }
  }, [accounts]);

  if (isLoading) return <p>Loading...</p>;

  if (accounts.length === 0) return <p>Redirect to create account</p>;

  if (!selectedAccount) return null;

  return (
    <DashboardContext.Provider
      value={{ accounts, selectedAccount, selectAccount }}
    >
      <Flex w="100%" justify="center" className={classes.background}>
        {collapsed && (
          <Flex
            w="100%"
            h="50px"
            pos="fixed"
            bottom={0}
            left={0}
            align="center"
            style={{
              zIndex: 1,
              backgroundColor: `light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))`,
            }}
          >
            <Flex px={20} align="center" w="100%" justify="space-between">
              <Flex align="center" gap={10} onClick={() => setOpened(!opened)}>
                <IconMenu2 />

                <Text>Menu</Text>
              </Flex>

              <Flex align="center" gap={10}>
                <Text fw={600}>Postfy</Text>

                <Logo size={30} />
              </Flex>
            </Flex>
          </Flex>
        )}

        <Flex
          w="100%"
          style={{
            backgroundColor: `light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))`,
            minHeight: "100vh",
          }}
        >
          {(!collapsed || opened) && (
            <Flex
              direction="column"
              pos="fixed"
              w={210}
              h={`calc(100vh - ${collapsed ? 50 : 0}px)`}
              gap={20}
              top={0}
              justify="space-between"
              bottom={collapsed ? 50 : 0}
              style={{
                backgroundColor: `light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))`,
                minHeight: `calc(100vh - ${collapsed ? 50 : 0}px)`,
                zIndex: 10,
              }}
            >
              <Flex direction="column" w="100%" align="end">
                <Flex w={35} h={30} m={20} mb={10}>
                  <Logo size={30} />
                </Flex>

                <NavbarMenu />
              </Flex>

              <Flex mb={10} direction="column">
                <ModalAccounts>
                  <CardAccount account={selectedAccount} />
                </ModalAccounts>

                <Divider m={10} mb={0} />

                <Flex align="center">
                  <ToggleThemeSwitch />

                  <Flex mx={10}>
                    <IconLogout size={20} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}

          <Flex
            justify="center"
            ml={collapsed ? 0 : 210}
            style={{
              backgroundColor: `light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))`,
              width: `calc(100% - ${collapsed ? 0 : 210}px)`,
            }}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </DashboardContext.Provider>
  );
};
