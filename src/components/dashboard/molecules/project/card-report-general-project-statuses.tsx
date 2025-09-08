import { Card, Flex, Progress, Text } from "@mantine/core";
import { FC } from "react";
import { useGeneralStatusesReport } from "@/api/dashboard/project.api";

export const CardReportGeneralProjectStatuses: FC<{}> = () => {
  const { data } = useGeneralStatusesReport();

  if(!data) return null;

  return (
    <Card shadow="sm" padding="lg" flex={1}>
      <Text mb={16}>General view</Text>

      <Flex direction="column" gap={10}>
        <Flex gap={20}>
          <Text
            w={180}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Projects done ({data.tasks_done})
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
            Project In progress ({data.tasks_in_progress})
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
            Projects to Do ({data.tasks_done})
          </Text>

          <Flex w="100%" align="center" gap={20}>
            <Progress flex={1} value={80} />

            <Text>85%</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
