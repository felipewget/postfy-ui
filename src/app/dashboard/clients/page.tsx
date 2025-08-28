"use client";

import { ClientCard } from "@/components/dashboard/molecules/client/client-card";
import { DrawerClientForm } from "@/components/dashboard/molecules/client/drawer-client-form";
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
        button: (<>
        
        <DrawerClientForm />

        <Button radius="md">Create project</Button>
        </>
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
        <ClientCard />
      ]}
    />
  );

  return (
    <Flex
      p={20}
      direction="column"
      w="100%"
      style={{
        maxWidth: "1300px",
      }}
    >
      <Flex w="100%" justify="space-between" align="center" pb={20} pt={10}>
        <Flex gap={20}>
          <Avatar size="lg" />

          <Flex direction="column">
            <Text size="2xl" fw={500}>
              Clients
            </Text>

            <Text></Text>
          </Flex>
        </Flex>

        <DrawerClientForm />
        <Button radius="md">Create client</Button>
      </Flex>

      <Paper
        p={4}
        mb={10}
        pos="sticky"
        top="10px"
        style={{
          zIndex: 1,
        }}
      >
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
      </Paper>

      <Flex w="100%" wrap="wrap" gap={10}>
        {[...Array(20)].map(() => (
          <Flex w="calc(50% - 5px)">
            <ClientCard />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
