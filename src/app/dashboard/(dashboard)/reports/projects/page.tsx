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
import { IconFilterFilled, IconFlask } from "@tabler/icons-react";
import { CardReportGeneralProjectStatuses } from "@/components/dashboard/molecules/project/card-report-general-project-statuses";
import { CardReportProjectCategoryStatuses } from "@/components/dashboard/molecules/project/card-report-project-category-statuses";
import { SelectClientFilter } from "@/components/dashboard/molecules/client/select-client-filter";
import { SelectProjectFilter } from "@/components/dashboard/molecules/project/select-project-filter";
import { SelectCategoryFilter } from "@/components/dashboard/molecules/project/select-category-filter";

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
        icon: <IconFlask size="30px" />,
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
            <CardReportGeneralProjectStatuses />
          </Flex>

          <Flex>
            <CardReportProjectCategoryStatuses />
          </Flex>
        </Flex>
      }
    />
  );
}
