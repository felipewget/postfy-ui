import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Text,
} from "@mantine/core";
import { FC } from "react";
import { IconClock, IconDots } from "@tabler/icons-react";
import moment from "moment";
import { date } from "yup";

export const PublicationScheduleCard: FC<{ publication: any }> = ({
  publication,
}) => {
  console.log("publicationpublication", publication);
  return (
    <Flex w="100%" align="start" gap={20}>
      <Flex
        direction="column"
        align="center"
        w="150px"
        py={20}
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
            </Flex>
          </Flex>
        </Card>

        <Flex direction="column" gap={10} py={10}>
          {publication.profiles.map((profile) => (
            <Flex gap={10} align="center">
              <Image src="#" w={25} h={25} />

              <Text fw={500} size="sm">
                {profile.profileTitle}
              </Text>

              <Box w={5} h={5} bg="violet" style={{ borderRadius: "50%" }} />

              <Text size="xs">{profile.channel}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex direction="column" gap={10} align="end" py={10}>
        {publication.dispatchmentStatus && (
          <Badge radius="sm" size="sm">
            {publication.dispatchmentStatus}
          </Badge>
        )}

        <Badge radius="sm" size="sm" variant="light">
          {publication.approvalStatus}
        </Badge>
      </Flex>

      <Flex mt={10}>
        <Button size="20px" px={5} variant="light" radius="sm">
          <IconDots size="13px" />
        </Button>
      </Flex>
    </Flex>
  );
};
