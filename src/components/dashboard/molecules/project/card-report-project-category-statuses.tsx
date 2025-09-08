import {
  Avatar,
  Card,
  Divider,
  Flex,
  Progress,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { FC } from "react";
import {
  useGetCategoriesStatusesReport,
} from "@/api/dashboard/project.api";

export const CardReportProjectCategoryStatuses: FC<{}> = () => {
  const { data } = useGetCategoriesStatusesReport();

  if (!data) return null;

  const categories = data?.pages.flat() ?? [];
  console.log("datadata", categories);

  return (
    <Card shadow="sm" padding="lg" flex={1}>
      <Flex justify="space-between" align="center">
        <Text mb={16}>
          Project categories mensurement
        </Text>

        <SegmentedControl
          size="xs"
          data={[
            { label: "By tasks", value: "all" },
            { label: "By hour", value: "active" },
          ]}
        />
      </Flex>

      <Flex direction="column" gap={10} mt={10}>
        {categories.map((category) => (
          <Card>
            <Flex gap={10} direction="column">
              <Text w={200}>{category.category_name} ({category.tasks_count} tasks)</Text>

              <Flex w="100%" align="center" gap={10}>
                <Text w={200}>{category.minutes_done} of {category.minutes} minutes is done</Text>
                
                <Progress
                flex={1}
                  w="100%"
                  value={
                    category.minutes > 1
                      ? category.minutes / category.minutes_done
                      : 0
                  }
                />

                {category.minutes > 1
                  ? category.minutes / category.minutes_done
                  : 0}
                %
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Divider my={20} />

      <Flex gap={20} align="center">
        <Text>Team members involved with</Text>
        <Avatar.Group spacing="sm">
          <div>
            <Avatar src="image.png" radius="xl" />
          </div>
          <Avatar src="image.png" radius="xl" />
          <Avatar src="image.png" radius="xl" />
          <Avatar radius="xl">+5</Avatar>
        </Avatar.Group>
      </Flex>
    </Card>
  );
};
