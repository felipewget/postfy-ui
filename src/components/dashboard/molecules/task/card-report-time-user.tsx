import {
  useTimeUsersTeamReport,
} from "@/api/dashboard/task.api";
import {
  Avatar,
  Card,
  Flex,
  Input,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export const CardReportTimeUser = () => {
  const { data } = useTimeUsersTeamReport();

  const users = data?.pages.flat() ?? [];

  return (
    <Card w="100%">
      <Flex flex={1} direction="column" gap={20}>
        <Flex w="100%" direction="column">
          <Text fw={500} mb="sm">
            Details by team member
          </Text>

          <Input leftSection={<IconSearch size="16px" />} />
        </Flex>

        <Flex w="100%" wrap="wrap" gap={10}>
          {users.map((user) => (
            <Flex w="calc(50% - 5px)">
              <CardReportMember user={user} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

const CardReportMember = ({ user }) => (
  <Card w="100%">
    <Flex gap={0} direction="column">
      <Flex justify="start" align="center" gap={10} mb={10}>
        <Avatar radius="md">FO</Avatar>

        <Flex w="100%" gap={10} align="center">
          <Text fw={700}>{user.user_name}</Text>

          <Text size="sm">(Productivity per time: 124%)</Text>
        </Flex>
      </Flex>

      <Flex gap={20}>
        <Flex gap={10} align="center" w="50%">
          <Text
            fw={500}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Planned
          </Text>

          <Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {Number(user.todo_minutes) + Number(user.in_progress_minutes) + Number(user.done_minutes)} minutes
          </Text>
        </Flex>

        <Flex gap={10} align="center" w="50%">
          <Text
            fw={500}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Done
          </Text>

          <Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {Number(user.done_minutes)} minutes
          </Text>
        </Flex>

        <Flex gap={10} align="center" w="50%">
          <Text
            fw={500}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Productivity
          </Text>

          <Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            123%
          </Text>
        </Flex>
      </Flex>
    </Flex>
  </Card>
);
