"use client";

import {
  Paper,
  Flex,
  Avatar,
  Text,
  Menu,
  Select,
  Badge,
  Progress,
  VisuallyHidden,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconDots,
  IconUser,
  IconEdit,
  IconTrash,
  IconEyePause,
} from "@tabler/icons-react";
import { useRef } from "react";
import { ButtonFormTask } from "../button-form-task";
import { Task, User } from "@/declarators";
import { useQueryClient } from "@tanstack/react-query";
import { useDelete, useUpdate } from "@/api/dashboard";

type TaskListItem = {
  task: Task;
  users: User[];
};

export const TaskListItem = ({ task, users }) => {
  const queryClient = useQueryClient();

  const onSuccessDelete = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-tasks"] });
  };

  const onUpdateSigned = () => {
    console.log('updated')
  }

  const { mutate: deleteTask } = useDelete(
    { entity: "tasks", recordId: task.id },
    onSuccessDelete
  );

  const { mutate: updateSignedTo } = useUpdate(
    { entity: "tasks", recordId: task.id },
    onUpdateSigned
  );

  const editFormButton = useRef<HTMLDivElement>(null);
  const openPreviewButton = useRef<HTMLDivElement>(null);

  const openEdit = () => editFormButton?.current?.click();

  const confirmDelete = (taskId: number) => {
    modals.openConfirmModal({
      id: `task_${taskId}`,
      title: "Delete client",
      centered: true,
      size: "lg",
      p: 0,
      children: (
        <Text size="sm">
          Are you sure about delete this task? this action is irreversible
        </Text>
      ),
      labels: { confirm: "Delete task", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteTask(),
    });
  };

  return (
    <>
      <ButtonFormTask element={<VisuallyHidden ref={editFormButton} />} task={task} />
      <Paper w="100%">
        <Flex gap={20} justify="space-between" w="100%">
          <Flex gap={20} direction={{ base: "column", md: "row" }}>
            <Flex>
              <IconEyePause />
            </Flex>

            <Flex direction="column">
              {task.title && task.title.length > 0 && (
                <Text fw={500} size="lg" mr={5}>
                  {task.title}
                </Text>
              )}

              <Flex align="center" gap={5} mb={10}>
                <Badge radius="sm">Enterness ico asdoiiasjd</Badge>

                <Badge radius="sm">Development</Badge>
              </Flex>

              {task.description && task.description.length > 0 && (
                <Text>{task.description}</Text>
              )}
            </Flex>

            <Flex gap={5} align="center" ml={{ base: 0, md: 20 }}>
              <Text>Time: </Text>

              <Progress w="200px" value={23} />

              <Text>123h</Text>
            </Flex>
          </Flex>

          <Flex
            direction="column"
            gap={5}
            display={{ base: "none", md: "block" }}
          >
            <Flex align="center" gap={10} h="30px">
              <Select
                w="180px"
                radius="md"
                rightSection={
                  <Flex>
                    <Avatar size="sm" ml={10} mr={5} />
                  </Flex>
                }
                onChange={(userId) => {
                  updateSignedTo({
                    assignedTo: userId
                  })
                }}
                data={users.map((user) => ({ label: user.name, value: `${user.id}` }))}
              />

              <Menu>
                <Menu.Target>
                  <IconDots size="18px" />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconEdit size={14} />}
                    onClick={openEdit}
                  >
                    Edit task
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    onClick={() => confirmDelete(123)}
                    color="red"
                    leftSection={<IconTrash size={14} />}
                  >
                    Delete task
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>

            <Flex align="center" mt={10}>
              <Text>Created by: </Text>
              <Avatar size="sm" />
              Felipe Oliveira
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </>
  );
};
