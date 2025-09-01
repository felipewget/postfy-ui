"use client";

import { ClientCard } from "@/components/dashboard/molecules/client/client-card";
import { DrawerClientForm } from "@/components/dashboard/molecules/client/drawer-client-form";
import { ModalClientPreview } from "@/components/dashboard/molecules/client/modal-client-preview";
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
import {
  IconFilterFilled,
  IconSearch,
  IconSortDescending,
} from "@tabler/icons-react";

const data = [
  { product: "Apples", unitsSold: 2214411234 },
  { product: "Oranges", unitsSold: 9983812411 },
  { product: "Bananas", unitsSold: 1234567890 },
  { product: "Pineapples", unitsSold: 9948810000 },
  { product: "Pears", unitsSold: 9933771111 },
];

export default function ClientPage() {
  return (
    <ListTemplate
      header={{
        title: "Clients",
        description: "Manage your clients, link them with projects",
        button: (<DrawerClientForm element={<Button radius="md">Create project</Button>} />
  )}}
      searchPanel={
        <Flex w="100%" gap={15} p={2}>
          <Flex w="100%" gap={5}>
            <Input
              placeholder="Search"
              leftSection={<IconSearch size="16px" />}
              flex={1}
              radius="sm"
            />

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              data={[
                { label: "Active", value: "active" },
                { label: "Non active", value: "non-active" },
              ]}
            />
          </Flex>

          <Select
            leftSection={<IconSortDescending size="16px" />}
            radius="sm"
            data={[]}
          />
        </Flex>
      }
      cards={[
        <ClientCard />,
        <ClientCard />,
        <ClientCard />
      ]}
    />
  );
}
