import {
  Avatar,
  Badge,
  Button,
  Divider,
  Flex,
  Menu,
  Paper,
  Text,
  VisuallyHidden,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconUser } from "@tabler/icons-react";
import { DrawerQuoteForm } from "./drawer-quote-form";
import { FC, useRef } from "react";
import { modals } from "@mantine/modals";
import Link from "next/link";
import { Quote } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useDelete } from "@/api/dashboard";

type QuoteCard = {
  quote: Quote;
};

export const QuoteCard: FC<QuoteCard> = ({ quote }) => {
  const queryClient = useQueryClient();

  const editFormButton = useRef<HTMLDivElement>(null);

  const onSuccessDelete = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-quotes"] });
  };

  const { mutate: deleteClient } = useDelete(
      { entity: "quotes", recordId: quote.id },
      onSuccessDelete
    );

  const openDrawer = () => editFormButton?.current?.click();

  const confirmDelete = (quoteId: number) => {
    modals.openConfirmModal({
      id: `quote_${quoteId}`,
      title: "Delete quote",
      centered: true,
      size: "lg",
      p: 0,
      children: (
        <Text size="sm">
          Are you sure about delete this client? this action is irreversible
        </Text>
      ),
      labels: { confirm: "Delete Client", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteClient(),
    });
  };

  return (
    <>
      <DrawerQuoteForm
        element={<VisuallyHidden ref={editFormButton} />}
        quote={quote}
      />

      <Paper w="100%">
        <Flex gap={20} justify="space-between" align="center">
          <Flex gap={10}>
            <Badge radius="sm">Enterness</Badge>

            <Badge radius="sm">Project month</Badge>
          </Flex>

          <Flex gap={20} align="center">
            <Link href="/quote/XXXXXXXX">
              <Button size="xs">Edit proposal</Button>
            </Link>

            <Menu>
              <Menu.Target>
                <IconDots size="18px" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconEdit size={14} />}
                  onClick={() => openDrawer()}
                >
                  Edit quote record
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  color="red"
                  onClick={() => confirmDelete(120)}
                  leftSection={<IconTrash size={14} />}
                >
                  Delete quote
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>

        <Flex gap={20} mt={10}>
          <Avatar title="asdsa" size="md">
            E
          </Avatar>

          <Flex direction="column">
            <Text size="lg" fw={500}>
              {quote.title}
            </Text>

            <Flex gap={5} align="center">
              <Text size="sm">Created by: </Text>

              <Avatar title="asdsa" size="sm">
                E
              </Avatar>

              <Text size="sm">Felipe Oliveira | Created at: 22/08/2024</Text>
            </Flex>

            <Flex gap={5} align="center" mt={10}>
              <Badge radius="sm" variant="light">
                Status: {quote.status}
              </Badge>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </>
  );
};
