import { Badge, Box, Card, Divider, Flex, Image, Text } from "@mantine/core";
import { FC } from "react";
import { IconClock } from "@tabler/icons-react";
import moment from "moment";
import { date } from "yup";

export const PublicationScheduleCard: FC<{ publication: any }> = ({
  publication,
}) => {
  console.log("publicationpublication", publication);
  return (
    <Flex w="100%" align="center" gap={20}>
      <Flex
        direction="column"
        align="center"
        w="150px"
        style={{
          minWidth: "150px",
        }}
      >
        <Text fw={600} size="xs">
          {moment(publication.date).format("D [of] MMM, YYYY")}
        </Text>

        <Flex align="center" gap={5} c="dimmed">
          <IconClock size="14px" />

          <Text fw={600} size="sm">
            {moment(publication.date).format("HH:mm")}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" flex={1}>
        <Card p={15}>
          <Flex gap={10}>
            {publication.media && <Image src="#" w="50px" h="50px" />}

            <Flex direction="column" w="100%">
              <Text size="sm">{publication.text}</Text>

              <Divider my={10} />

              {publication.profiles.map((profile) => (
                <Card p={10}>
                  <Flex gap={20}>
                    <Image src="#" w={30} h={30} />

                    <Flex direction="column">
                      <Text>{profile.channel}</Text>
                      <Text>{profile.profileTitle}</Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Flex>
        </Card>
      </Flex>

      <Flex direction="column" gap={10} align="end">
        {publication.dispatchmentStatus && (
          <Badge radius="sm" size="sm">
            {publication.dispatchmentStatus}
          </Badge>
        )}

        <Badge radius="sm" size="sm" variant="light">
          {publication.approvalStatus}
        </Badge>
      </Flex>
    </Flex>
  );
};
