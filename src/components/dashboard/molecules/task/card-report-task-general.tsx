import { useTaskReport } from "@/api/dashboard/task.api";
import { Card, Flex, Progress, Text } from "@mantine/core";

export const CardReportTaskGeneral = () => {
  const { data } = useTaskReport();

  console.log("soisjioasdjasoidjioa", data);

  if (!data) return null;

  return (
    <Card shadow="sm" padding="lg" flex={1}>
      <Text mb={16}>General view</Text>

      <Flex direction="column" gap={10}>
        {data.map((status) => (
        //   <Card>
            <Flex gap={20}>
              <Text
                w={200}
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {status.status}
              </Text>

              <Flex gap={50} w="100%">
                <Flex w="100%" align="center" gap={20}>
                  <Progress flex={1} value={80} />

                  <Text>{status.total_minutes} minutes</Text>
                </Flex>

                <Flex w="100%" align="center" gap={20}>
                  <Progress flex={1} value={80} />

                  <Text>{status.count} tasks</Text>
                </Flex>
              </Flex>
            </Flex>
        //   </Card>
        ))}
      </Flex>
    </Card>
  );
};
