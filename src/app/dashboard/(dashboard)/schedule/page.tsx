"use client";

import { CalendarFilter } from "@/components/dashboard/atoms/inputs/calendar-filter";
import { Header } from "@/components/dashboard/organisms/header";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Input,
  Menu,
  SegmentedControl,
  Select,
  Tabs,
  Text,
} from "@mantine/core";
import {
  IconClock,
  IconDots,
  IconFilterFilled,
  IconHome,
  IconMessages,
  IconSearch,
  IconTrash,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function Schedule() {
  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Publications schedule"
        description="Manage your clients, link them with projects base knowledgment"
        button={
          <Flex gap={10}>
            <Button radius="md" variant="light">
              Create publication
            </Button>

            <Button radius="md">Manage campaigns</Button>
          </Flex>
        }
      />

      <Flex my={20} gap={20} align="start">
        <Card flex={1} withBorder={false}>
          <Flex direction="column" gap={20}>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={10}>
                <IconClock />

                <Text>Posts</Text>
              </Flex>

              <Select placeholder="All platforms" data={[]} radius="sm" />
            </Flex>

            <SegmentedControl
              // value={value}
              // onChange={setValue}
              data={[
                { label: "Upcoming", value: "upcoming" },
                { label: "Published", value: "published" },
                { label: "Failed", value: "failed" },
              ]}
              radius="md"
              size="sm"
              fullWidth={false}
              styles={(theme) => ({
                control: {
                  border: "none", // remove a divisória entre os itens
                },
              })}
            />

            <Flex direction="column" align="center" my={20} gap={10}>
              <IconClock size="30px" />

              <Text>No publication for this day</Text>

              <Text>aoidjasoid</Text>

              <Flex gap={10}>
                <Button radius="md" variant="light">
                  Create publication
                </Button>

                <Button radius="md">Manage campaigns</Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Card
          withBorder={false}
          shadow="none"
          bg="transparent"
          p={0}
          w="300px"
          style={{
            minWidth: "300px",
          }}
        >
          <CalendarFilter />

          <Card my={20} withBorder={false} shadow="none">
            <Text fw={500} size="lg">
              Connected social profiles
            </Text>

            <Text>No platform connected yet</Text>

            <Flex mt={20} w="100%">
              <Button radius="md" fullWidth variant="light">
                Manage social profiles
              </Button>
            </Flex>
          </Card>
        </Card>
      </Flex>
    </PageTemplate>
  );
}
