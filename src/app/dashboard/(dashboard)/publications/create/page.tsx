"use client";

import { SchedulerInput } from "@/components/dashboard/atoms/inputs";
import FacebookPreview from "@/components/dashboard/molecules/publication/social-previews/FacebookPreview";
import InstagramPreview from "@/components/dashboard/molecules/publication/social-previews/InstagramPreview";
import LinkedInPreview from "@/components/dashboard/molecules/publication/social-previews/LinkedIdPreview";
import { ImageCheckboxes } from "@/components/dashboard/molecules/publication/social-profile-select";
import { Header } from "@/components/dashboard/organisms/header";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  FileInput,
  Flex,
  Input,
  Menu,
  SegmentedControl,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import {
  IconImageInPicture,
  IconMessages,
  IconRefresh,
  IconUsersGroup,
  IconVideo,
} from "@tabler/icons-react";

export default function Publications() {
  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Create publications"
        description="Manage your clients, link them with projects base knowledgment"
      />

      <Flex my={20}>
        <Card w="100%">
          <Flex direction="column" gap={20}>
            <Flex direction="column" gap={10}>
              <Text fw={600} size="md">
                Social profiles
              </Text>

              <ImageCheckboxes />
            </Flex>

            <Divider />

            <Flex direction="column" gap={10}>
              <Text fw={600} size="md">
                Your content idea
              </Text>

              <Textarea
                placeholder="Enter your original content idea here... We'll optimize it for each platform."
                autosize
                minRows={3}
              />
            </Flex>

            <Flex>
              <Checkbox
                flex={1}
                label="Optimize content for each socialnetwork"
                description="We will gerenate different texts based on each socila network platform"
              />

              <Flex direction="column" gap={10} flex={1}>
                <Text>Type of content</Text>

                <Select placeholder="Type of content" data={[]} />
              </Flex>
            </Flex>

            <Divider />

            <Flex justify="end">
              <Button radius="md">Generate content and previews</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>

      <Card mb={20}>
        <Text fw={600} size="lg">
          Image generation
        </Text>

        <Flex flex={1} w="100%" gap={20} align="start" mt={20}>
          <Card flex={1}>
            <Flex direction="column" gap={20} flex={1}>
              <Flex w="100%">
                <Input
                  placeholder="Enter prompt to AI generation..."
                  flex={1}
                />

                <Button
                  variant="transparent"
                  leftSection={<IconRefresh size="14px" />}
                >
                  AI suggestion
                </Button>
              </Flex>

              <Flex justify="left">
                <Button>Generate image</Button>
              </Flex>
            </Flex>
          </Card>

          <Flex direction="column" my={30}>
            <Text>or</Text>
          </Flex>

          <Card flex={1}>
            <FileInput
              flex={1}
              leftSectionWidth={70}
              leftSection={
                <Flex gap={10}>
                  <IconVideo size="16px" />

                  <IconImageInPicture size="16px" />
                </Flex>
              }
              label="Upload your image or video"
              placeholder="Your media"
              leftSectionPointerEvents="none"
            />
          </Card>
        </Flex>

        <Divider my={20} />

        <Flex>Images...</Flex>
      </Card>

      <Card>
        <Text fw={600} size="lg">
          Post preview
        </Text>

        <Flex
          gap={10}
          py={20}
          style={{
            overflowX: "auto",
          }}
        >
          {[...Array(4)].map(() => (
            <Flex
              direction="column"
              gap={20}
              w="500px"
              style={{
                minWidth: "500px",
              }}
            >
              <Textarea
                placeholder="Enter your original content idea here... We'll optimize it for each platform."
                autosize
                minRows={3}
              />

              <InstagramPreview
                author="Hiking vacation"
                text={"Hoje que vai dar certo"}
              />
            </Flex>
          ))}
        </Flex>
      </Card>

      <Flex justify="right" gap={10} mt={20}>
        <SchedulerInput />

        <Button radius="md">Schedule this publication</Button>
      </Flex>
    </PageTemplate>
  );
}
