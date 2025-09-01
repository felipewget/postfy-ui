"use client"

import { Avatar, Button, Flex, Image, Input, Text } from '@mantine/core';
import * as React from 'react';
import { FC, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

type CoverProps = {
    name: string;
    title: string;
    defaultValue?: string;
};

export const Cover: FC<CoverProps> = ({ title, name, defaultValue }) => {
    const form = useFormContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const file = form.watch(name);

    const handleCancel = () => {
        form.setValue(name, null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        if (!selectedFile.type.startsWith('image/')) {
            alert('Please select a valid image file');
            form.setValue(name, undefined);
            return;
        }

        form.setValue(name, selectedFile);
    };

    const imageUrl = file instanceof File ? URL.createObjectURL(file) : null;
    const selectedImage = file instanceof File;

    return (
        <Flex direction="column" gap={5}>
            <Flex gap={20} direction="column">
                <Text component="label" size="sm" fw="bold" w={150} py={5}>
                    {title}
                </Text>


                {/* <Text component="label" size="sm" fw={500}>{title}</Text> */}

                <Flex gap={10} align="center" h={150}>
                    {selectedImage || defaultValue
                        ? <Image src={imageUrl ?? defaultValue} w={150} h={150} radius="md" style={{
                            minWidth: "150px",
                            oveflow: "hidden"
                        }} bg="white" />
                        : <Avatar size={150} radius="md" />
                    }

                    <Flex direction="column" gap={5} align="start">
                        <Button onClick={triggerFileInput}>Update image</Button>

                        {file && (
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                        )}

                        <Text>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</Text>
                    </Flex>

                    <Input
                        ref={inputRef}
                        display="none"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </Flex>

                {/* {errors.file && (
                <Text size="xs" c="red">
                    {(errors.file as any)?.message}
                </Text>
            )} */}
            </Flex>
        </Flex>
    )
};