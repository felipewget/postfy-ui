"use client";

import { Flex, Text, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconMinus,
  IconPlus,
  IconLayoutCollage,
  IconUsersGroup,
  IconFlask,
  IconContract,
  IconCircleDottedLetterP,
  IconLibraryPhoto,
  IconSettings,
  IconNotebook,
  IconClockHour9,
  IconNote,
  IconBusinessplan,
} from "@tabler/icons-react";

import { FC, ReactNode, useState } from "react";
import classes from "./navbar-menu.module.css";
import Link from "next/link";

export const NavbarMenu = () => {
  const [reportItemOpened, setReportItemOpened] = useState<boolean>(false);

  return (
    <Flex direction="column" w="100%">
      {menuItems.map((item) => {
        if (item.type === "section") {
          return (
            <Flex mt={10} mb={5} px={20}>
              <Text size="xs">{item.text}</Text>
            </Flex>
          );
        }

        return <ItemMenu item={item} />;
      })}

      <Flex
        className={classes.menu}
        h={37}
        w="100%"
        align="center"
        pl={20}
        pr={30}
        onClick={() => setReportItemOpened(!reportItemOpened)}
        style={{
          minWidth: "60px",
        }}
      >
        <Text
          size="sm"
          fw={500}
          flex={1}
          color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))"
        >
          Analytics
        </Text>

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
              <Text
                ml={10}
                color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))"
                size="sm"
                fw={500}
                flex={1}
              >
                {reportItem.text}
              </Text>

              <Flex color="black">{reportItem.icon}</Flex>
            </Flex>
          </Link>
        ))}
    </Flex>
  );
};

const ItemMenu: FC<{ item: ItemMenu }> = ({ item }) => {
  return (
    <Link
      href={item.link ?? ""}
      style={{
        textDecoration: "none",
      }}
    >
      <Flex
        className={classes.menu}
        h={37}
        w="100%"
        align="center"
        pl={20}
        pr={30}
        style={{
          minWidth: "60px",
        }}
      >
        <Text
          color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))"
          size="sm"
          fw={500}
          flex={1}
        >
          {item.text}
        </Text>

        <Flex color="black">{item.icon}</Flex>
      </Flex>
    </Link>
  );
};

type ItemSection = {
  type: "section";
  text: string;
};

type ItemMenu = {
  type: "link";
  text: string;
  icon: ReactNode;
  link: string;
};

const iconAttributes = {
  color: "light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-2))",
  size: "18",
};

const menuItems: ItemSection[] | ItemMenu[] = [
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
    text: "Brand kit",
  },
  {
    type: "link",
    text: "Knowledgment AI",
    icon: <IconContract {...iconAttributes} />,
    link: "/knowledgment-ai",
  },
  {
    type: "link",
    text: "Social Profiles",
    icon: <IconCircleDottedLetterP {...iconAttributes} />,
    link: "/social-profiles",
  },
  {
    type: "link",
    text: "Media bank",
    icon: <IconLibraryPhoto {...iconAttributes} />,
    link: "/media-bank",
  },
  {
    type: "link",
    text: "Settings",
    icon: <IconSettings {...iconAttributes} />,
    link: "/settings",
  },
  {
    type: "section",
    text: "Others",
  },
  {
    type: "link",
    text: "Support",
    icon: <IconNotebook {...iconAttributes} />,
    link: "/supports",
  },
  {
    type: "link",
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
