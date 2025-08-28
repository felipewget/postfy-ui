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
  SegmentedControl,
  Input,
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
import { IconEyePause, IconFilterFilled, IconSearch } from "@tabler/icons-react";
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
        title: "Client reports",
        description: "handle you team progress",
      }}
      tabs={[{ label: "General", link: "/reports/clients" }]}
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

          <Card shadow="sm" padding="lg" flex={1}>
            <Text fw={500} mb={16}>
              General view
            </Text>

            <SimpleGrid cols={2} spacing="lg">
              {/* Hours & Profit by Client */}
              <Paper p="md" radius="md" withBorder>
                <Text size="sm" fw={600} mb="sm">
                  Hours & Profit by Client
                </Text>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { client: "Client A", hours: 120, profit: 2000 },
                      { client: "Client B", hours: 90, profit: 1500 },
                      { client: "Client C", hours: 60, profit: 800 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="client" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#228be6" />
                    <Bar dataKey="profit" fill="#40c057" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>

              {/* Projects by Client */}
              <Paper p="md" radius="md" withBorder>
 <Group justify="space-between" mb="sm">
        <Text size="sm" fw={600}>
          Projects by Client
        </Text>
        <SegmentedControl
          size="xs"
          data={[
            { label: "Todos", value: "all" },
            { label: "Ativos", value: "active" },
            { label: "Inativos", value: "inactive" },
          ]}
        />
      </Group>

      <Input leftSection={<IconSearch size={14} />} mb={10} />
      
                <Stack gap="sm">
                  <Group justify="space-between">
                    <Text size="sm">Client A</Text>
                    <Badge color="blue" variant="light">
                      4 projects
                    </Badge>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Client B</Text>
                    <Badge color="blue" variant="light">
                      3 projects
                    </Badge>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Client C</Text>
                    <Flex gap={10}>
                      <Badge color="blue" variant="light">
                        Active
                      </Badge>

                      <Badge color="blue" variant="light">
                        2 projects
                      </Badge>
                    </Flex>
                  </Group>
                </Stack>
              </Paper>
            </SimpleGrid>

            <SimpleGrid cols={2} spacing="lg" mt="lg">

              {/* Avg planned vs actual time */}
              <Paper p="md" radius="md" withBorder>
                <Text size="sm" fw={600} mb="sm">
                  Avg Planned vs Actual Time
                </Text>

                <Text>Client 1</Text>

                <Text size="xs" c="dimmed" mb="xs">
                  Planned: 100h | Actual: 120h
                </Text>
                <Progress value={120} max={100} color="red" />
              </Paper>
            </SimpleGrid>
          </Card>
        </Flex>
      }
    />
  );
}
