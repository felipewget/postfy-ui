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
import { Rangepicker } from "@/components/dashboard/atoms/rangepicker";
import { TeamTimeline } from "@/components/dashboard/organisms/graphs/timeline/team-timeline";


export default function TasksReports() {
  const period = {
    initial: new Date("2024-05-19"),
    final: new Date("2024-07-14"),
  };

  const config = [
    {
      id: 1,
      name: "Felipe",
      avatar:
        "https://workablehr.s3.amazonaws.com/uploads/account/logo/570675/logo",
      tasks: [
        { id: 1, date: "2024-05-22", time: 60 * 6 },
        { id: 2, date: "2024-05-23", time: 60 * 32 },
        { id: 3, date: "2024-05-28", time: 60 * 3 },
      ],
    },
    {
      id: 2,
      name: "Mateus",
      avatar:
        "https://workablehr.s3.amazonaws.com/uploads/account/logo/570675/logo",
      tasks: [
        { id: 1, date: "2024-06-12", time: 60 * 12 }, // minutes
        { id: 2, date: "2024-06-13", time: 60 * 90 }, // minutes
        { id: 3, date: "2024-06-17", time: 60 * 12 }, // minutes
      ],
    },
  ];

  return (
    <ReportTemplate
      header={{
        title: "Task reports",
        description: "handle you team progress",
      }}
      tabs={[
        { label: "Tasks", link: "/reports/tasks" },
        { label: "Timeline", link: "/reports/tasks/timeline" },
      ]}
      page={(
        <Flex direction="column" w="100%">
      <>
        <Flex justify="center" px={40} py={25}>
          <Rangepicker />
        </Flex>

        <Flex m={20}>
          <TeamTimeline timeline={config} period={period} />
        </Flex>
      </>
    </Flex>
      )}
      />
    )
}