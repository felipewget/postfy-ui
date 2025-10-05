"use client";

import { Avatar, Box, Flex, Paper, Text } from "@mantine/core";
import { IconContract } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { Header } from "../organisms/header";

type ListTemplateProps = {
  header: {
    icon: ReactNode;
    title: string;
    description?: string;
    button?: ReactNode;
  };
  listType?: "grid" | "row";
  searchPanel?: ReactNode;
  cards: ReactNode[];
  noContentBlock?: ReactNode;
};

export const ListTemplate: FC<ListTemplateProps> = ({
  header,
  searchPanel,
  cards,
  listType = "grid",
  noContentBlock,
}) => (
  <Flex
    p={20}
    direction="column"
    w="100%"
    style={{
      maxWidth: "1300px",
    }}
  >
    <Header {...header} />

    {searchPanel && (
      <Box
        py={5}
        mb={5}
        pos="sticky"
        top="10px"
        style={{
          zIndex: 1,
        }}
      >
        {searchPanel}
      </Box>
    )}

    {listType === "grid" && (
      <Flex w="100%" wrap="wrap" gap={10}>
        {cards.map((card) => (
          <Flex w={{ base: "100%", md: "calc(50% - 5px)" }}>{card}</Flex>
        ))}
      </Flex>
    )}

    {listType === "row" && (
      <Flex w="100%" direction="column" gap={10}>
        {cards.map((card) => (
          <Flex w="100%">{card}</Flex>
        ))}
      </Flex>
    )}

    {cards.length === 0 && (noContentBlock ?? "")}
  </Flex>
);
