import { Avatar, Badge, Divider, Flex, Menu, Paper, Text } from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconUser } from "@tabler/icons-react";

export const QuoteCard = () => {
  return (
    <Paper w="100%">
      <Flex gap={20} justify="space-between">
        <Flex gap={10}>
          <Badge radius="sm">Enterness</Badge>

          <Badge radius="sm">Project month</Badge>
        </Flex>

        <Flex gap={20}>
          <Badge radius="sm" variant="light">
            Approved
          </Badge>

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

      <Flex gap={20} mt={10}>
        <Avatar title="asdsa" size="md">
          E
        </Avatar>

        <Flex direction="column">
          <Text size="lg" fw={500}>
            Proposal aosidjas aiod asdoi
          </Text>

          <Flex gap={5} align="center">
            <Text size="sm">Created by: </Text>

            <Avatar title="asdsa" size="sm">
              E
            </Avatar>

            <Text size="sm">Felipe Oliveira | Created at: 22/08/2024</Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};
