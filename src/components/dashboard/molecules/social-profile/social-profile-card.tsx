import { SocialProfile } from "@/declarators";
import { Button, Card, Flex, Image, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { profile } from "console";
import { FC } from "react";

export const SocialProfileCard: FC<{ profile: SocialProfile }> = ({
  profile,
}) => {
  return (
    <Card p={10} w="100%" withBorder={false}>
      <Flex gap={10} align="center" justify="space-between">
        <Flex gap={10}>
          <Image
            src={`https://graph.facebook.com/${profile.profileId}/picture?type=large`}
            w={40}
            h={40}
            radius="sm"
          />

          <Flex direction="column">
            <Text size="sm" c="dimmed">
              {profile.channel}
            </Text>

            <Text size="sm" fw={600}>
              {profile.profileTitle}
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column" align="end" gap={10}>
          <Flex>
            <Button size="20px" px={5} variant="light" radius="sm">
              <IconDots size="13px" />
            </Button>
          </Flex>

          <Text size="xs">Token expires at: 20/08/2022, 12:30</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
