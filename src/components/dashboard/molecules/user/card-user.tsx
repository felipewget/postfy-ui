"use client";

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
import { modals } from "@mantine/modals";
import {
  IconDots,
  IconEdit,
  IconEye,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useRef } from "react";
import { DrawerUserForm } from "./drawer-user-form";
import { ModalUserPreview } from "./modal-user-preview";

export const CardUser = () => {
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
    <>
      <DrawerUserForm element={<VisuallyHidden ref={editFormButton} />} />

      <ModalUserPreview element={<VisuallyHidden ref={openPreviewButton} />} />

      <Paper w="100%">
        <Flex justify="space-between">
          <Flex gap={10}>
            <Badge radius="sm" mb={20}>
              Developer
            </Badge>
          </Flex>

          <Flex>
            <Menu>
              <Menu.Target>
                <IconDots size="18px" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={openPreview}
                  leftSection={<IconUser size={14} />}
                >
                  View client
                </Menu.Item>

                <Menu.Item
                  onClick={openDrawer}
                  leftSection={<IconEdit size={14} />}
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

        <Flex gap={20} justify="space-between">
          <Flex gap={20} w="calc(100% - 50px)">
            <Avatar title="asdsa" size="lg">
              FO
            </Avatar>

            <Flex direction="column" w="100%">
              <Text size="lg" fw={500}>
                Felipe Oliveira
              </Text>

              <Text>E-mail: felipe.wget@gmail.com</Text>

              <Text>Hours per week: 42hours</Text>

              <Flex gap={5}>
                <Text>Price per hour: ***</Text>

                <IconEye />
              </Flex>

              <Flex align="center" gap={10}>
                <Text>Projects: </Text>

                <Avatar.Group mt={10}>
                  <Avatar src="image.png" radius="md" />
                  <Avatar src="image.png" radius="md" />
                  <Avatar src="image.png" radius="md" />
                  <Avatar radius="md">+5</Avatar>
                </Avatar.Group>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Divider my={14} />

        <Flex gap="10" wrap="wrap">
          <Badge radius="sm">Created at: 22/08/1994</Badge>
          <Badge radius="sm">Has notes</Badge>
        </Flex>
      </Paper>
    </>
  );
};
