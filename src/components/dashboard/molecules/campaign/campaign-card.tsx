import {
  Avatar,
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import { IconSchema } from "@tabler/icons-react";
import { FC } from "react";

export const CampaignCard: FC<any> = () => {
  return (
    <Card flex={1} p={20} withBorder={false}>
      <Flex gap={20}>
        <Avatar radius="md">
          <IconSchema />
        </Avatar>

        <Flex direction="column" w="100%">
          <Flex align="start" justify="space-between">
            <Flex direction="column">
              <Text fw={600} size="lg">
                Text si i dids si s s ds dsadisa
              </Text>

              <Text c="dimmed" size="sm">
                Created at: 16/08/2025
              </Text>
              <Text c="dimmed" size="sm">
                Ends at: 26/08/2025
              </Text>
            </Flex>

            <Badge size="md" radius="sm">
              Generated
            </Badge>
          </Flex>

          <Card mt={10} p={10}>
            <Text size="sm" fw={600} mb={10}>
              Schedule content
            </Text>

            <WeekSchedule />
          </Card>

          <Card mt={10} p={10}>
            <Text size="sm" fw={600} mb={10}>
              Social profiles
            </Text>

            <Flex gap={10} wrap="wrap">
              {[...Array(5)].map(() => (
                <Card p={10}>
                  <Flex gap={20}>
                    <Image src="#" w={30} h={30} />

                    <Flex direction="column">
                      <Text>Facebook</Text>
                      <Text>aosis oi djsaoidj soidasoi</Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Card>

          <Divider my={10} />

          <Flex gap={10}>
            <Badge size="sm" radius="sm">
              Adaptative content for each social media: Yes
            </Badge>

            <Badge size="sm" radius="sm">
              Generated content: 13 contents
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

const elements = [
  {
    sunday: "Provocative",
    monday: "Provocative",
    tuesday: "Provocative",
    wednesday: "Provocative",
    thursday: "Provocative",
    friday: "Provocative",
    saturday: "Provocative",
  },
];

const WeekSchedule = () => {
  const rows = elements.map((element, key) => (
    <Table.Tr key={key}>
      <Table.Td>{element.sunday}</Table.Td>
      <Table.Td>{element.monday}</Table.Td>
      <Table.Td>{element.tuesday}</Table.Td>
      <Table.Td>{element.wednesday}</Table.Td>
      <Table.Td>{element.thursday}</Table.Td>
      <Table.Td>{element.friday}</Table.Td>
      <Table.Td>{element.saturday}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Sunday</Table.Th>
          <Table.Th>Monday</Table.Th>
          <Table.Th>Tuesday</Table.Th>
          <Table.Th>Wednesday</Table.Th>
          <Table.Th>Thursday</Table.Th>
          <Table.Th>Friday</Table.Th>
          <Table.Th>Saturday</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
