"use client";

import { Avatar, Flex, Paper, Text } from "@mantine/core";
import { IconContract } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

type ListTemplateProps = {
  header: {
    icon: ReactNode;
    title: string;
    description?: string;
    button?: ReactNode;
  };
  searchPanel?: ReactNode;
  cards: ReactNode[];
};

export const ListTemplate: FC<ListTemplateProps> = ({
  header,
  searchPanel,
  cards,
}) => (
  <Flex
    p={20}
    direction="column"
    w="100%"
    style={{
      maxWidth: "1300px",
    }}
  >
    <Flex w="100%" justify="space-between" align="center" pb={20} pt={10}>
      <Flex gap={20}>
        <Avatar size="lg">
          {header.icon}
        </Avatar>

        <Flex direction="column">
          <Text size="2xl" fw={500}>
            {header.title}
          </Text>

          {header?.description && <Text>{header.description}</Text>}
        </Flex>
      </Flex>

      {header?.button ?? ""}
    </Flex>

    {searchPanel && (
      <Paper
        p={4}
        mb={10}
        pos="sticky"
        top="10px"
        style={{
          zIndex: 1,
        }}
        withBorder={false}
      >
        {searchPanel}
      </Paper>
    )}

    <Flex w="100%" wrap="wrap" gap={10}>
      {cards.map((card) => (
        <Flex w={{ base: "100%", md: "calc(50% - 5px)" }}>{card}</Flex>
      ))}
    </Flex>
  </Flex>
);
