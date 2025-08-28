"use client";

import React from "react";
import {
  Card,
  Text,
  Title,
  SimpleGrid,
  Table,
  ScrollArea,
  Badge,
  Flex,
  Paper,
  Progress,
  Select,
  TextInput,
  SegmentedControl,
  Divider,
  Avatar,
} from "@mantine/core";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ReportTemplate } from "@/components/dashboard/templates/report-template";
import { IconFilterFilled } from "@tabler/icons-react";

interface Project {
  id: number;
  name: string;
  budgetedRevenue: number;
  budgetedHours: number;
  actualRevenue: number;
  actualHours: number;
  cost: number;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Project A",
    budgetedRevenue: 10000,
    budgetedHours: 80,
    actualRevenue: 12000,
    actualHours: 90,
    cost: 7000,
  },
  {
    id: 2,
    name: "Project B",
    budgetedRevenue: 8000,
    budgetedHours: 60,
    actualRevenue: 7500,
    actualHours: 70,
    cost: 5000,
  },
  {
    id: 3,
    name: "Project C",
    budgetedRevenue: 15000,
    budgetedHours: 100,
    actualRevenue: 14000,
    actualHours: 110,
    cost: 9000,
  },
];

export default function ProjectsReports() {
  const barData = projects.map((p) => ({
    name: p.name,
    budgetedRevenue: p.budgetedRevenue,
    actualRevenue: p.actualRevenue,
    budgetedHours: p.budgetedHours,
    actualHours: p.actualHours,
    profit: p.actualRevenue - p.cost,
  }));

  return (
    <ReportTemplate
      header={{
        title: "Project reports",
        description: "handle you team progress",
      }}
      tabs={[{ label: "Projects", link: "/reports/team" }]}
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
                // value={startDate}
                // onChange={(e) => setStartDate(e.currentTarget.value)}
              />
              <TextInput
                type="date"
                label="Data final"
                // value={endDate}
                // onChange={(e) => setEndDate(e.currentTarget.value)}
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
                    Projects done (12/90)
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
                    Project In progress (12/90)
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
                    Projects to Do (12/90)
                  </Text>

                  <Flex w="100%" align="center" gap={20}>
                    <Progress flex={1} value={80} />

                    <Text>85%</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </Flex>

          <Flex>
            <Card shadow="sm" padding="lg" flex={1}>
              <Flex justify="space-between" align="center">
                <Text weight={500} mb={16}>
                  Project categories mensurement
                </Text>

                <SegmentedControl
                  size="xs"
                  data={[
                    { label: "By tasks", value: "all" },
                    { label: "By hour", value: "active" },
                  ]}
                />
              </Flex>

              <Flex direction="column" gap={10} mt={10}>
                {[...Array(5)].map(() => (
                  <Flex align="center" gap={10}>
                    <Text w={200}>Development</Text>
                    <Progress w="100%" value={0} />
                    25.4%
                  </Flex>
                ))}
              </Flex>

              <Divider my={20} />

              <Flex gap={20} align="center">
                <Text>Team members involved with</Text>
                <Avatar.Group spacing="sm">
                  <div>
                    <Avatar src="image.png" radius="xl" />
                  </div>
                  <Avatar src="image.png" radius="xl" />
                  <Avatar src="image.png" radius="xl" />
                  <Avatar radius="xl">+5</Avatar>
                </Avatar.Group>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      }
    />
  );
}
