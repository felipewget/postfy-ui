import { CardUser } from "@/components/dashboard/molecules/user/card-user";
import { DrawerUserForm } from "@/components/dashboard/molecules/user/drawer-user-form";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import {
  Avatar,
  Button,
  Flex,
  Input,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import { IconSearch, IconFilterFilled, IconUser } from "@tabler/icons-react";

export default function TaskPage() {
  return (
    <ListTemplate
      header={{
        title: "Team members",
        description: "Handle team members",
        button: <DrawerUserForm element={<Button radius="md">Create team member</Button>} />
      }}
      searchPanel={
        <Flex w="100%" gap={15} p={2}>
          <Flex w="100%" gap={5}>
            <Flex direction="column" flex={1}>
              <Text size="md" fw={500}>
                Search
              </Text>

              <Input
                placeholder="Search"
                leftSection={<IconSearch size="16px" />}
                flex={1}
                radius="sm"
              />
            </Flex>

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              label="status"
              data={[
                { label: "Hold", value: "active" },
                { label: "In progress", value: "non-active" },
              ]}
            />

            <Select
              label="Projects"
              leftSection={<IconFilterFilled size="12px" />}
              multiple
              radius="sm"
              data={[
                { label: "Hold", value: "active" },
                { label: "In progress", value: "non-active" },
              ]}
            />

            <Select
              label="Client"
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              data={[
                { label: "Hold", value: "active" },
                { label: "In progress", value: "non-active" },
              ]}
            />

            <Select
              label="Role"
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              data={[
                { label: "Hold", value: "active" },
                { label: "In progress", value: "non-active" },
              ]}
            />
          </Flex>
        </Flex>
      }
      cards={[<CardUser />, <CardUser />, <CardUser />, <CardUser />]}
    />
  );
}
