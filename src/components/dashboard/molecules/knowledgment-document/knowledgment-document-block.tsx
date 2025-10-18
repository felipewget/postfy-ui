import { Button, Card, Flex, Text } from "@mantine/core";
import { IconFile, IconDots } from "@tabler/icons-react";
import { FC } from "react";

export const KnowledgmentDocumentBlock: FC<{ document: any }> = ({
  document,
}) => {
  return (
    <Card withBorder={false} p={15} radius="sm">
      <Flex direction="column" gap={10}>
        <Flex align="center" gap={20} justify="space-between">
          <Flex gap={10} align="center">
            <IconFile size="20px" />

            <Text fw={600} size="md">
              {document.title}
            </Text>
          </Flex>

          <Button size="20px" px={5} variant="light" radius="sm">
            <IconDots size="13px" />
          </Button>
        </Flex>

        <Flex
          style={{
            borderRadius: "5px",
          }}
          p={10}
          bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
        >
          {document.description}
        </Flex>
      </Flex>
    </Card>
  );
};
