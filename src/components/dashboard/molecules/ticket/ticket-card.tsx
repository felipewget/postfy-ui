import { Ticket } from "@/declarators";
import { Card, Flex, Badge, Text, Divider, Button } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { FC } from "react";

export const TicketCard: FC<{ ticket: Ticket }> = ({ ticket }) => {
  return (
    <Card p={10} radius="sm" bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))">
      <Flex justify="space-between">
        <Flex direction="column" gap={5}>
          <Text size="sm" c="dimmed">
            {ticket.message}
          </Text>

          <Text fw={500} size="sm">
            Subject: {ticket.subject}
          </Text>
        </Flex>

        <Flex justify="end" gap={10} style={{ minWidth: "150px" }}>
          <Badge radius="sm" size="sm" variant="light">
            {ticket.category}
          </Badge>

          <Badge radius="sm" size="sm">
            {ticket.status}
          </Badge>

          <Button size="20px" px={5} variant="light" radius="sm">
            <IconDots size="13px" />
          </Button>
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
