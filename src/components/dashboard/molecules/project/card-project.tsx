import {
  Avatar,
  Badge,
  Divider,
  Flex,
  Menu,
  Paper,
  Progress,
  Text,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconUser } from "@tabler/icons-react";

export const ProjectCard = () => {
  return (
    <Paper w="100%">
      <Flex justify="space-between">
        <Flex gap={10}>
          <Badge radius="sm" mb={20}>
            Job
          </Badge>

          <Badge radius="sm">Briefing</Badge>
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
            PN
          </Avatar>

          <Flex direction="column" w="100%">
            <Text size="lg" fw={500}>
              Project's name
            </Text>

            <Flex align="center" gap={10}>
              <Text>Categories: </Text>

              {[...Array(3)].map(() => (
                <Badge variant="light" radius="md">
                  adasd
                </Badge>
              ))}
            </Flex>

            <Text>Description here osdsaisa saio dsa</Text>

            <Flex w="100%" align="center" gap={20} my={10}>
              <Progress radius="sm" w="100%" value={80} size="lg" />

              <Text style={{ whiteSpace: "nowrap" }}>14hrs / 1425hrs</Text>
            </Flex>

            <Avatar.Group>
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar>+5</Avatar>
            </Avatar.Group>
          </Flex>
        </Flex>
      </Flex>

      <Divider my={14} />

      <Flex gap="10" wrap="wrap">
        <Badge radius="sm">Created at: 22/08/1994</Badge>
      </Flex>
    </Paper>
  );
};
