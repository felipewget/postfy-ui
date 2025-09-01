"use client"

import * as React from 'react';
import { FC, useEffect } from 'react';
import { Button, Flex, Group, TextInput, Paper, ActionIcon, Text } from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useListState } from '@mantine/hooks';
import { useFormContext } from 'react-hook-form';

type ListInputProps = {
    name: string;
};

export const ListInput: FC<ListInputProps> = ({ name }) => {
    const form = useFormContext();

    const [task, setTask] = useState('');
    const [items, handlers] = useListState<{ id: string; text: string }>([]);

    const addTask = () => {
        if (!task.trim()) return;

        handlers.append({ id: crypto.randomUUID(), text: task.trim() });

        setTask('');
    };

    useEffect(() => {
        if (!name) return;

        form.setValue(name, items)
    }, [items])

    return (
        <Paper>
            <Flex direction="column" gap="md">
                <Group>
                    <TextInput
                        placeholder="Add task"
                        value={task}
                        onChange={(e) => setTask(e.currentTarget.value)}
                        style={{ flex: 1 }}
                    />
                    <Button onClick={addTask}>Add</Button>
                </Group>

                {items.map((item, index) => (
                    <Paper key={item.id} withBorder p="sm">
                        <Group justify="space-between">
                            <Text>{item.text}</Text>
                            <Group gap={4}>
                                <ActionIcon
                                    variant="light"
                                    disabled={index === 0}
                                    onClick={() => handlers.reorder({ from: index, to: index - 1 })}
                                >
                                    <IconArrowUp size={16} />
                                </ActionIcon>
                                <ActionIcon
                                    variant="light"
                                    disabled={index === items.length - 1}
                                    onClick={() => handlers.reorder({ from: index, to: index + 1 })}
                                >
                                    <IconArrowDown size={16} />
                                </ActionIcon>
                                <ActionIcon
                                    variant="light"
                                    color="red"
                                    onClick={() => handlers.remove(index)}
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Paper>
                ))}
            </Flex>
        </Paper>
    );
};