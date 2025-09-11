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
import {
  IconBusinessplan,
  IconEyePause,
  IconFilterFilled,
  IconSearch,
} from "@tabler/icons-react";
import { TaskListItemSmall } from "@/components/dashboard/molecules/task/task-list-item-small";
import { useDisclosure } from "@mantine/hooks";
import { CardReportProjectsByClient } from "@/components/dashboard/molecules/project/card-report-projects-by-client";
import { CardReportClientHourProfitByClient } from "@/components/dashboard/molecules/client/card-report-client-hour-profit";
import { CardReportChartClientHourProfitByClient } from "@/components/dashboard/molecules/client/card-report-chart-hour-profit";
import { SelectCategoryFilter } from "@/components/dashboard/molecules/project/select-category-filter";
import { SelectProjectFilter } from "@/components/dashboard/molecules/project/select-project-filter";
import { SelectClientFilter } from "@/components/dashboard/molecules/client/select-client-filter";

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
        icon: <IconBusinessplan size="30px" />,
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
              <Flex direction="column">
                <Text>Client</Text>

                <SelectClientFilter onChange={null} />
              </Flex>

              <Flex direction="column">
                <Text>Project</Text>

                <SelectProjectFilter onChange={null} />
              </Flex>

              <Flex direction="column">
                <Text>Category</Text>

                <SelectCategoryFilter onChange={null} />
              </Flex>
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

            <Flex align="start" w="100%" gap={20}>
              <Flex flex={1} gap={20} direction="column">
                <CardReportChartClientHourProfitByClient />

                <CardReportClientHourProfitByClient />
              </Flex>

              <Flex flex={1}>
                <CardReportProjectsByClient />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      }
    />
  );
}
