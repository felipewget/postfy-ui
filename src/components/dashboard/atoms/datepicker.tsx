"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { Flex, Text, Button, Popover, Paper } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const presets = [
//   { label: "Yesterday", value: dayjs().subtract(1, "day") },
  { label: "Today", value: dayjs() },
//   { label: "Tomorrow", value: dayjs().add(1, "day") },
];

export const Datepicker = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [opened, setOpened] = useState(false);

  const prevDay = () => setCurrentDate(currentDate.subtract(1, "day"));
  const nextDay = () => setCurrentDate(currentDate.add(1, "day"));
  const selectPreset = (date: dayjs.Dayjs) => setCurrentDate(date);

  return (
    <Flex  align="center" gap="sm">
      {/* Navegação com setas e calendário */}
      <Flex align="center" gap="md">
        <Button variant="light" size="xs" onClick={prevDay}>
          {"<"}
        </Button>

        <Popover opened={opened} onClose={() => setOpened(false)} position="bottom" withArrow>
          <Popover.Target>
            <Button
              variant="light"
              size="xs"
              onClick={() => setOpened((o) => !o)}
            >
              {currentDate.format("DD [of] MMM, YYYY")}
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Paper p="sm">
              <DatePicker
                value={currentDate.toDate()}
                onChange={(date) => {
                  if (date) setCurrentDate(dayjs(date));
                  setOpened(false);
                }}
              />
            </Paper>
          </Popover.Dropdown>
        </Popover>

        <Button variant="light" size="xs" onClick={nextDay}>
          {">"}
        </Button>
      </Flex>

      {/* Presets rápidos */}
      <Flex gap="sm">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant={currentDate.isSame(preset.value, "day") ? "filled" : "outline"}
            size="xs"
            onClick={() => selectPreset(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};