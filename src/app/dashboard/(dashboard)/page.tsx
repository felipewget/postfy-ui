"use client";

import { Datepicker } from "@/components/dashboard/atoms/datepicker";
import { ButtonFormTask } from "@/components/dashboard/molecules/button-form-task";
import { BoardTodo } from "@/components/dashboard/organisms/board-todo";
import { Button, Flex, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

export default function Home() {
  return (
    <Flex direction="column" w="100%">
      <>
        <Flex justify="space-between" px={40} py={25}>
          <Datepicker />

          <Flex gap={15}>
            <IconEye />
          </Flex>
        </Flex>

        <Flex px={40}>
          <BoardTodo />
        </Flex>

        <Flex justify="end" px={40} py={10}>
          <Text>Done: 12 hours | Todo: 12 hours</Text>
        </Flex>
      </>
    </Flex>
  );
}
