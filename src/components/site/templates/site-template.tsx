import { Divider, Flex, Image, Select, Text } from "@mantine/core";
import { IconFlag, IconLabel } from "@tabler/icons-react";
import Link from "next/link";
import { FC, ReactNode } from "react";
import classes from "./menu-navbar.module.css";

import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";

type SiteTemplateProps = {
  children: ReactNode;
};

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export const SiteTemplate: FC<SiteTemplateProps> = ({ children }) => {
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color="blue" />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Flex direction="column" w="100%">
      <Flex
        pos="sticky"
        top={0}
        h="60px"
        bg="white"
        justify="center"
        style={{
          zIndex: 1000,
        }}
      >
        <Flex
          w={{ base: "100%", md: "950px", lg: "1200px" }}
          justify="space-between"
          px={10}
        >
          <Flex w="50px" h="50px" bg="blue" my={5} />

          {/*  */}
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Solutions
                    </Box>
                    <IconChevronDown size={16} color={"blue"} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Solutions</Text>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              About us
            </a>
            <a href="#" className={classes.link}>
              Contact sales
            </a>
          </Group>

          {/*  */}

          <Button h="40px" my={10}>
            Login on my TeamTime
          </Button>
        </Flex>
      </Flex>

      {children}

      <Flex direction="column" align="center">
        <Flex
          w={{ base: "100%", md: "950px", lg: "1200px" }}
          gap={20}
          justify="space-between"
          py={50}
          align={{ base: "center", md: "start" }}
          direction={{ base: "column", sm: "row" }}
        >
          <Flex gap={20} py={20} align="center">
            <Image
              alt=""
              width={50}
              height={50}
              src="https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fabout_page_3%2Fpie.png"
            />

            <Text fw={500}>Teamtime</Text>
          </Flex>

          <Flex gap={50} wrap="wrap" justify="center">
            <Flex direction="column" w={170} gap={5}>
              <Text fw={800} mb={10}>
                Company
              </Text>

              {[
                { label: "About us", link: "/about-us" },
                { label: "Schedule a meeting", link: "/schedule-meeting" },
              ].map((item) => (
                <Link
                  href={item.link}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Text c="black" fw={500}>
                    <IconLabel size={14} style={{
                      marginTop: "7px",
                      marginRight: "5px"
                    }} />

                    {item.label}
                  </Text>
                </Link>
              ))}
            </Flex>

            <Flex direction="column" w={170} gap={5}>
              <Text fw={800} mb={10}>
                Solutions
              </Text>

              {[
                { label: "Proejct & aidjsa", link: "/about-us" },
                { label: "Proejct", link: "/about-us" },
                { label: "Proejct", link: "/about-us" },
                { label: "Proejct", link: "/about-us" },
                { label: "Proejct", link: "/about-us" },
              ].map((item) => (
                <Link
                  href={item.link}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Text c="black" fw={500}>
                    <IconLabel size={14} style={{
                      marginTop: "7px",
                      marginRight: "5px"
                    }} />

                    {item.label}
                  </Text>
                </Link>
              ))}
            </Flex>

            <Flex direction="column" w={170}>
              <Text fw={800} mb={10}>
                Terms
              </Text>

              {[
                { label: "Terms of use", link: "/terms/use" },
                { label: "Terms of privacy", link: "/terms/privacy" },
              ].map((item) => (
                <Link
                  href={item.link}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Text c="black" fw={500} >
                    <IconLabel size={14} style={{
                      marginTop: "7px",
                      marginRight: "5px"
                    }} />

                    {item.label}
                  </Text>
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <Flex w={{ base: "100%", md: "940px", lg: "1150px" }}>
          <Divider flex={1} />
        </Flex>

        <Flex
          w={{ base: "100%", md: "940px", lg: "1150px" }}
          justify="space-between"
          align="center"
          p={20}
        >
          <Text>&copy; All rights reserved {new Date().getFullYear()}</Text>

          <Select
            leftSectionPointerEvents="none"
            leftSection={<IconFlag size="14px" />}
            placeholder="Language"
            data={[{ label: "Portuguese", value: "portuguese" }]}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
