import {
  Avatar,
  Badge,
  Divider,
  Flex,
  Menu,
  Paper,
  Text,
  VisuallyHidden,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconUser } from "@tabler/icons-react";
import { DrawerClientForm } from "./drawer-client-form";
import { useRef } from "react";
import { modals } from "@mantine/modals";
import { ModalClientPreview } from "./modal-client-preview";

export const ClientCard = () => {
  const editFormButton = useRef<HTMLDivElement>(null);
  const openPreviewButton = useRef<HTMLDivElement>(null);

  const openDrawer = () => editFormButton?.current?.click();
  const openPreview = () => openPreviewButton?.current?.click();

  const confirmDelete = (clientId: number) => {
    modals.openConfirmModal({
      id: `client_${clientId}`,
      title: "Delete client",
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
      onConfirm: () => console.log(clientId),
    });
  };

  return (
    <Paper w="100%">
      <DrawerClientForm element={<VisuallyHidden ref={editFormButton} />} />

      <ModalClientPreview element={<VisuallyHidden ref={openPreviewButton} />} />

      <Flex gap={20} justify="space-between">
        <Flex gap={20}>
          <Avatar title="asdsa" size="lg">
            E
          </Avatar>

          <Flex direction="column">
            <Text size="lg" fw={500}>
              Enterness company
            </Text>

            <Text>Email: felipe.wget@gmail.com</Text>
            <Text>Phone: +41 5689 7458</Text>
            <Text>Website: https://google.com</Text>
          </Flex>
        </Flex>

        <Flex>
          <Menu>
            <Menu.Target>
              <IconDots size="18px" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconUser size={14} />}
                onClick={openPreview}
              >
                View client
              </Menu.Item>

              <Menu.Item
                leftSection={<IconEdit size={14} />}
                onClick={openDrawer}
              >
                Edit client
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                onClick={() => confirmDelete(123456)}
                color="red"
                leftSection={<IconTrash size={14} />}
              >
                Delete client
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>

      <Divider my={14} />

      <Flex gap="10" wrap="wrap">
        <Badge radius="sm">1 Project</Badge>

        <Badge radius="sm">Active client</Badge>

        <Badge radius="sm">Has notes</Badge>
      </Flex>
    </Paper>
  );
};
