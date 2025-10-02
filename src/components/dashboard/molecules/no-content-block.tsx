import { Button, Flex, Image, Text } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

type NoContentBlock = {
  image?: string;
  title: string;
  description: string;
  footer?: ReactNode;
};

export const NoContentBlock: FC<NoContentBlock> = ({
  image,
  title,
  description,
  footer,
}) => {
  return (
    <Flex w="100%" justify="center" py={50}>
      <Flex
        direction="column"
        align="center"
        gap={10}
        style={{
          maxWidth: "500px",
        }}
      >
        <Image src={image} w="150px" />

        <Text ta="center" fw={500}>
          {title}
        </Text>

        <Text size="sm" c="dimmed" ta="center">
          {description}
        </Text>

        {footer}
      </Flex>
    </Flex>
  );
};
