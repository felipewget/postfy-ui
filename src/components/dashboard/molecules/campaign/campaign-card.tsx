import { Campaign, CampaignWithProfile, SocialProfile } from "@/declarators";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import { IconDots, IconSchema } from "@tabler/icons-react";
import moment from "moment";
import { FC } from "react";

export const CampaignCard: FC<{ campaign: CampaignWithProfile }> = ({
  campaign,
}) => {
  return (
    <Card flex={1} p={20} withBorder={false} radius="sm">
      <Flex gap={20}>
        <Avatar radius="sm">{campaign.title[0].toLocaleUpperCase()}</Avatar>

        <Flex direction="column" w="100%">
          <Flex align="start" justify="space-between">
            <Flex direction="column">
              <Text fw={600} size="lg">
                {campaign.title}
              </Text>

              <Text c="dimmed" size="xs">
                Created at: {moment(campaign.createdAt).format("DD/MM/YYYY")}
              </Text>

              {campaign.needsApprovation && (
                <Text c="dimmed" size="xs">
                  Needs approbation of: {campaign.emailToApprove}
                </Text>
              )}

              {/* <Text c="dimmed" size="sm">
                Ends at: 26/08/2025
              </Text> */}
            </Flex>

            <Flex align="center" gap={10}>
              <Badge size="md" radius="sm">
                Generated
              </Badge>

              <Flex>
                <Button size="20px" px={5} variant="light" radius="sm">
                  <IconDots size="13px" />
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Box mt={10}>
            <Text size="xs" fw={600} mb={10}>
              Week content
            </Text>

            <Flex wrap="wrap" gap={10}>
              {[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].map((day) => {
                if (!campaign[day]) return null;

                const iaEnabled =
                  campaign[`${day}Config`]?.imagesEnabled ?? false;

                return (
                  <Card p={10} radius="sm">
                    <Text fw={500} size="xs">
                      {day} - {campaign[`${day}Hour`]}
                    </Text>

                    <Text fw={500} size="sm">
                      {campaign[day]}
                    </Text>

                    <Text fw={500} size="xs">
                      Images enabled:{" "}
                      {iaEnabled
                        ? `Yes (${
                            campaign[`${day}Config`]?.images?.iaGenerated
                              ? "IA"
                              : campaign[`${day}Config`]?.images?.category
                          })`
                        : "No"}
                    </Text>
                  </Card>
                );
              })}
            </Flex>
          </Box>

          <Card mt={10} p={10} radius="sm">
            <Text size="xs" fw={600} mb={10}>
              Social profiles
            </Text>

            <Flex gap={10} wrap="wrap">
              {campaign.profiles.map((socialProfile) => (
                <Card p={5} px={10} radius="sm">
                  <Flex gap={10} align="center">
                    <Image src="#" w={20} h={20} />

                    <Flex direction="column">
                      <Text fw={500} size="10px">
                        {socialProfile.channel}
                      </Text>
                      <Text size="sm">{socialProfile.profileTitle}</Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Card>

          <Divider my={10} />

          <Flex gap={10}>
            <Badge size="sm" radius="sm" variant="light">
              Adaptative content for each social media: Yes
            </Badge>

            <Badge size="sm" radius="sm" variant="light">
              Generated content: 13 contents
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
