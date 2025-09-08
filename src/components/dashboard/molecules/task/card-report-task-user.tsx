import { useTaskReport, useTaskReportByUser } from "@/api/dashboard/task.api";
import { Task } from "@/declarators";
import {
  Button,
  Card,
  Collapse,
  Divider,
  Flex,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { groupBy } from "lodash";

export const CardReportTaskUser = () => {
  const statuses: Task["status"][] = ["to do", "doing", "done"];

  const rowHeight = 50;
  const [opened, { toggle }] = useDisclosure(false);

  const { data } = useTaskReportByUser();

  console.log("data user", data);

  if (!data) return null;

  const users = data?.pages.flat() ?? [];

  const groupedUsers = groupBy(users, "assignedTo");

  return (
    <Card shadow="sm" padding="lg" flex={1}>
      <Flex justify="space-between" align="center">
        <Text fw={500}>Tasks per team member</Text>
        <Button size="xs" variant="light" onClick={toggle}>
          {opened ? "Collapse" : "Expand"}
        </Button>
      </Flex>

      <Collapse in={opened}>
        <Stack spacing="md" mt={16}>
          {Object.keys(groupedUsers).map((key) => {
            const memberRecords = groupedUsers[key];

            const todo = memberRecords.find(
              (record) => record.status === "todo"
            );
            const inProgress = memberRecords.find(
              (record) => record.status === "in_progress"
            );
            const done = memberRecords.find(
              (record) => record.status === "done"
            );

            const totalTasks =
              Number(todo?.count ?? 0) +
              Number(inProgress?.count ?? 0) +
              Number(done?.count ?? 0);
            const totalMinutes =
              Number(todo?.total_minutes ?? 0) +
              Number(inProgress?.total_minutes ?? 0) +
              Number(done?.total_minutes ?? 0);
          
            return (
              <Card key={key}>
                <Text fw={500}>{memberRecords[0].user_name}</Text>

                <Flex w="100%" mt={4} gap={10}>
                  <Flex direction="column" flex={1}>
                    <Text size="sm">To do</Text>

                    <Progress value={totalMinutes > 0 ? ((100 / totalMinutes) * Number(todo?.total_minutes ?? 0)) : 0} color="#CCC" radius="xl" />

                    <Text size="xs">
                      {todo?.count ?? 0} tasks / {todo?.total_minutes ?? 0}{" "}
                      minutes
                    </Text>
                  </Flex>

                  <Flex direction="column" flex={1}>
                    <Text size="sm">In progress</Text>

                    <Progress value={totalMinutes > 0 ? ((100 / totalMinutes) * Number(inProgress?.total_minutes ?? 0)) : 0} color="#ffe066" radius="xl" />

                    <Text size="xs">
                      {inProgress?.count ?? 0} tasks /{" "}
                      {inProgress?.total_minutes ?? 0} minutes
                    </Text>
                  </Flex>

                  <Flex direction="column" flex={1}>
                    <Text size="sm">Done</Text>

                    <Progress value={totalMinutes > 0 ? ((100 / totalMinutes) * Number(done?.total_minutes ?? 0)) : 0} color="#69db7c" radius="xl" />

                    <Text size="xs">
                      {done?.count ?? 0} tasks / {done?.total_minutes ?? 0}{" "}
                      minutes
                    </Text>
                  </Flex>
                </Flex>

                <Divider my={10} />

                <Text size="sm" mt={2}>
                  Totak tasks: {totalTasks} / Total in minutes: {totalMinutes}
                </Text>
              </Card>
            );
          })}
        </Stack>
      </Collapse>
    </Card>
  );
};
