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
import { Logo } from "@/components/dashboard/atoms/logo";

type SiteTemplateProps = {
  children: ReactNode;
};

const mockdata = [
  {
    icon: IconCode,
    title: "Automation on content creation",
    description: "Postfy create content to you",
  },
  {
    icon: IconCoin,
    title: "Automation on publication",
    description: "Your publication will be scheduled automatically",
  },
  {
    icon: IconBook,
    title: "Analytics",
    description: "Postfy collects data from your publications and improves itself",
  }
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
        h={50}
        bg="white"
        justify="center"
        style={{
          overflow: 'hidden',
          zIndex: 1000,
          borderBottom: "solid 1px #DDD",
        }}
      >
        <Flex
          w={{ base: "100%", md: "950px", lg: "1200px" }}
          px={10}
          justify="space-between"
          align="center"
        >
          <Logo size={30} />

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
                      <Text size="sm" fw={500}>
                        Solutions
                      </Text>
                    </Box>
                    <IconChevronDown size={16} color="#7c3aed" />
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

            <Link href="#" className={classes.link}>
              <Text size="sm" fw={500}>
                About us
              </Text>
            </Link>

            <Link href="#" className={classes.link}>
              <Text size="sm" fw={500}>
                Book one presentation
              </Text>
            </Link>
          </Group>

          <Flex gap={10}>
            <Button radius="sm" size="xs" my={10} variant="outline">
              Create your account
            </Button>

            <Button radius="sm" size="xs" my={10}>
              Login on my TeamTime
            </Button>
          </Flex>
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
            <Logo size={20} />

            <Text fw={500}>Postfy</Text>
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
                    <IconLabel
                      size={14}
                      style={{
                        marginTop: "7px",
                        marginRight: "5px",
                      }}
                    />

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
                    <IconLabel
                      size={14}
                      style={{
                        marginTop: "7px",
                        marginRight: "5px",
                      }}
                    />

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
                  <Text c="black" fw={500}>
                    <IconLabel
                      size={14}
                      style={{
                        marginTop: "7px",
                        marginRight: "5px",
                      }}
                    />

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
