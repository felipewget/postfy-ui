import { Button, Card, Divider, Flex, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";

type CalendarFilterParams = {
  onChange: (day: Date | null) => void;
};

export const CalendarFilter: FC<CalendarFilterParams> = ({ onChange }) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Card withBorder={false} w="100%" shadow="none" bg="transparent" p={0}>
      <Text fw={500} size="lg">
        Filter by Date
      </Text>

      <Flex mt={20} w="100%" justify="center">
        <DatePicker
          value={value}
          onChange={(v) => {
            setValue(v);

            onChange(v);
          }}
        />
      </Flex>

      <Flex mt={20} w="100%">
        <Button
          radius="md"
          fullWidth
          disabled={!value}
          onClick={() => {
            setValue(null);

            onChange(null);
          }}
        >
          Clear filter
        </Button>
      </Flex>
    </Card>
  );
};
