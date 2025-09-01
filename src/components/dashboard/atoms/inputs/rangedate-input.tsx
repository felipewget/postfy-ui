"use client"

import { FC, useEffect, useState } from 'react';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { useFormContext } from 'react-hook-form';

export const RangeDate: FC<DatePickerProps & { name?: string }> = ({ name }) => {
    const form = useFormContext();

    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

    useEffect(() => {
        if (!name) return;

        if (value[0] && value[1]) {
            form.setValue(name, value)
        } else {
            form.setValue(name, undefined)
        }
    }, [value])

    return <DatePicker type="range" value={value} onChange={setValue} />;
}