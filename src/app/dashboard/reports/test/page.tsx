"use client"

import React from "react";
import {
  Table,
  Progress,
  Text,
  Group,
  Badge,
  Card,
  Title,
  Flex,
} from "@mantine/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Exemplo de dados
const jobs = [
  {
    id: 1,
    name: "Design Website",
    startDate: "2025-08-01",
    endDate: "2025-08-20",
    team: ["Alice", "Bob"],
    hoursUsed: 35,
    hoursPlanned: 40,
    revenueUsed: 2800,
    revenuePlanned: 4000,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Landing Page",
    startDate: "2025-08-05",
    endDate: "2025-08-15",
    team: ["Charlie"],
    hoursUsed: 12,
    hoursPlanned: 15,
    revenueUsed: 900,
    revenuePlanned: 1200,
    status: "Completed",
  },
];

const budgetEvolution = [
  { date: "2025-08-01", budget: 1000, used: 800 },
  { date: "2025-08-05", budget: 2000, used: 1200 },
  { date: "2025-08-10", budget: 3000, used: 2200 },
  { date: "2025-08-15", budget: 4000, used: 2800 },
  { date: "2025-08-20", budget: 5000, used: 4000 },
];

export default function JobDetailReport() {
  const rows = jobs.map((job) => (
    <tr key={job.id}>
      <td>{job.name}</td>
      <td>{job.startDate} → {job.endDate}</td>
      <td>{job.team.join(", ")}</td>
      <td>
        <Progress
          value={(job.hoursUsed / job.hoursPlanned) * 100}
          label={`${job.hoursUsed}/${job.hoursPlanned}h`}
        />
      </td>
      <td>
        <Progress
          color="green"
          value={(job.revenueUsed / job.revenuePlanned) * 100}
          label={`$${job.revenueUsed}/$${job.revenuePlanned}`}
        />
      </td>
      <td>
        <Badge color={job.status === "Completed" ? "green" : "yellow"}>
          {job.status}
        </Badge>
      </td>
    </tr>
  ));

  return (
    <Flex direction="column" gap="xl" p="md">
      <Title order={3}>Job Detail Report</Title>

      <Card shadow="sm" p="md">
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Job</th>
              <th>Dates</th>
              <th>Team</th>
              <th>Hours Used</th>
              <th>Revenue Used</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>

      <Card shadow="sm" p="md">
        <Title order={4} mb="sm">Budget vs Used Over Time</Title>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={budgetEvolution}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="budget" stroke="#8884d8" />
            <Line type="monotone" dataKey="used" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Flex>
  );
}