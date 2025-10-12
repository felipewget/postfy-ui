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

export const CreateAccount = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { data: dataAccount } = useList({ entity: "accounts", params: {} });

  return (
    <Flex>
      <Flex w="calc(100% - 400px)">{children}</Flex>

      <Flex w="400px" h="100vh" bg="violet" pos="sticky" top={0} right={0} />
    </Flex>
  );
};
