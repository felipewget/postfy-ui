"use client";

import { useGetTickets } from "@/apis/ticket.api";
import { NoContentBlock } from "@/components/dashboard/molecules/no-content-block";
import { ModalAddTicket } from "@/components/dashboard/molecules/ticket/modal-add-ticket";
import { TicketCard } from "@/components/dashboard/molecules/ticket/ticket-card";
import { Header } from "@/components/dashboard/organisms/header";
import { useDashboardContext } from "@/components/dashboard/templates/navbar";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { Ticket } from "@/declarators";
import {
  Button,
  Card,
  Flex,
  Select,
  Text,
} from "@mantine/core";
import {
  IconFlagQuestion,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Support() {
  const [status, setStatus] = useState();
  const { selectedAccount } = useDashboardContext();

  if (!selectedAccount) return null;

  const { data } = useGetTickets({
    accountId: selectedAccount.id,
    params: {
      filters: { status },
    },
  });

  const tickets = (data?.pages.flat() ?? []) as Ticket[];

  return (
    <PageTemplate maxWidth="800px">
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Support"
        description="Manage your clients, link them with projects base knowledgment"
        button={
          <ModalAddTicket
            accountId={selectedAccount.id}
            element={<Button radius="sm" size="xs">Open ticket</Button>}
          />
        }
      />

      <Flex direction="column">
        <Card>
          <Flex gap={10} mb={10}>
            <IconFlagQuestion />

            <Text>How can we help?</Text>
          </Flex>

          <Text>
            Create a support ticket for any questions, technical issues, or
            billing inquiries. Our team typically responds within 24 hours.
          </Text>
        </Card>

        <Flex mt={20} w="100%" justify="space-between" align="center">
          <Text size="lg" fw={500}>
            Tickets
          </Text>

          <Select
            onChange={(value) => setStatus(value)}
            data={[
              { value: "opened", label: "Opened tickets" },
              { value: "closed", label: "Closed tickets" },
            ]}
          />
        </Flex>

        {tickets.length > 0 && (
          <Card mt={10} withBorder={false}>
            <Flex direction="column" gap={10}>
              {tickets.map((ticket) => (
                <TicketCard ticket={ticket} />
              ))}
            </Flex>
          </Card>
        )}

        {tickets.length === 0 && (
          <NoContentBlock
                image="/images/support.svg"
                title="You dont have opened tickets"
                description="Create your first support ticket to get help from our team."
                footer={
                  <Flex gap={10}>
                    <ModalAddTicket
            accountId={selectedAccount.id}
            element={<Button radius="sm" size="xs" variant="light">Open ticket</Button>} />
                  </Flex>
                }
              />
        )} 
      </Flex>
    </PageTemplate>
  );
}
