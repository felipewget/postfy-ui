import { Flex, Text, Card, Button, Select, Loader } from "@mantine/core";
import { FC, useState } from "react";
import { TicketCard } from "../../molecules/ticket/ticket-card";
import { useGetTickets } from "@/apis/ticket.api";
import { Ticket } from "@/declarators";
import { IconTicket } from "@tabler/icons-react";
import { NoContentBlock } from "../../molecules/no-content-block";
import { ModalAddTicket } from "../../molecules/ticket/modal-add-ticket";

type TicketlListProps = { accountId: number };

export const TicketlList: FC<TicketlListProps> = ({ accountId }) => {
  const [status, setStatus] = useState("opened");

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetTickets({
      accountId,
      params: {
        filters: { status },
      },
    });

  const tickets = (data?.pages.flat() ?? []) as Ticket[];

  return (
    <Flex direction="column">
      <Flex mt={20} w="100%" justify="space-between" align="center">
        <Flex gap={10} align="center">
          <IconTicket />

          <Text size="lg" fw={500}>
            Tickets
          </Text>
        </Flex>

        <Select
          radius="sm"
          value={status}
          onChange={(value) => value && setStatus(value)}
          data={TICKET_STATUS_OPTIONS}
        />
      </Flex>

      {isLoading && (
        <Card mt={10} withBorder={false} radius="sm">
          <Flex p={50} justify="center">
            <Loader type="dots" />
          </Flex>
        </Card>
      )}

      {!isLoading && tickets.length > 0 && (
        <Card mt={10} withBorder={false} radius="sm">
          <Flex direction="column" gap={10}>
            {tickets.map((ticket) => (
              <TicketCard ticket={ticket} />
            ))}

            {hasNextPage && (
              <Flex>
                <Button
                  mt={10}
                  size="xs"
                  radius="xs"
                  disabled={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </Button>
              </Flex>
            )}
          </Flex>
        </Card>
      )}

      {!isLoading && tickets.length === 0 && (
        <Card mt={10} withBorder={false} radius="sm">
          <NoContentBlock
            image="/images/support.svg"
            title={`You dont have ${status} tickets`}
            description="Create your first support ticket to get help from our team."
            footer={
              <Flex gap={10} mt={10}>
                <ModalAddTicket
                  accountId={accountId}
                  element={
                    <Button radius="sm" size="xs" variant="light">
                      Open ticket
                    </Button>
                  }
                />
              </Flex>
            }
          />
        </Card>
      )}
    </Flex>
  );
};

const TICKET_STATUS_OPTIONS = [
  { value: "opened", label: "Opened tickets" },
  { value: "closed", label: "Closed tickets" },
];
