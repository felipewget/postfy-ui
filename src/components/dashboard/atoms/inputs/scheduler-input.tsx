"use client"

import * as React from 'react';
import { FC, useEffect } from 'react';
import { DateTimePickerProps, DateTimePicker } from '@mantine/dates';
import { useFormContext } from 'react-hook-form';

type SchedulerInputProps = DateTimePickerProps & {};

export const SchedulerInput: FC<SchedulerInputProps> = ({ name, defaultValue }) => {
    const form = useFormContext();

    const [value, setValue] = React.useState<Date | null>(defaultValue ?? null);

    useEffect(() => {
        if (name) {
            form.setValue(name, value)
        }
    }, [value])

    return (
        <DateTimePicker
            label="Pick date"
            placeholder="Pick date"
            value={value}
            onChange={setValue}
            minDate={new Date()}
        />
    );
};