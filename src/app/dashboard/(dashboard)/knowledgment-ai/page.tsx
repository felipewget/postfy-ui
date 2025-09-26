"use client";

import { useList } from "@/apis/crud.api";
import { useListDocuments } from "@/apis/knowledgement-document.api";
import { ModalAddDocuments } from "@/components/dashboard/molecules/knowledgment-document/modal-add-document";
import { Header } from "@/components/dashboard/organisms/header";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { useDashboardContext } from "@/components/dashboard/templates/navbar";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Input,
  Menu,
  Modal,
  SegmentedControl,
  Select,
  Tabs,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconFile,
  IconFilterFilled,
  IconHome,
  IconMessages,
  IconSearch,
  IconTrash,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useContext } from "react";

export default function BrainAI() {
  const { selectedAccount } = useDashboardContext();
  if (!selectedAccount) return null;

  const { data } = useListDocuments({
    accountId: selectedAccount.id,
    sourceType: 'knowledment',
    params: {
      // search,
      // searchFields: "name,emails,websites",
    },
  });

  const documents = data?.pages.flat() ?? [];

  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Knowledgment AI"
        description="Manage your clients, link them with projects base knowledgment"
        button={
          <ModalAddDocuments
            element={<Button radius="md">Add knowledgment</Button>}
            accountId={selectedAccount.id}
            sourceType="knowledment"
          />
        }
      />

      <Flex my={20} gap={10} align="center">
        <Input
          placeholder="Search"
          leftSection={<IconSearch size="16px" />}
          flex={1}
          //   onChange={(e) => setSearch(e.currentTarget.value.trim())}
          radius="sm"
        />

        <SegmentedControl
          // value={value}
          // onChange={setValue}
          data={[
            { label: "All", value: "all" },
            { label: "Documents", value: "documents" },
            { label: "Links", value: "links" },
            { label: "Content", value: "contents" },
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
      </Flex>

      <Flex direction="column" gap={10}>
        {documents.map((document) => (
          <Card withBorder={false} p={15}>
            <Flex direction="column" gap={10}>
              <Flex align="center" gap={20} justify="space-between">
                <Flex gap={10} align="center">
                  <IconFile size="20px" />

                  <Text fw={600} size="md">
                    {document.title}
                  </Text>
                </Flex>

                <Button bg="red" size="xs" radius="sm">
                  <IconTrash size="12px" />
                </Button>
              </Flex>

              <Flex
                style={{
                  borderRadius: "5px",
                }}
                p={10}
                bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
              >
                Text aodias aoi asdasi Text aodias aoi asdasi Text aodias aoi
                asdasi Text aodias aoi asdasi Text aodias aoi asdasi Text aodias
                aoi asdasi Text aodias aoi asdasi...
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </PageTemplate>
  );
}
