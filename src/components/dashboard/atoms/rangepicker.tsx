"use client";

import { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { Flex, Button, Popover, Paper } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

dayjs.extend(isoWeek);

const presets = [
  { label: "This week", value: dayjs() },
  { label: "Next week", value: dayjs().add(1, "week") },
];

export const Rangepicker = () => {
  // agora usamos um range de datas livre
  const [range, setRange] = useState<[Date | null, Date | null]>([
    dayjs().startOf("week").toDate(),
    dayjs().endOf("week").toDate(),
  ]);
  const [opened, setOpened] = useState(false);

  const prevWeek = () =>
    setRange([
      dayjs(range[0]).subtract(1, "week").toDate(),
      dayjs(range[1]).subtract(1, "week").toDate(),
    ]);

  const nextWeek = () =>
    setRange([
      dayjs(range[0]).add(1, "week").toDate(),
      dayjs(range[1]).add(1, "week").toDate(),
    ]);

  return (
    <Flex align="center" gap="sm">
      {/* Navegação */}
      <Flex align="center" gap="md">
        <Button variant="light" size="xs" onClick={prevWeek}>
          {"<"}
        </Button>

        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom"
          withArrow
        >
          <Popover.Target>
            <Button
              variant="light"
              size="xs"
              onClick={() => setOpened((o) => !o)}
            >
              {range[0]
                ? `${dayjs(range[0]).format("MMM D")} – ${
                    range[1] ? dayjs(range[1]).format("MMM D") : "..."
                  }`
                : "Select range"}
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Paper p="sm">
              <DatePicker
                type="range" // 🔹 importante
                value={range}
                onChange={(newRange) => {
                  setRange(newRange);
                  setOpened(false);
                }}
              />
            </Paper>
          </Popover.Dropdown>
        </Popover>

        <Button variant="light" size="xs" onClick={nextWeek}>
          {">"}
        </Button>
      </Flex>

      {/* Presets rápidos */}
      <Flex gap="sm">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant={
              dayjs(range[0]).isSame(preset.value.startOf("week"), "day")
                ? "filled"
                : "outline"
            }
            size="xs"
            onClick={() =>
              setRange([
                preset.value.startOf("week").toDate(),
                preset.value.endOf("week").toDate(),
              ])
            }
          >
            {preset.label}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};