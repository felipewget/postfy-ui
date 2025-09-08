"use client";

import { useList } from "@/api/dashboard";
import { ButtonFormTask } from "@/components/dashboard/molecules/button-form-task";
import { TaskListItem } from "@/components/dashboard/molecules/task/task-list-item";
import { Task, User } from "@/declarators";
import {
  Avatar,
  Button,
  Flex,
  Input,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconSearch,
  IconFilterFilled,
  IconUser,
  IconNotebook,
} from "@tabler/icons-react";
import { groupBy } from "lodash";

export default function TaskPage() {
  const [search, setSearch] = useDebouncedState("", 300);
  const [status, setStatus] = useDebouncedState(null, 300);

  const { data } = useList({
    entity: "tasks",
    params: {
      // search,
      //   searchFields: "title",
      //   filters: { status },
    },
  });

  const { data: dataUsers } = useList({
    entity: "users",
    params: {
      // search,
      //   searchFields: "title",
      //   filters: { status },
    },
  });

  const tasks = (data?.pages.flat() ?? []) as Task[];

  const users = (dataUsers?.pages.flat() ?? []) as User[];

  const groupedTask = groupBy(tasks, "date");
  console.log(groupedTask);

  return (
    <Flex
      p={20}
      direction="column"
      w="100%"
      style={{
        maxWidth: "1300px",
      }}
    >
      <Flex w="100%" justify="space-between" align="center" pb={20} pt={10}>
        <Flex gap={20}>
          <Avatar size="lg">
            <IconNotebook size="30px" />
          </Avatar>

          <Flex direction="column">
            <Text size="2xl" fw={500}>
              Tasks
            </Text>

            <Text>Manage your clients, link them with projects</Text>
          </Flex>
        </Flex>

        <ButtonFormTask element={<Button radius="md">Create task</Button>} />
      </Flex>

      <Paper
        p={4}
        mb={20}
        pos="sticky"
        top="10px"
        style={{
          zIndex: 1,
        }}
      >
        <Flex w="100%" gap={15} p={2}>
          <Flex w="100%" gap={5}>
            <Input
              placeholder="Search"
              leftSection={<IconSearch size="16px" />}
              flex={1}
              radius="sm"
            />

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              data={[
                { label: "Hold", value: "active" },
                { label: "In progress", value: "non-active" },
              ]}
            />
          </Flex>
        </Flex>

        <Flex w="100%" gap={15} p={2}>
          <Select
            flex={1}
            label="Assigned to"
            leftSection={<IconUser size="16px" />}
            radius="sm"
            data={[{ label: "Enterness", value: "active" }]}
          />

          <Select
            flex={1}
            label="Client"
            leftSection={<IconUser size="16px" />}
            radius="sm"
            data={[{ label: "Enterness", value: "active" }]}
          />

          <Select
            flex={1}
            label="Category"
            leftSection={<IconUser size="16px" />}
            radius="sm"
            data={[{ label: "Enterness", value: "active" }]}
          />
        </Flex>
      </Paper>

      {Object.keys(groupedTask).map((tasksByDate, key) => (
        <Flex key={key} direction="column" gap={10} w="100%" mb="20px">
          <Flex direction="column" gap={10}>
            <Flex align="center">
              <Text size="lg" fw={500}>
                Today
              </Text>

              <ButtonFormTask
                element={
                  <Button variant="transparent" size="xs">
                    Create task
                  </Button>
                }
              />
            </Flex>

            <Flex direction="column" gap={4}>
              {groupedTask[tasksByDate].map((task, key) => (
                <TaskListItem key={key} task={task} users={users} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
