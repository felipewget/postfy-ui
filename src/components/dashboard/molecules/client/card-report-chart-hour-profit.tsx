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
  Tooltip,
} from "@mantine/core";
import { useReportProjectByClients } from "@/api/dashboard/project.api";
import { useDebouncedState } from "@mantine/hooks";
import { useGetHourProfitByClient } from "@/api/dashboard/client.api";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";

export const CardReportChartClientHourProfitByClient: FC<{}> = () => {
  const [search, setSearch] = useDebouncedState("", 300);

  const { data } = useGetHourProfitByClient({ search });

  const projectByClients = data?.pages.flat() ?? [];
  console.log(projectByClients);
  if (!projectByClients) return null;
  
  return (
    <Paper p="md" radius="md" withBorder>
      <Text size="sm" fw={600} mb="sm">
        Hours & Profit by Client
      </Text>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={projectByClients.map((client) => {
            return {
              client: client.client_name,
              planned: client.planned,
              current: client.actual,
              budget: client.budget,
            };
          })}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="client" />
          <YAxis />
          <Tooltip children={undefined} label={undefined} />
          <Legend />
          <Bar dataKey="planned" fill="#8c3de6ff" />
          <Bar dataKey="current" fill="#4a005cff" />
          <Bar dataKey="budget" fill="#9d5badff" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
