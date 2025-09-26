import { Ticket } from "@/declarators";
import { Card, Flex, Badge, Text, Divider } from "@mantine/core";
import { FC } from "react";

export const TicketCard: FC<{ ticket: Ticket }> = ({ ticket }) => {
  return (
    <Card p={10}>
      <Flex justify="space-between">
        <Flex direction="column" gap={10}>
          <Text c="dimmed">{ticket.message}</Text>

          <Text fw={500} size="sm">
            {ticket.category} - {ticket.subject}
          </Text>
        </Flex>

        <Flex justify="end" style={{ minWidth: "150px" }}>
          <Badge radius="sm" size="sm">
            {ticket.status}
          </Badge>
        </Flex>
      </Flex>

      {ticket.response && (
        <>
          <Divider mt={20} />

          <Flex direction="column">
            <Flex
              style={{
                borderRadius: "5px",
              }}
              mt={10}
              p={10}
              bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
            >
              <Text>{ticket.response}</Text>
            </Flex>
          </Flex>
        </>
      )}
    </Card>
  );
};
