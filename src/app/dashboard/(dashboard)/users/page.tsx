"use client";

import { useList } from "@/api/dashboard";
import { SelectClientFilter } from "@/components/dashboard/molecules/client/select-client-filter";
import { SelectProjectFilter } from "@/components/dashboard/molecules/project/select-project-filter";
import { CardUser } from "@/components/dashboard/molecules/user/card-user";
import { DrawerUserForm } from "@/components/dashboard/molecules/user/drawer-user-form";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { User } from "@/declarators";
import { Button, Flex, Input, Select, Text } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconSearch, IconFilterFilled, IconUsers } from "@tabler/icons-react";

export default function TaskPage() {
  const [search, setSearch] = useDebouncedState("", 300);
  const [status, setStatus] = useDebouncedState(null, 300);
  const [role, setRole] = useDebouncedState(null, 300);
  const [clientId, setClientId] = useDebouncedState(null, 300);

  const { data } = useList({
    entity: "users",
    params: {
      search,
      searchFields: "name,email",
      filters: { status, role },
    },
  });

  const users = (data?.pages.flat() ?? []) as User[];

  return (
    <ListTemplate
      header={{
        icon: <IconUsers size="30px" />,
        title: "Team members",
        description: "Handle team members",
        button: (
          <DrawerUserForm
            element={<Button radius="md">Create team member</Button>}
          />
        ),
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
                onChange={(e) => setSearch(e.currentTarget.value.trim())}
                flex={1}
                radius="sm"
              />
            </Flex>

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              label="status"
              onChange={(e) => setStatus(e)}
              data={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />

            <Flex direction="column">
              <Text>Client</Text>

              <SelectClientFilter onChange={setClientId} />
            </Flex>

            <Flex direction="column">
              <Text>Project</Text>

              <SelectProjectFilter onChange={null} client_id={clientId} />
            </Flex>

            <Select
              label="Role"
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              onChange={(e) => setRole(e)}
              data={[
                {
                  value: "Project Manager",
                  label: "Project Manager",
                },
                { value: "Developer", label: "Developer" },
                { value: "Jr. developer", label: "Jr. developer" },
              ]}
            />
          </Flex>
        </Flex>
      }
      cards={users.map((user) => (
        <CardUser user={user} key={user.id} />
      ))}
    />
  );
}
