"use client";

import { CalendarFilter } from "@/components/dashboard/atoms/inputs/calendar-filter";
import { Header } from "@/components/dashboard/organisms/header";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  Menu,
  SegmentedControl,
  Select,
  Switch,
  Tabs,
  Text,
  Textarea,
} from "@mantine/core";
import {
  IconClock,
  IconDots,
  IconFilterFilled,
  IconFlagQuestion,
  IconHome,
  IconMessages,
  IconQuestionMark,
  IconSearch,
  IconTrash,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function Support() {
  return (
    <PageTemplate maxWidth="800px">
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Support"
        description="Manage your clients, link them with projects base knowledgment"
        button={<Button radius="md">Open ticket</Button>}
      />

      <Flex direction="column">
        <Card>
          <Flex gap={10} mb={10}>
            <IconFlagQuestion />

            <Text>How can we help?</Text>
          </Flex>

          <Text>
            Create a support ticket for any questions, technical issues, or
            billing inquiries. Our team typically responds within 24 hours.
          </Text>
        </Card>

        <Flex mt={20} w="100%" justify="space-between" align="center">
          <Text size="lg" fw={500}>Tickets</Text>

          <Select data={[{ value: "opened", label: "Opened tickets" }]} />
        </Flex>

        <Card mt={10} withBorder={false}>
          <Flex justify="center">
            <Flex direction="column">
              <Text>You dont have opened tickets yet</Text>

              <Text>
                Create your first support ticket to get help from our team.
              </Text>

              <Button>create your first ticket</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </PageTemplate>
  );
}
