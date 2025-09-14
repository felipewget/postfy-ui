"use client";

import { CalendarFilter } from "@/components/dashboard/atoms/inputs/calendar-filter";
import { Header } from "@/components/dashboard/organisms/header";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  Menu,
  SegmentedControl,
  Select,
  Switch,
  Tabs,
  Text,
  Textarea,
} from "@mantine/core";
import {
  IconClock,
  IconDots,
  IconFilterFilled,
  IconHome,
  IconMessages,
  IconSearch,
  IconTrash,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function Settings() {
  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Settings"
        description="Manage your clients, link them with projects base knowledgment"
      />

      <Flex my={20} gap={20} align="start">
        <Flex flex={1} direction="column" gap={10}>
          <Card flex={1} withBorder={false}>
            <Flex direction="column" gap={20}>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={10}>
                  <IconClock />

                  <Text>General</Text>
                </Flex>
              </Flex>

              <Flex direction="column" gap={10}>
                <Flex gap={20}>
                  <Input.Wrapper
                    flex={1}
                    label="Title"
                    error={"errors?.title?.message" as string}
                  >
                    <Input placeholder="Title" />
                  </Input.Wrapper>

                  <Select
                    flex={1}
                    label="Industry"
                    placeholder="Select the newsletter idiom"
                    //   data={IDIOM_OPTIONS}
                    //   onChange={(val) => form.setValue("idiom", val)}
                    error={"errors?.idiom?.message" as string}
                  />
                </Flex>

                <Flex flex={1}>
                  <Input.Wrapper
                    flex={1}
                    label="Description"
                    error={"errors?.description?.message" as string}
                  >
                    <Textarea placeholder="Description" autosize minRows={3} />
                  </Input.Wrapper>
                </Flex>

                <Flex flex={1}>
                  <Input.Wrapper
                    flex={1}
                    label="Tone of voice"
                    error={"errors?.description?.message" as string}
                  >
                    <Textarea
                      placeholder="Tone of voice. Ex: Expert in the area"
                      autosize
                      minRows={3}
                    />
                  </Input.Wrapper>
                </Flex>

                <Flex flex={1}>
                  <Input.Wrapper
                    flex={1}
                    label="Traget audience"
                    error={"errors?.description?.message" as string}
                  >
                    <Textarea
                      placeholder="Traget audience. Ex: developers, publishers, b2b, b2c"
                      autosize
                      minRows={3}
                    />
                  </Input.Wrapper>
                </Flex>

                <Divider />

                <Flex gap={10} flex={1} align="center">
                  <Select
                    flex={1}
                    label="Preferred language"
                    leftSection={<IconFilterFilled size="12px" />}
                    radius="sm"
                    //   onChange={(e) => setStatus(e)}
                    data={[
                      { label: "Active", value: "active" },
                      { label: "Inactive", value: "inactive" },
                    ]}
                  />

                  <Flex p={10} flex={1} mt={25}>
                    <Checkbox label="Use emojis" />
                  </Flex>
                </Flex>

                <Flex flex={1}>
                  <Input.Wrapper
                    flex={1}
                    label="Additional content instructions"
                    error={"errors?.description?.message" as string}
                  >
                    <Textarea
                      placeholder="Any specific instructions for content generation (e.g., avoid certain topics, focus on specific themes, etc.)"
                      autosize
                      minRows={2}
                    />
                  </Input.Wrapper>
                </Flex>
              </Flex>

              <Divider />

              <Flex justify="end">
                <Button>Save changes</Button>
              </Flex>
            </Flex>
          </Card>

          <Card flex={1} withBorder={false}>
            <Flex direction="column" gap={20}>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={10}>
                  <IconClock />

                  <Text>Brain AI</Text>
                </Flex>

                <Select placeholder="All platforms" data={[]} radius="sm" />
              </Flex>

              <Flex>here</Flex>
            </Flex>
          </Card>
        </Flex>

        <Card
          withBorder={false}
          p={0}
          w="450px"
          style={{
            minWidth: "300px",
          }}
        >
          <Flex justify="space-between" align="center">
            <Flex align="center" p={20} gap={10}>
              <IconClock />

              <Text>Behaviours</Text>
            </Flex>
          </Flex>

          <Divider mx={10} />

          <Flex direction="column" p={10} gap={10}>
            {[...Array(5)].map(() => (
              <Card withBorder={false}>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text size="sm">General email notificatins</Text>

                    <Text size="lg">Promotions aoidhaoidjaiod</Text>
                  </Flex>

                  <Box>
                    <Switch />
                  </Box>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Card>
      </Flex>
    </PageTemplate>
  );
}
