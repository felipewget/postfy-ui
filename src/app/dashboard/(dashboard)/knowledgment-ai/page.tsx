"use client";

import { useList } from "@/apis/crud.api";
import { useListDocuments } from "@/apis/knowledgement-document.api";
import { ModalAddDocuments } from "@/components/dashboard/molecules/knowledgment-document/modal-add-document";
import { NoContentBlock } from "@/components/dashboard/molecules/no-content-block";
import { Header } from "@/components/dashboard/organisms/header";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
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
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
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

  const [search, setSearch] = useDebouncedState("", 300);
  const [type, setType] = useDebouncedState("all", 300);

  const { data } = useListDocuments({
    accountId: selectedAccount.id,
    sourceType: "knowledment",
    params: {
      search,
      filters: {
        type: type == "all" ? undefined : type,
      },
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
            element={
              <Button radius="sm" size="xs">
                Add knowledgment
              </Button>
            }
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
          onChange={(e) => setSearch(e.currentTarget.value.trim())}
          radius="sm"
        />

        <SegmentedControl
          value={type}
          onChange={setType}
          data={[
            { label: "All", value: "all" },
            { label: "Documents", value: "document" },
            { label: "Links", value: "link" },
            { label: "Content", value: "content" },
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
          <Card withBorder={false} p={15} radius="sm">
            <Flex direction="column" gap={10}>
              <Flex align="center" gap={20} justify="space-between">
                <Flex gap={10} align="center">
                  <IconFile size="20px" />

                  <Text fw={600} size="md">
                    {document.title}
                  </Text>
                </Flex>

                <Button size="20px" px={5} variant="light" radius="sm">
                  <IconDots size="13px" />
                </Button>
              </Flex>

              <Flex
                style={{
                  borderRadius: "5px",
                }}
                p={10}
                bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
              >
                {document.description}
              </Flex>
            </Flex>
          </Card>
        ))}

        {documents.length === 0 && (
          <NoContentBlock
            image="/images/files.svg"
            title="No knowledgments added"
            description="Crete a custom new publication or program a campaign to create your publications automatically"
            footer={
              <Flex gap={10}>
                <ModalAddDocuments
                  element={
                    <Button radius="sm" size="xs">
                      Add documents with informations about your brand
                    </Button>
                  }
                  accountId={selectedAccount.id}
                  sourceType="knowledment"
                />
              </Flex>
            }
          />
        )}
      </Flex>
    </PageTemplate>
  );
}
