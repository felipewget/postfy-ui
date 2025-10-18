import { useListApprovedPublications } from "@/apis/publications.api";
import {
  Card,
  Flex,
  Select,
  SegmentedControl,
  Button,
  Text,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { FC, useState } from "react";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import { NoContentBlock } from "../no-content-block";
import { PublicationScheduleCard } from "./publication-schedule-card";
import { useMediaQuery } from "@mantine/hooks";

export const CardWeekPublication: FC<{}> = ({}) => {
  const { selectedAccount } = useDashboardContext();

  const collapsed = useMediaQuery(`(max-width: 800px)`);

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const day = moment()
      .startOf("week")
      .add(i + 1, "days"); // segunda a domingo
    return {
      label: `${day.format("ddd")}`,
      value: day.format("YYYY/MM/DD"),
    };
  });

  const today = moment().format("YYYY/MM/DD");

  const [date, setDate] = useState(today);

  const { data, hasNextPage } = useListApprovedPublications({
    accountId: selectedAccount?.id ?? 0,
    params: {
      filters: {
        date,
      },
    },
  });

  const approvedPublications = data?.pages.flat() ?? [];

  return (
    <Card flex={1} withBorder={false} radius="sm" w="100%">
      <Flex direction="column" gap={20}>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={10}>
            <IconCalendar />

            <Text fw={500} size="lg">
              Week pulications
            </Text>
          </Flex>

          <Select placeholder="All platforms" data={[]} radius="sm" />
        </Flex>

        {!collapsed && (
          <SegmentedControl
            value={date}
            onChange={setDate}
            data={weekDays}
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
  );
};
