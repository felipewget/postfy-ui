"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Group,
  Select,
  Card,
  Text,
  Table,
  Grid,
  TextInput,
  Flex,
  Input,
  Paper,
  Avatar,
} from "@mantine/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { ReportTemplate } from "@/components/dashboard/templates/report-template";
import {
  IconSearch,
  IconFilterFilled,
  IconSortDescending,
} from "@tabler/icons-react";

// --- Mock data ---
const hoursData = [
  { name: "João", planned: 40, actual: 38 },
  { name: "Maria", planned: 35, actual: 42 },
  { name: "Pedro", planned: 30, actual: 28 },
];

const workloadData = [
  { week: "Semana 1", workload: 120 },
  { week: "Semana 2", workload: 140 },
  { week: "Semana 3", workload: 110 },
  { week: "Semana 4", workload: 160 },
];

export default function TimeTeamReports() {
  const [person, setPerson] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // KPIs
  const totalPlanned = hoursData.reduce((acc, h) => acc + h.planned, 0);
  const totalActual = hoursData.reduce((acc, h) => acc + h.actual, 0);
  const productivity = ((totalActual / totalPlanned) * 100).toFixed(1);

  return (
    <ReportTemplate
      header={{
        title: "Team reports",
        description: "handle you team progress",
      }}
      tabs={[{ label: "Team", link: "/reports/team" }]}
      page={
        <Flex direction="column">
          <Paper
            mt={10}
            p={4}
            mb={10}
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

          {/*  */}
          <Flex gap={20} direction="column">
            <Flex gap={20}>
              <Card flex={1} shadow="sm" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  Horas Planejadas vs Realizadas (por pessoa)
                </Text>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hoursData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="planned" fill="#8884d8" name="Planejado" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Realizado" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card flex={1} shadow="sm" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  Carga de trabalho semanal
                </Text>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={workloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="workload"
                      stroke="#8884d8"
                      name="Carga (h)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Flex>

            {/*  */}
            <Card w="100%">
              <Flex flex={1} direction="column" gap={20}>
                <Flex w="100%" direction="column">
                  <Text fw={500} mb="sm">
                    Details by team member
                  </Text>

                  <Input leftSection={<IconSearch size="16px" />} />
                </Flex>

                <Flex w="100%" wrap="wrap" gap={10}>
                  {[...Array(20)].map((card) => (
                    <Flex w="calc(50% - 5px)">
                      <CardReportMember />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      }
    />
  );
}

const CardReportMember = () => (
  <Card w="100%">
    <Flex gap={0} direction="column">
      <Flex justify="start" align="center" gap={10} mb={10}>
        <Avatar radius="md">FO</Avatar>

        <Flex w="100%" gap={10} align="center">
          <Text fw={700}>Felipe Oliveira</Text>

          <Text size="sm">(Productivity per time: 124%)</Text>
        </Flex>
      </Flex>

      <Flex gap={20}>
        {[...Array(3)].map(() => (
          <Flex gap={10} align="center" w="50%">
            <Text
              fw={500}
              style={{
                whiteSpace: "nowrap",
              }}
            >
              Planned
            </Text>

            <Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              124Hours
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </Card>
);
