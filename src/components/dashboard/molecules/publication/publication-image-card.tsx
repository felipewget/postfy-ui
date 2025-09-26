import {
  Button,
  Card,
  Divider,
  FileInput,
  Flex,
  Image,
  Input,
  Text,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import {
  IconRefresh,
  IconVideo,
  IconImageInPicture,
} from "@tabler/icons-react";

type Media = {
  id: string;
  src: string;
};

export const MediaGenerator:FC<{ onChange: (images: any) => void }> = ({onChange}) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  // Simula geração de imagem pela IA
  const handleGenerateImage = () => {
    const newItem: Media = {
      id: Math.random().toString(36).substring(2, 9),
      src: `https://picsum.photos/300/200?random=${media.length + 1}`,
    };
    setMedia((prev) => [...prev, newItem]);
  };

  // Upload manual (imagem ou vídeo)
  const handleUpload = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newItem: Media = {
      id: Math.random().toString(36).substring(2, 9),
      src: url,
    };
    setMedia((prev) => [...prev, newItem]);
  };

  // Selecionar / desselecionar imagem
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  useEffect(() => {
  const selectedMedia = media.filter((m) => selected.includes(m.id));
  onChange(selectedMedia);
}, [selected, media]);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Flex direction="column" gap={20}>
        <Flex gap={20} flex={1}>
          <Flex direction="column" gap={10} flex={1}>
            {/* Prompt + botão AI */}

            <Flex w="100%" gap={10}>
              <Input placeholder="Enter prompt to AI generation..." flex={1} />
              <Button
                variant="transparent"
                leftSection={<IconRefresh size={14} />}
              >
                AI suggestion
              </Button>
            </Flex>

            <Flex justify="left">
              <Button onClick={handleGenerateImage}>Generate image</Button>
            </Flex>
          </Flex>

          <Flex direction="column" my={10}>
            <Text ta="center" size="sm" c="dimmed">
              or
            </Text>
          </Flex>

          {/* Upload de arquivo */}
          <Card flex={1}>
            <FileInput
              flex={1}
              leftSectionWidth={70}
              leftSection={
                <Flex gap={10}>
                  <IconVideo size={16} />
                  <IconImageInPicture size={16} />
                </Flex>
              }
              label="Upload your image or video"
              placeholder="Your media"
              leftSectionPointerEvents="none"
              onChange={handleUpload}
            />
          </Card>
        </Flex>

        <Divider my={20} />

        {/* Galeria */}
        <Flex gap={10} wrap="wrap">
          {media.length === 0 && (
            <Text c="dimmed" size="sm">
              No media yet. Upload or generate images.
            </Text>
          )}
          {media.map((item) => (
            <Card
              key={item.id}
              padding={5}
              radius="md"
              withBorder
              shadow={selected.includes(item.id) ? "sm" : "xs"}
              style={{
                cursor: "pointer",
                border: selected.includes(item.id)
                  ? "2px solid var(--mantine-color-blue-filled)"
                  : undefined,
              }}
              onClick={() => toggleSelect(item.id)}
            >
              <Image
                src={item.src}
                alt="media"
                width={150}
                height={100}
                radius="sm"
                fit="cover"
              />
            </Card>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
