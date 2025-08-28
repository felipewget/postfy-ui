"use client";

import { QuoteCard } from "@/components/dashboard/molecules/quote/card-quote";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import {
  Button,
  Flex,
  Input,
  Select,
} from "@mantine/core";
import {
  IconChartTreemap,
  IconFilterFilled,
  IconSearch,
  IconSortDescending,
} from "@tabler/icons-react";

export default function QuotePage() {
  return (
    <ListTemplate
      header={{
        title: "Quotes",
        description: "Create and send your quotes",
        button: <Button radius="md">Create quote</Button>,
      }}
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
                { label: "No answer", value: "active" },
                { label: "Sent", value: "non-active" },
                { label: "Approved", value: "non-activea" },
              ]}
            />
          </Flex>

          <Select
            leftSection={<IconChartTreemap size="16px" />}
            radius="sm"
            data={[{ label: "Enterness co", value: "enterness" }]}
          />

          <Select
            leftSection={<IconSortDescending size="16px" />}
            radius="sm"
            data={[{ label: "Project asdas", value: "enterness" }]}
          />
        </Flex>
      }
      cards={[...Array(20)].map(() => (
        <QuoteCard />
      ))}
    />
  );
}
