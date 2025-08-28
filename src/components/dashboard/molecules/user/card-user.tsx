"use client";

import {
  Avatar,
  Badge,
  Divider,
  Flex,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import { IconDots, IconEdit, IconEye, IconTrash, IconUser } from "@tabler/icons-react";

export const CardUser = () => {
  return (
    <Paper w="100%">
      <Flex justify="space-between">
        <Flex gap={10}>
          <Badge radius="sm" mb={20}>
            Developer
          </Badge>
        </Flex>

        <Flex>
          <Menu>
            <Menu.Target>
              <IconDots size="18px" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUser size={14} />}>
                View client
              </Menu.Item>

              <Menu.Item leftSection={<IconEdit size={14} />}>
                Edit client
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                Delete client
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>

      <Flex gap={20} justify="space-between">
        <Flex gap={20} w="calc(100% - 50px)">
          <Avatar title="asdsa" size="lg">
            FO
          </Avatar>

          <Flex direction="column" w="100%">
            <Text size="lg" fw={500}>
              Felipe Oliveira
            </Text>

            <Text>E-mail: felipe.wget@gmail.com</Text>

            <Text>Hours per week: 42hours</Text>

            <Flex gap={5}>
                <Text>Price per hour: ***</Text>

                <IconEye />
            </Flex>

            <Flex align="center" gap={10}>
              <Text>Projects: </Text>

              <Avatar.Group mt={10}>
                <Avatar src="image.png" radius="md" />
                <Avatar src="image.png" radius="md" />
                <Avatar src="image.png" radius="md" />
                <Avatar radius="md">+5</Avatar>
              </Avatar.Group>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Divider my={14} />

      <Flex gap="10" wrap="wrap">
        <Badge radius="sm">Created at: 22/08/1994</Badge>
        <Badge radius="sm">Has notes</Badge>
      </Flex>
    </Paper>
  );
};