import {
  Avatar,
  Badge,
  Divider,
  Flex,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";

export const ClientCard = () => {
  return (
    <Paper w="100%">
      <Flex gap={20} justify="space-between">
        <Flex gap={20}>
          <Avatar title="asdsa" size="lg">E</Avatar>

          <Flex direction="column">
            <Text size="lg" fw={500}>
              Enterness company
            </Text>

            <Text>Email: felipe.wget@gmail.com</Text>
            <Text>Phone: +41 5689 7458</Text>
            <Text>Website: https://google.com</Text>
          </Flex>
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

      <Divider my={14} />

      <Flex gap="10" wrap="wrap">
        <Badge radius="sm">1 Project</Badge>

        <Badge radius="sm">Active client</Badge>

        <Badge radius="sm">Has notes</Badge>
      </Flex>
    </Paper>
  );
};