"use client";

import { useListApprovedPublications } from "@/apis/publications.api";
import { NoContentBlock } from "@/components/dashboard/molecules/no-content-block";
import { CardWeekPublication } from "@/components/dashboard/molecules/publication/card-week-publication";
import { CardWeekStrategy } from "@/components/dashboard/molecules/publication/card-week-strategy";
import { PublicationScheduleCard } from "@/components/dashboard/molecules/publication/publication-schedule-card";
import { Header } from "@/components/dashboard/organisms/header";
import { useDashboardContext } from "@/components/dashboard/templates/navbar";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Progress,
  SegmentedControl,
  Select,
  Text,
} from "@mantine/core";
import {
  IconCalendar,
  IconCheck,
  IconHome,
  IconThumbUp,
  IconUsersGroup,
} from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { FC, useState } from "react";
import { date } from "yup";

export default function Home() {
  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Dashboard"
        description="sdsd sads dsaasdasdadasdadsada dasds adasdsa"
        button={
          <Flex gap={10}>
            <Button
              variant="outline"
              radius="md"
              leftSection={<IconUsersGroup />}
            >
              <Text>5 accounts</Text>
            </Button>

            <Button radius="md">Add account</Button>
          </Flex>
        }
      />

      <Flex w="100%" direction="column" gap={10} pb={10}>
        <Card withBorder={false} radius="sm">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={10}>
              <IconCalendar />

              <Text fw={500} size="lg">
                Notifications
              </Text>
            </Flex>
          </Flex>

          {/*  */}
          <Card withBorder={true} mt={10} radius="sm" p={10}>
            <Flex direction="column" gap={0}>
              <Text size="md" fw={700}>
                Complete your setup
              </Text>

              <Text c="dimmed" mb={5} size="sm">
                Add your knowledge base and connect social media accounts to
                start generating content.
              </Text>

              <Progress value={12} />

              <Flex gap={10} mt={10}>
                {[...Array(4)].map(() => (
                  <Card p={10} withBorder={true}>
                    <Flex gap={10} align="center">
                      <Avatar radius="md">
                        <IconCheck />
                      </Avatar>

                      <Flex direction="column">
                        <Text size="sm" fw={700}>
                          Link your social profiles
                        </Text>

                        <Text c="dimmed" size="sm">
                          Link your social profiles
                        </Text>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            </Flex>
          </Card>

          <Card withBorder={true} mt={10} radius="sm" p={10}>
            <Flex direction="column">
              <Text fw={700}>Next week publications status</Text>

              <Text c="dimmed" size="sm">
                Scheduled (Email sent)
              </Text>
            </Flex>
          </Card>
          {/*  */}
        </Card>

        <Flex gap={10} align="start">
          <CardWeekPublication />

          <Card
            withBorder={false}
            radius="sm"
            style={{
              minWidth: "300px",
            }}
          >
            <Flex direction="column">
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={10}>
                  <IconCalendar />

                  <Text fw={500} size="lg">
                    Week summary
                  </Text>
                </Flex>
              </Flex>

              <Flex direction="column" gap={10} my={20}>
                <WeekSummary label="Publication" value="145%" />

                <WeekSummary label="Egagement ratee" value="145%" />

                <WeekSummary label="Likes overange" value="124 per publication" />

                <WeekSummary label="Best platform" value="Facebook" />
              </Flex>
            </Flex>
          </Card>
        </Flex>

        <CardWeekStrategy />
      </Flex>
    </PageTemplate>
  );
}

const WeekSummary:FC<{label: string; value: string;}> = ({label, value}) => {
  return (
    <Flex justify="space-between" align="start">
      <Flex direction="column">
        <Text size="sm" fw={700}>
          {label}
        </Text>

        <Text size="sm">{value}</Text>
      </Flex>

      <Avatar radius="sm" size="sm">
        <IconThumbUp size="16px" />
      </Avatar>
    </Flex>
  );
};
