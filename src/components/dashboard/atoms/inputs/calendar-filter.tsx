import { Button, Card, Divider, Flex, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import dayjs from "dayjs";

export const CalendarFilter = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Card withBorder={false} w="100%" shadow="none" bg="transparent" p={0}>
      <Text fw={500} size="lg">Filter by Date</Text>

      <Flex mt={20} w="100%" justify="center">
        <DatePicker value={value} onChange={setValue} />
      </Flex>

      <Flex mt={20} w="100%">
        <Button
          radius="md"
          fullWidth
          disabled={!value}
          onClick={() => {
            setValue(null);
          }}
        >
          Clear filter
        </Button>
      </Flex>
    </Card>
  );
};
