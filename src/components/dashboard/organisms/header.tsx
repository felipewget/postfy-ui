import { Flex, Avatar, Text } from "@mantine/core";
import { FC, ReactNode } from "react";

type Header = {
  icon: ReactNode;
  title: string;
  description?: string;
  button?: ReactNode;
};

export const Header:FC<Header> = ({icon, title, description, button}) => (
  <Flex w="100%" justify="space-between" align="center" pb={10} pt={10}>
    <Flex gap={20}>
      <Avatar size="lg" radius="sm">
        {icon}
      </Avatar>

      <Flex direction="column">
        <Text size="2xl" fw={800}>
          {title}
        </Text>

        {description && (
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        )}
      </Flex>
    </Flex>

    {button ?? ""}
  </Flex>
);
