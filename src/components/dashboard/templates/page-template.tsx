"use client";

import { Flex } from "@mantine/core";
import { FC, ReactNode } from "react";

type PAGETemplateProps = {
  children: ReactNode;
  maxWidth?: string;
};

export const PageTemplate: FC<PAGETemplateProps> = ({
  children,
  maxWidth = "1300px",
}) => (
  <Flex p={20} direction="column" w="100%" style={{ maxWidth }}>
    {children}
  </Flex>
);
