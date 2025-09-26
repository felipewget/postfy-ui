"use client";

import * as React from "react";
import { FC, useEffect } from "react";
import { DateTimePickerProps, DateTimePicker } from "@mantine/dates";
import { useFormContext } from "react-hook-form";

type SchedulerInputProps = DateTimePickerProps & {};

export const SchedulerInput: FC<SchedulerInputProps> = ({
  name,
  defaultValue,
}) => {
  const form = useFormContext();

  const [value, setValue] = React.useState<Date | null>(defaultValue ?? null);

  useEffect(() => {
    if (name) {
      form.setValue(name, value);
    }
  }, [value]);

  return (
    <DateTimePicker
      w="200px"
      valueFormat="DD/MM/YYYY HH:mm"
      radius="md"
      placeholder="Schedule this publication"
      value={value}
      onChange={setValue}
      minDate={new Date()}
    />
  );
};
