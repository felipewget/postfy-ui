import { BUCKET_URL } from "@/constants";
import {
  Media,
} from "@/declarators";
import {
  Badge,
  Button,
  Card,
  Flex,
  Image,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { FC } from "react";

export const MediaCard: FC<{ media: Media }> = ({ media }) => {
  return (
    <Card flex={1} p={10} withBorder={false} radius="sm">
      <Flex>
        <Flex gap={10} direction="column" flex={1}>
          <Flex gap={10} wrap="wrap">
            {media.tags.map((tag) => (
              <Badge radius="sm" size="xs">
                {tag}
              </Badge>
            ))}
          </Flex>

          <Flex
            flex={1}
            w="100%"
            h="300px"
            align="center"
            justify="center"
            bg="violet"
            style={{
              borderRadius: "5px",
            }}
          >
            <Image
              style={{
                maxHeight: "300px",
                maxWidth: "100%",
              }}
              src={BUCKET_URL + media.url}
            />
          </Flex>
        </Flex>

        <Flex
          justify="end"
          w="50px"
          style={{
            minWidth: "30px",
          }}
        >
          <Button size="20px" px={5} variant="light" radius="sm">
            <IconDots size="13px" />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
