"use client";

import React, { useState } from "react";
import {
  Card,
  Text,
  Flex,
  Paper,
  Progress,
  Select,
  TextInput,
} from "@mantine/core";
import { ReportTemplate } from "@/components/dashboard/templates/report-template";
import { IconFilterFilled, IconNotes } from "@tabler/icons-react";
import { useQuoteReport } from "@/api/dashboard/reports.api";
import { SelectClientFilter } from "@/components/dashboard/molecules/client/select-client-filter";
import { SelectProjectFilter } from "@/components/dashboard/molecules/project/select-project-filter";
import { SelectCategoryFilter } from "@/components/dashboard/molecules/project/select-category-filter";

interface Quote {
  id: number;
  client: string;
  sentAmount: number;
  acceptedAmount: number;
  projectedRevenue: number;
}

export default function QuotesReports() {
  const { data: quoteReport } = useQuoteReport();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  if (!quoteReport) return;

  return (
    <ReportTemplate
      header={{
        icon: <IconNotes size="30px" />,
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

          <Flex>
            <Card>
              <Flex direction="column" gap={5} align="center">
                <Text>
                  {(
                    (100 / quoteReport.total) *
                    quoteReport.statusCounts.approved
                  ).toFixed(2)}
                  %
                </Text>

                <Text fw={500}>Approval rate</Text>
              </Flex>
            </Card>
          </Flex>

          <Flex w="100%" direction="column">
            <CardQuote
              total={quoteReport.total}
              approved={quoteReport.statusCounts.approved}
              refused={quoteReport.statusCounts.refused}
              pending={quoteReport.statusCounts.pending}
              noContent={quoteReport.statusCounts.noContent}
            />
          </Flex>
        </Flex>
      }
    />
  );
}

const CardQuote = ({ total, approved, refused, pending, noContent }) => (
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
            Quotes ({total})
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
            Quotes approved ({approved})
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
            Quotes rejected ({refused})
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
            Quotes peding ({pending})
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
            Quotes no content ({noContent})
          </Text>

          <Flex w="100%" align="center" gap={20}>
            <Progress flex={1} value={80} />

            <Text>85%</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* <Flex direction="column" gap={5} align="center">
        <Text>{total}</Text>

        <Text fw={500}>Avg. of quote time</Text>
      </Flex> */}
    </Flex>
  </Card>
);
