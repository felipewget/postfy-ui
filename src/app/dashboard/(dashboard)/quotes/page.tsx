"use client";

import { useList } from "@/api/dashboard";
import { QuoteCard } from "@/components/dashboard/molecules/quote/card-quote";
import { DrawerQuoteForm } from "@/components/dashboard/molecules/quote/drawer-quote-form";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { Quote } from "@/constants";
import { Button, Flex, Input, Select } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconChartTreemap,
  IconFilterFilled,
  IconSearch,
  IconSortDescending,
} from "@tabler/icons-react";

export default function QuotePage() {
  const [search, setSearch] = useDebouncedState("", 300);
  const [status, setStatus] = useDebouncedState(null, 300);

  const { data } = useList({
    entity: "quotes",
    params: {
      search,
      searchFields: "title",
      filters: { status },
    },
  });

  const quotes = (data?.pages.flat() ?? []) as Quote[];

  return (
    <ListTemplate
      header={{
        title: "Quotes",
        description: "Create and send your quotes",
        button: (
          <DrawerQuoteForm
            element={<Button radius="md">Create quote</Button>}
          />
        ),
      }}
      searchPanel={
        <Flex w="100%" gap={15} p={2}>
          <Flex w="100%" gap={5}>
            <Input
              onChange={(e) => setSearch(e.currentTarget.value.trim())}
              placeholder="Search"
              leftSection={<IconSearch size="16px" />}
              flex={1}
              radius="sm"
            />

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              onChange={(e) => setStatus(e)}
              data={[
                { label: "No content", value: "no_content" },
                { label: "Pending", value: "pending" },
                { label: "Sent", value: "sent" },
                { label: "Approved", value: "approved" },
                { label: "Refused", value: "refused" },
              ]}
            />
          </Flex>

          <Select
            leftSection={<IconChartTreemap size="16px" />}
            radius="sm"
            data={[{ label: "Enterness co", value: "enterness" }]}
          />

          {/* <Select
            leftSection={<IconSortDescending size="16px" />}
            radius="sm"
            data={[{ label: "Project asdas", value: "enterness" }]}
          /> */}
        </Flex>
      }
      cards={quotes.map((quote) => (
        <QuoteCard quote={quote} key={quote.id} />
      ))}
    />
  );
}
