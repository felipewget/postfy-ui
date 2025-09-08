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
} from "@mantine/core";
import { useReportProjectByClients } from "@/api/dashboard/project.api";
import { useDebouncedState } from "@mantine/hooks";

export const CardReportProjectsByClient: FC<{}> = () => {
  const [search, setSearch] = useDebouncedState("", 300);

  const { data } = useReportProjectByClients({ search });

  const projectByClients = data?.pages.flat() ?? [];

  return (
    <Paper p="md" radius="md" withBorder w="100%">
      <Group justify="space-between" mb="sm">
        <Text size="sm" fw={600}>
          Projects by Client
        </Text>

        <SegmentedControl
          size="xs"
          data={[
            { label: "Todos", value: "all" },
            { label: "Ativos", value: "active" },
            { label: "Inativos", value: "inactive" },
          ]}
        />
      </Group>

      <Input leftSection={<IconSearch size={14} />} mb={10} onChange={(e) => setSearch(e.currentTarget.value)} />

      <Stack gap="xs">
        {projectByClients.map((record) => (
          <Group
            justify="space-between"
            bg="gray.1"
            p={10}
            style={{
              borderRadius: "5px",
            }}
          >
            <Text size="sm">{record.client_name}</Text>

            <Badge color="blue" variant="light">
              {record.project_count}{" "}
              {record.project_count > 1 ? "projects" : "project"}
            </Badge>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};
