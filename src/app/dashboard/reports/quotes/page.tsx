"use client";

import React, { useState } from "react";
import {
  Card,
  Text,
  Title,
  SimpleGrid,
  Table,
  ScrollArea,
  Badge,
  Flex,
  Group,
  Input,
  Paper,
  Progress,
  SegmentedControl,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { ReportTemplate } from "@/components/dashboard/templates/report-template";
import { IconFilterFilled, IconSearch } from "@tabler/icons-react";
import { QuoteCard } from "@/components/dashboard/molecules/quote/card-quote";

interface Quote {
  id: number;
  client: string;
  sentAmount: number;
  acceptedAmount: number;
  projectedRevenue: number;
}

const quotes: Quote[] = [
  {
    id: 1,
    client: "Client A",
    sentAmount: 10,
    acceptedAmount: 6,
    projectedRevenue: 12000,
  },
  {
    id: 2,
    client: "Client B",
    sentAmount: 8,
    acceptedAmount: 5,
    projectedRevenue: 8000,
  },
  {
    id: 3,
    client: "Client C",
    sentAmount: 12,
    acceptedAmount: 7,
    projectedRevenue: 15000,
  },
];

export default function QuotesReports() {
  const conversionData = quotes.map((q) => ({
    client: q.client,
    sent: q.sentAmount,
    accepted: q.acceptedAmount,
    conversionRate: ((q.acceptedAmount / q.sentAmount) * 100).toFixed(1),
    projectedRevenue: q.projectedRevenue,
  }));

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

          <Flex w="100%" direction="column">
            <CardQuote />
          </Flex>

          <Card shadow="sm" padding="lg" flex={1}>
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

            <Flex w="100%" direction="column" gap={10}>
              {[...Array(4)].map(() => (
                <CardQuote />
              ))}
            </Flex>
          </Card>
        </Flex>
      }
    />
  );
}

const CardQuote = () => (
  <Card shadow="sm" padding="lg" flex={1}>
    <Text weight={500} mb={16}>
      General view
    </Text>

    <Flex gap={40} align="center">
      <Flex direction="column" flex={1} gap={10}>
        <Flex gap={20}>
          <Text
            w={180}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Quotes (12/90)
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
            Quotes approved (12/90)
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
            Quotes rejected (12/90)
          </Text>

          <Flex w="100%" align="center" gap={20}>
            <Progress flex={1} value={80} />

            <Text>85%</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap={5} align="center">
        <Text>123%</Text>

        <Text fw={500}>Conversion rate</Text>
      </Flex>

      <Flex direction="column" gap={5} align="center">
        <Text>12h</Text>

        <Text fw={500}>Avg. of quote time</Text>
      </Flex>
    </Flex>
  </Card>
);
