"use client"

import { FC, useEffect, useState } from 'react';
import { Autocomplete, AutocompleteProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

type AutocompleteInput = AutocompleteProps & {
    sufixOptions: string[];
    defaultValue?: string;
}

export const AutocompleteInput: FC<AutocompleteInput> = ({ sufixOptions, defaultValue, ...props }) => {
    const form = useFormContext();
    console.log('defaultValuedefaultValue', defaultValue)
    const [value, setValue] = useState(defaultValue ?? '');
    const [data, setData] = useState<string[]>([]);

    const handleChange = (val: string) => {
        setValue(val);
        setData([]);

        if (val.trim().length === 0 || val.includes('@')) {
            return;
        }

        setData(sufixOptions.map((provider) => `${val}@${provider}`));
    };

    useEffect(() => {
        if (props.name) {
            form?.setValue(props.name, value)
        }
    }, [value])

    return <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        {...props}
    />
}