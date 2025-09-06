"use client";

import { useList } from "@/api/dashboard";
import { ClientCard } from "@/components/dashboard/molecules/client/client-card";
import { DrawerClientForm } from "@/components/dashboard/molecules/client/drawer-client-form";
import { ModalClientPreview } from "@/components/dashboard/molecules/client/modal-client-preview";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { Client } from "@/declarators";
import {
  Avatar,
  Button,
  Flex,
  Input,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconFilterFilled,
  IconSearch,
  IconSortDescending,
} from "@tabler/icons-react";

export default function ClientPage() {
  const [search, setSearch] = useDebouncedState("", 300);
  const [status, setStatus] = useDebouncedState(null, 300);

  const { data } = useList({
    entity: "clients",
    params: {
      search,
      searchFields: "name,emails,websites",
      filters: { status},
    },
  });

  const clients = (data?.pages.flat() ?? []) as Client[];

  return (
    <ListTemplate
      header={{
        title: "Clients",
        description: "Manage your clients, link them with projects",
        button: (
          <DrawerClientForm
            element={<Button radius="md">Create project</Button>}
          />
        ),
      }}
      searchPanel={
        <Flex w="100%" gap={15} p={2}>
          <Flex w="100%" gap={5}>
            <Input
              placeholder="Search"
              leftSection={<IconSearch size="16px" />}
              flex={1}
              onChange={(e) => setSearch(e.currentTarget.value.trim())}
              radius="sm"
            />

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              onChange={(e) => setStatus(e)}
              data={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Flex>
        </Flex>
      }
      cards={clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    />
  );
}
