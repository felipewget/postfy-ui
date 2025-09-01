"use client"

import { NativeSelect, NativeSelectProps, TextInput, TextInputProps } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const data = [
    { value: 'aud', label: '🇦🇺 AUD' },
    { value: 'usd', label: '🇺🇸 USD' },
    { value: 'eur', label: '🇪🇺 EUR' },
    { value: 'cad', label: '🇨🇦 CAD' },
    { value: 'gbp', label: '🇬🇧 GBP' },
];

type Exchange = 'eur' | 'usd' | 'cad' | 'gbp' | 'aud'

type PriceInputProps = TextInputProps & {
    exchanges?: Exchange[];
    exchangeProps: NativeSelectProps;
};

export const PriceInput: FC<PriceInputProps> = ({ exchanges = ['aud', 'eur', 'usd', 'cad', 'gbp'], exchangeProps, name, ...props }) => {
    const form = useFormContext();

    const filteredDate = data.filter((option) => exchanges.includes(option.value))

    const [value, setValue] = useState<number>(0);
    const [exchange, setExchange] = useState<Exchange>(filteredDate[0].value);

    useEffect(() => {
        if (!name) return;

        form.setValue(name, value);
    }, [value]);

    useEffect(() => {
        if (!exchangeProps?.name) return;

        form.setValue(exchangeProps?.name, exchange);
    }, [exchange]);

    const select = (
        <NativeSelect
            data={filteredDate}
            rightSectionWidth={28}
            onChange={(e) => setExchange(e.currentTarget.value)}
            styles={{
                input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    width: 92,
                    marginRight: -2,
                },
            }}
            {...exchangeProps}
        />
    );

    return (
        <TextInput
            type="number"
            placeholder="1000"
            label="Transfer amount"
            rightSection={select}
            rightSectionWidth={92}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            {...props}
        />
    );
};