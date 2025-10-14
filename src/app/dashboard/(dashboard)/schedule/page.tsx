"use client";

import { useListApprovedPublications } from "@/apis/publications.api";
import { CalendarFilter } from "@/components/dashboard/atoms/inputs/calendar-filter";
import { NoContentBlock } from "@/components/dashboard/molecules/no-content-block";
import { PublicationScheduleCard } from "@/components/dashboard/molecules/publication/publication-schedule-card";
import { Header } from "@/components/dashboard/organisms/header";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  SegmentedControl,
  Select,
  Text,
} from "@mantine/core";
import { IconCalendar, IconClock, IconUsersGroup } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

export default function Schedule() {
  const { selectedAccount } = useDashboardContext();
  const [step, setStep] = useState("upcoming");
  const [date, setDate] = useState();

  const { data, hasNextPage } = useListApprovedPublications({
    accountId: selectedAccount?.id ?? 0,
    params: {
      filters: {
        step,
        date,
      },
    },
  });

  const approvedPublications = data?.pages.flat() ?? [];

  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Publications schedule"
        description="Manage your clients, link them with projects base knowledgment"
        button={
          <Flex gap={10}>
            <Link href="/publications/create">
              <Button size="xs" radius="sm" variant="light">
                Create publication
              </Button>
            </Link>

            <Link href="/campaings">
              <Button size="xs" radius="sm">
                Manage campaigns
              </Button>
            </Link>
          </Flex>
        }
      />

      <Flex my={20} gap={20} align="start">
        <Card flex={1} withBorder={false} radius="sm">
          <Flex direction="column" gap={20}>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={10}>
                <IconCalendar />

                <Text fw={500} size="lg">
                  Pulications calendar
                </Text>
              </Flex>

              <Select placeholder="All platforms" data={[]} radius="sm" />
            </Flex>

            {date && (
              <Flex w="100%">
                <Card
                  radius="sm"
                  withBorder={false}
                  p={10}
                  flex={1}
                  bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))"
                >
                  <Flex gap={20} align="center" justify="center">
                    <Text fw={500} size="sm">
                      Selected date: {moment(date).format("D [of] MMM, YYYY")}
                    </Text>
                  </Flex>
                </Card>
              </Flex>
            )}

            {!date && (
              <SegmentedControl
                value={step}
                onChange={setStep}
                data={[
                  { label: "Upcoming", value: "upcoming" },
                  { label: "Published", value: "published" },
                  { label: "Failed", value: "failed" },
                ]}
                radius="md"
                size="sm"
                fullWidth={false}
                styles={(theme) => ({
                  control: {
                    border: "none",
                  },
                })}
              />
            )}

            {approvedPublications.map((publication) => (
              <PublicationScheduleCard publication={publication} />
            ))}

            {hasNextPage && (
              <Flex w="100%" justify="center" my={10}>
                <Button>Load more publications</Button>
              </Flex>
            )}

            {approvedPublications.length === 0 && (
              <NoContentBlock
                image="/images/calendar.svg"
                title="No publications"
                description="Crete a custom new publication or program a campaign to create your publications automatically"
                footer={
                  <Flex gap={10}>
                    <Link href="/publications/create">
                      <Button radius="sm" size="xs" variant="light">
                        Create publication
                      </Button>
                    </Link>

                    <Link href="/campaings">
                      <Button radius="sm" size="xs">
                        Manage campaigns
                      </Button>
                    </Link>
                  </Flex>
                }
              />
            )}
          </Flex>
        </Card>

        <Card
          withBorder={false}
          shadow="none"
          bg="transparent"
          p={0}
          w="300px"
          style={{
            minWidth: "300px",
          }}
        >
          <CalendarFilter
            onChange={(date) =>
              setDate(date ? moment(date).format("YYYY-MM-DD") : null)
            }
          />

          <Card my={20} withBorder={false} shadow="none" radius="sm" p={20}>
            <Text fw={500}>Connected social profiles</Text>

            <Text size="sm" c="dimmed">
              No platform connected yet
            </Text>

            <Flex mt={10} w="100%">
              <Button radius="sm" fullWidth variant="light" size="xs">
                Manage social profiles
              </Button>
            </Flex>

            <Flex direction="column" gap={10} w="100%">
              <Divider mt={10} />

              {[...Array(3)].map(() => (
                <Flex gap={10} align="center">
                  <Image src="#" w={25} h={25} />

                  <Flex direction="column">
                    <Text fw={500} size="sm">
                      {"profile.profileTitle"}
                    </Text>

                    <Text size="xs">{"profile.channel"}</Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Card>
        </Card>
      </Flex>
    </PageTemplate>
  );
}
