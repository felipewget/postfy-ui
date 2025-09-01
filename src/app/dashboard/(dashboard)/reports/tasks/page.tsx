// src/app/dashboard/reports/tasks/page.tsx
"use client";

import React, { useState } from "react";
import {
  Card,
  Text,
  Badge,
  Group,
  Title,
  SimpleGrid,
  ScrollArea,
  Flex,
  Avatar,
  Progress,
  Paper,
  Button,
  Stack,
  Accordion,
  Collapse,
  Select,
  TextInput,
} from "@mantine/core";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import { ReportTemplate } from "@/components/dashboard/templates/report-template";
import { TaskListItem } from "@/components/dashboard/molecules/task/task-list-item";
import { IconEyePause, IconFilterFilled } from "@tabler/icons-react";
import { TaskListItemSmall } from "@/components/dashboard/molecules/task/task-list-item-small";
import { useDisclosure } from "@mantine/hooks";

interface Task {
  id: number;
  title: string;
  status: "to do" | "doing" | "done";
  priority?: "low" | "medium" | "high";
}

const initialTasks: Task[] = [
  { id: 1, title: "Design homepage", status: "doing", priority: "high" },
  { id: 2, title: "Setup database", status: "to do", priority: "medium" },
  { id: 3, title: "Deploy API", status: "done", priority: "low" },
  { id: 4, title: "Create landing page", status: "doing", priority: "high" },
  { id: 5, title: "Write documentation", status: "to do", priority: "medium" },
];

const statusColors: Record<string, string> = {
  "to do": "#e9ecef",
  doing: "#ffe066",
  done: "#69db7c",
};

const memberStatusData = [
  { member: "Alice", todo: 3, doing: 2, done: 5 },
  { member: "Bob", todo: 4, doing: 1, done: 2 },
  { member: "Charlie", todo: 2, doing: 3, done: 4 },
  { member: "Ali2ce", todo: 3, doing: 2, done: 5 },
  { member: "Bob2", todo: 4, doing: 1, done: 2 },
  { member: "Char2lie", todo: 2, doing: 3, done: 4 },
];

export default function TasksReports() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const statusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const burnDownData = [
    { name: "Done", value: statusCounts["done"] || 0 },
    { name: "Remaining", value: tasks.length - (statusCounts["done"] || 0) },
  ];

  const statuses: Task["status"][] = ["to do", "doing", "done"];

  const rowHeight = 50;
  const [opened, { toggle }] = useDisclosure(false);

    const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <ReportTemplate
      header={{
        title: "Task reports",
        description: "handle you team progress",
      }}
      tabs={[
        { label: "Tasks", link: "/reports/tasks" },
        { label: "Timeline", link: "/reports/tasks/timelines" },
      ]}
      page={
        <Flex w="100%" gap={20} direction="column" py={20}>
          <Paper
            mt={10}
            p={4}
            pos="sticky"
            top="10px"
            style={{
              zIndex: 1,
            }}
          >
            <Flex w="100%" gap={15} p={2}>
              {/* <Flex w="100%" gap={5}> */}
              <Select
                leftSection={<IconFilterFilled size="12px" />}
                radius="sm"
                label="Client"
                placeholder="Client"
                data={[
                  { label: "Active", value: "active" },
                  { label: "Non active", value: "non-active" },
                ]}
              />

              <Select
                flex={1}
                leftSection={<IconFilterFilled size="12px" />}
                radius="sm"
                label="Project"
                placeholder="Project"
                data={[
                  { label: "Active", value: "active" },
                  { label: "Non active", value: "non-active" },
                ]}
              />

              <Select
                leftSection={<IconFilterFilled size="12px" />}
                radius="sm"
                label="Category"
                placeholder="Category"
                data={[
                  { label: "Active", value: "active" },
                  { label: "Non active", value: "non-active" },
                ]}
              />
              {/* </Flex> */}

              <TextInput
                type="date"
                label="Data inicial"
                value={startDate}
                onChange={(e) => setStartDate(e.currentTarget.value)}
              />
              <TextInput
                type="date"
                label="Data final"
                value={endDate}
                onChange={(e) => setEndDate(e.currentTarget.value)}
              />
            </Flex>
          </Paper>
          
          <Flex>
            <Card shadow="sm" padding="lg" flex={1}>
              <Text weight={500} mb={16}>
                General view
              </Text>

              <Flex direction="column" gap={10}>
                <Flex gap={20}>
                  <Text
                    w={180}
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    Done (12/90)
                  </Text>

                  <Flex w="100%" align="center" gap={20}>
                    <Progress flex={1} value={80} />

                    <Text>85%</Text>
                  </Flex>
                </Flex>

                <Flex gap={20}>
                  <Text
                    w={180}
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    In progress (12/90)
                  </Text>

                  <Flex w="100%" align="center" gap={20}>
                    <Progress flex={1} value={80} />

                    <Text>85%</Text>
                  </Flex>
                </Flex>

                <Flex gap={20}>
                  <Text
                    w={180}
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    To Do (12/90)
                  </Text>

                  <Flex w="100%" align="center" gap={20}>
                    <Progress flex={1} value={80} />

                    <Text>85%</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </Flex>

          <Card shadow="sm" padding="lg" flex={1}>
            <Flex justify="space-between" align="center">
              <Text fw={500}>Tasks per team member</Text>
              <Button size="xs" variant="light" onClick={toggle}>
                {opened ? "Collapse" : "Expand"}
              </Button>
            </Flex>

            <Collapse in={opened}>
              <Stack spacing="md" mt={16}>
                {memberStatusData.map((m) => {
                  const total = m.todo + m.doing + m.done;
                  const todoPercent = (m.todo / total) * 100;
                  const doingPercent = (m.doing / total) * 100;
                  const donePercent = (m.done / total) * 100;

                  return (
                    <div key={m.member}>
                      <Text fw={500}>{m.member}</Text>
                      <Flex w="100%" gap={4} mt={4}>
                        <Progress
                        flex={1}
                          value={todoPercent}
                          color="#CCC"
                          style={{ flex: todoPercent }}
                          radius="xl"
                        />
                        <Progress
                        flex={1}
                          value={doingPercent}
                          color="#ffe066"
                          style={{ flex: doingPercent }}
                          radius="xl"
                        />
                        <Progress
                        flex={1}
                          value={donePercent}
                          color="#69db7c"
                          style={{ flex: donePercent }}
                          radius="xl"
                        />
                      </Flex>
                      <Text size="sm" mt={2}>
                        To do: {m.todo}, Doing: {m.doing}, Done: {m.done}{" "}
                        (Total: {total})
                      </Text>
                    </div>
                  );
                })}
              </Stack>
            </Collapse>
          </Card>

          <SimpleGrid cols={3} spacing="lg">
            {["To-do", "In progress", "Done"].map((title) => (
              <Paper w="100%">
                <Text mb={10} fw={500}>
                  {title}
                </Text>

                <Flex direction="column" gap={10}>
                  <TaskListItemSmall />

                  <TaskListItemSmall />

                  <TaskListItemSmall />

                  <TaskListItemSmall />
                </Flex>

                <Button radius="md" mt={10}>
                  Load more
                </Button>
              </Paper>
            ))}
          </SimpleGrid>
        </Flex>
      }
    />
  );
}
