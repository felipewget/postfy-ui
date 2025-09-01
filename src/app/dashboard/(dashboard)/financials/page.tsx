"use client";

import {
  Avatar,
  Button,
  Flex,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowUpRight, IconCreditCard } from "@tabler/icons-react";

type Payment = {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  method: string;
};

const payments: Payment[] = [
  {
    id: "1",
    date: "2025-08-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "2",
    date: "2025-07-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "3",
    date: "2025-06-01",
    amount: "$120.00",
    status: "failed",
    method: "Credit Card",
  },
  {
    id: "1",
    date: "2025-08-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "2",
    date: "2025-07-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "3",
    date: "2025-06-01",
    amount: "$120.00",
    status: "failed",
    method: "Credit Card",
  },
  {
    id: "1",
    date: "2025-08-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "2",
    date: "2025-07-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "3",
    date: "2025-06-01",
    amount: "$120.00",
    status: "failed",
    method: "Credit Card",
  },
  {
    id: "1",
    date: "2025-08-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "2",
    date: "2025-07-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "3",
    date: "2025-06-01",
    amount: "$120.00",
    status: "failed",
    method: "Credit Card",
  },
  {
    id: "1",
    date: "2025-08-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "2",
    date: "2025-07-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "3",
    date: "2025-06-01",
    amount: "$120.00",
    status: "failed",
    method: "Credit Card",
  },
  {
    id: "1",
    date: "2025-08-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "2",
    date: "2025-07-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "3",
    date: "2025-06-01",
    amount: "$120.00",
    status: "failed",
    method: "Credit Card",
  },
  {
    id: "1",
    date: "2025-08-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "2",
    date: "2025-07-01",
    amount: "$120.00",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "3",
    date: "2025-06-01",
    amount: "$120.00",
    status: "failed",
    method: "Credit Card",
  },
];

export default function FinancialPage() {
  return (
    <Flex
      p={20}
      direction="column"
      w="100%"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Flex gap={20} align="center" mb="xl">
        <Avatar size="lg" />

        <Flex direction="column" gap={5}>
          <Title order={3}>Financial Overview</Title>
          <Text c="dimmed">Manage your plan and payments</Text>
        </Flex>
      </Flex>

      <Paper withBorder radius="md" p="lg" mb="xl">
        <Flex justify="space-between" align="center">
          <Flex gap="md" align="center">
            <Avatar color="blue" radius="xl">
              <IconCreditCard size={20} />
            </Avatar>
            <Flex direction="column">
              <Text fw={600}>Current Plan: Pro</Text>
              <Text size="sm" c="dimmed">
                35 clients • Next billing: Sep 01, 2025
              </Text>
            </Flex>
          </Flex>
          <Button rightSection={<IconArrowUpRight size={16} />}>
            Upgrade Plan
          </Button>
        </Flex>
      </Paper>

      {/* Payments Table */}
      <Paper withBorder radius="md" p="lg">
        <Text fw={600} mb="md">
          Payment History
        </Text>
        <Table highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr pos="sticky" top="0px" bg="white">
              <Table.Th>Date</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Method</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payments.map((payment) => (
              <Table.Tr key={payment.id}>
                <Table.Td>{payment.date}</Table.Td>
                <Table.Td>{payment.amount}</Table.Td>
                <Table.Td>
                  <Text
                    c={
                      payment.status === "paid"
                        ? "green"
                        : payment.status === "failed"
                        ? "red"
                        : "orange"
                    }
                    fw={500}
                  >
                    {payment.status}
                  </Text>
                </Table.Td>
                <Table.Td>{payment.method}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Flex>
  );
}