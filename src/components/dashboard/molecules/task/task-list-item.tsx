"use client";

import {
  Paper,
  Flex,
  Avatar,
  Text,
  Menu,
  Select,
  Badge,
  Progress,
} from "@mantine/core";
import {
  IconDots,
  IconUser,
  IconEdit,
  IconTrash,
  IconArrowDown,
  IconPlayBasketball,
  IconEyePause,
} from "@tabler/icons-react";

export const TaskListItem = () => {
  return (
    <Paper w="100%">
      <Flex gap={20} justify="space-between" w="100%" >
        <Flex gap={20} direction={{base: "column", md: 'row'}}>
          <Flex>
            <IconEyePause />
          </Flex>

          <Flex direction="column">
            <Text fw={500} size="lg" mr={5}>
              Title iasif sdafhdof asfidsdufda di
            </Text>

            <Flex align="center" gap={5} mb={10}>
              <Badge radius="sm">Enterness ico asdoiiasjd</Badge>

              <Badge radius="sm">Development</Badge>
            </Flex>

            <Text>
              Description aoidjas iaj iosafoaj dsof ajdss fd fiuf dui d
            </Text>
          </Flex>

           <Flex gap={5} align="center" ml={{ base: 0, md: 20}}>
              <Text>Time: </Text>

              <Progress w="200px" value={23} />

              <Text>123h</Text>
            </Flex>
        </Flex>

        <Flex direction="column" gap={5} display={{ base: "none", md: "block"}}>
          <Flex align="center" gap={10} h="30px">
            <Select
              w="180px"
              radius="md"
              rightSection={
                <Flex>
                  <Avatar size="sm" ml={10} mr={5} />
                </Flex>
              }
              data={[{ label: "Felipe Oliveira", value: "fadas" }]}
            />

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

          <Flex align="center" mt={10}>
            <Text>Created by: </Text>
            <Avatar size="sm" />
            Felipe Oliveira
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};
