"use client";

import { Header } from "@/components/dashboard/organisms/header";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconCircleDottedLetterP,
  IconCreditCard,
} from "@tabler/icons-react";

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

export default function PlanPage() {
  return (
    <PageTemplate>
      <Header
        icon={<IconCreditCard size="30px" />}
        title="Financial Overview"
        description="Manage your plan and payments"
      />

      <Paper withBorder radius="md" p="lg" mt={20}>
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

      <Card mt={10} withBorder={false}>
        <Text fw={600} mb="md">
          Plans
        </Text>

        <Grid>
          {plans.map((plan) => (
            <Grid.Col span={4} key={plan.name}>
              <Card
                withBorder
                shadow={plan.highlighted ? "md" : "sm"}
                radius="md"
                padding="lg"
                style={{
                  borderColor: plan.highlighted ? "#7A4DFF" : undefined,
                }}
              >
                <Stack>
                  <Flex direction="column">
                    <Title order={3}>{plan.name}</Title>

                    <Text c="dimmed">Perfect for growing businesses</Text>
                  </Flex>

                  <Text size="xl" fw={700}>
                    {plan.price}
                  </Text>

                  <Stack gap="xs">
                    {plan.features.map((feature) => (
                      <Text key={feature} size="sm" c="dimmed">
                        • {feature}
                      </Text>
                    ))}
                  </Stack>

                  <Group justify="center" mt="md">
                    <Button
                      fullWidth
                      radius="md"
                      variant={plan.highlighted ? "filled" : "light"}
                      color="violet"
                    >
                      {plan.highlighted ? "Get started" : "Choose"}
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      <Card mt={10} withBorder={false}>
        <Text fw={600} mb="md">
          Payment History
        </Text>
        <Table highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr top="0px" py={20}>
              <Table.Th>Date</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Method</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payments.map((payment) => (
              <Table.Tr key={payment.id} py={20}>
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
      </Card>
    </PageTemplate>
  );
}

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 project", "Community support", "Basic analytics"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    features: ["Unlimited projects", "Priority support", "Advanced analytics"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Dedicated manager", "Custom features", "24/7 support"],
    highlighted: false,
  },
];
