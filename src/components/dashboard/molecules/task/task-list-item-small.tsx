import { Avatar, Badge, Card, Flex, Text } from "@mantine/core";

export const TaskListItemSmall = () => (
  <Card>
    <Flex justify="space-between" w="100%" direction="column">
      <Flex gap={20}>
        <Flex direction="column">
          <Text fw={500} size="lg" mr={5}>
            Title iasif sdafhdof asfidsdufda di
          </Text>

          <Flex align="center" gap={5} mb={10} wrap="wrap">
            <Badge radius="sm">Enterness ico asdoiiasjd</Badge>

            <Badge radius="sm">Development</Badge>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap={5}>
        <Flex align="center">
          <Text>Assigned to: </Text>
          <Avatar size="sm" />
          Felipe Oliveira
        </Flex>
      </Flex>
    </Flex>
  </Card>
);
