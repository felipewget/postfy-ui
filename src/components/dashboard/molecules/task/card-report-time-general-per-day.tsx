import { useTimeAllTeamReport } from "@/api/dashboard/task.api";
import {
  Card,
  Flex,
  Input,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { IconFilterFilled, IconSearch } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const CardReportTimeGeneralPerDay = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data } = useTimeAllTeamReport();

  const days = data?.pages.flat() ?? [];

  // transforma os dados vindos da API em um formato que o Recharts entende
  const chartData = useMemo(() => {
    if (!days) return [];

    return days.map((d: any) => ({
      day: new Date(d.day).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      done: Number(d.done_minutes),
      in_progress: Number(d.in_progress_minutes),
      todo: Number(d.todo_minutes),
    }));
  }, [days]);

  return (
    <Card w="100%">
      <Flex flex={1} direction="column" gap={20}>
        <Flex w="100%" direction="column">
          <Text fw={500} mb="sm">
            Team task time
          </Text>
        </Flex>
      </Flex>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="done" stroke="#4caf50" name="Done" />
          <Line
            type="monotone"
            dataKey="in_progress"
            stroke="#ff9800"
            name="In Progress"
          />
          <Line type="monotone" dataKey="todo" stroke="#f44336" name="Todo" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
