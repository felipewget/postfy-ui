import { IconSearch } from "@tabler/icons-react";
import { FC } from "react";
import { Client } from "@/declarators";
import { useQueryClient } from "@tanstack/react-query";
import {
  Paper,
  Group,
  SegmentedControl,
  Input,
  Stack,
  Badge,
  Flex,
  Text,
  Progress,
} from "@mantine/core";
import { useReportProjectByClients } from "@/api/dashboard/project.api";
import { useDebouncedState } from "@mantine/hooks";
import { useGetHourProfitByClient } from "@/api/dashboard/client.api";

export const CardReportClientHourProfitByClient: FC<{}> = () => {
  const [search, setSearch] = useDebouncedState("", 300);

  const { data } = useGetHourProfitByClient({ search });

  const projectByClients = data?.pages.flat() ?? [];

  return (
    <Paper p="md" radius="md" withBorder>
      <Text size="sm" fw={600} mb="sm">
        Avg Planned vs Actual Time
      </Text>

      <Flex direction="column" gap={10}>
        {projectByClients.map((client) => (
          <Flex direction="column">
            <Text>{client.client_name}</Text>

            <Text size="xs" c="dimmed" mb="xs">
              Planned: {client.planned} | Actual: {client.actual}
            </Text>
            <Progress
              value={
                client.planned > 0
                  ? (100 / client.planned) * client.actual
                  : 100
              }
              color="violet"
            />
          </Flex>
        ))}
      </Flex>
    </Paper>
  );
};
