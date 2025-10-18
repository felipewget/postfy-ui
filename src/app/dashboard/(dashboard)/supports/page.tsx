"use client";

import { ModalAddTicket } from "@/components/dashboard/molecules/ticket/modal-add-ticket";
import { Header } from "@/components/dashboard/organisms/header";
import { TicketlList } from "@/components/dashboard/organisms/ticket/ticket-list";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { Button, Card, Flex, Text } from "@mantine/core";
import {
  IconFlagQuestion,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function Support() {
  const { selectedAccount } = useDashboardContext();

  if (!selectedAccount) return null;

  return (
    <PageTemplate maxWidth="800px">
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Support"
        description="Manage your clients, link them with projects base knowledgment"
        button={
          <Flex ml={20}>
            <ModalAddTicket
              accountId={selectedAccount.id}
              element={
                <Button radius="sm" size="xs">
                  Open ticket
                </Button>
              }
            />
          </Flex>
        }
      />

      <Flex direction="column">
        <Card radius="sm" withBorder={false}>
          <Flex gap={10} mb={10}>
            <IconFlagQuestion />

            <Text size="md">How can we help?</Text>
          </Flex>

          <Text c="dimmed" size="sm">
            Create a support ticket for any questions, technical issues, or
            billing inquiries. Our team typically responds within 24 hours.
          </Text>
        </Card>

        <TicketlList accountId={selectedAccount.id} />
      </Flex>
    </PageTemplate>
  );
}
