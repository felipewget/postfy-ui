import { Avatar, Card, Flex, Image, Text, Divider, Group, ActionIcon } from "@mantine/core";
import { IconThumbUp, IconMessageCircle, IconShare3 } from "@tabler/icons-react";

type Props = {
  authorImage?: string;
  author: string;
  text: string;
  image?: string;
  date?: string;
};

export default function FacebookPreview({
  author,
  authorImage,
  text,
  image,
  date,
}: Props) {
  return (
    <Card shadow="sm" radius="md" withBorder style={{ maxWidth: 600 }} >
      {/* Header */}
      <Flex align="center" gap="sm" mb="sm">
        <Avatar src={authorImage} radius="xl" color="gray">
          {author[0]}
        </Avatar>
        <Flex direction="column">
          <Text fw={600}>{author}</Text>
          <Text size="xs" c="dimmed">
            {date ?? "Agora"}
          </Text>
        </Flex>
      </Flex>

      {/* Text */}
      <Text size="sm" mb="sm">
        {text}
      </Text>

      {/* Image */}
      {image && (
        <Card.Section>
          <Image src={image} alt="preview" radius={0} />
        </Card.Section>
      )}

      {/* Likes/Comments/Share counters */}
      <Flex justify="space-between" align="center" mt="sm" mb="xs">
        <Text size="xs" c="dimmed">
          👍 120
        </Text>
        <Text size="xs" c="dimmed">
          45 comentários · 10 compartilhamentos
        </Text>
      </Flex>

      <Divider />

      {/* Action buttons */}
      <Group grow mt="xs">
        <ActionIcon variant="subtle" color="dark" radius="md" size="lg">
          <IconThumbUp size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="dark" radius="md" size="lg">
          <IconMessageCircle size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="dark" radius="md" size="lg">
          <IconShare3 size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
}