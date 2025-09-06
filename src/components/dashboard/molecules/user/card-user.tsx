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
import { User } from "@/declarators";
import { useDelete } from "@/api/dashboard";
import { useQueryClient } from "@tanstack/react-query";

type CardUser = {
  user?: User;
}

export const CardUser = ({user}) => {
  const queryClient = useQueryClient();

  const editFormButton = useRef<HTMLDivElement>(null);
  const openPreviewButton = useRef<HTMLDivElement>(null);

  const onSuccessDelete = () => {
      queryClient.invalidateQueries({ queryKey: ["crud-list-users"] });
    };
  
    const { mutate: deleteClient } = useDelete(
        { entity: "users", recordId: user.id },
        onSuccessDelete
      );

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
      onConfirm: () => deleteClient(),
    });
  };

  return (
    <>
      <DrawerUserForm element={<VisuallyHidden ref={editFormButton} />} user={user} />

      <ModalUserPreview element={<VisuallyHidden ref={openPreviewButton} />} />

      <Paper w="100%">
        <Flex justify="space-between">
          <Flex gap={10}>
            <Badge radius="sm" mb={20}>
              {user.role}
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
                {user.name}
              </Text>

              <Text>E-mail: {user.email}</Text>

              <Text>Hours per week: {user.work_hours_per_week}</Text>

              <Flex gap={5}>
                <Text>Price per hour: {user.price_per_hour}</Text>

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
