"use client";

import { useList } from "@/apis/crud.api";
import { SchedulerInput } from "@/components/dashboard/atoms/inputs";
import { PublicationContentCard } from "@/components/dashboard/molecules/publication/publication-content-card";
import { MediaGenerator } from "@/components/dashboard/molecules/publication/publication-image-card";
import FacebookPreview from "@/components/dashboard/molecules/publication/social-previews/FacebookPreview";
import InstagramPreview from "@/components/dashboard/molecules/publication/social-previews/InstagramPreview";
import { ImageCheckboxes } from "@/components/dashboard/molecules/publication/social-profile-select";
import { Header } from "@/components/dashboard/organisms/header";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { TYPE_OF_CONTENT_OPTION } from "@/constants";
import { SocialProfile } from "@/declarators";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  FileInput,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import {
  IconImageInPicture,
  IconRefresh,
  IconUsersGroup,
  IconVideo,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Publications() {
  const [payload, setPayload] = useState();
  const [image, setImage] = useState();
  const profiles = (payload?.profiles ?? []) as SocialProfile[];

  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Create publications"
        description="Manage your clients, link them with projects base knowledgment"
      />

      <PublicationContentCard onChange={(payload) => setPayload(payload)} />

      {profiles.length > 0 && (
        <Flex direction="column" gap={20}>
          <MediaGenerator onChange={(image) => setImage(image[0] ?? null)} />

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
              {profiles.map((profile) => (
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

                  <FacebookPreview
                    image={image?.src}
                    authorImage={`https://graph.facebook.com/${profile.profileId}/picture?type=large`}
                    author={profile.profileTitle}
                    text={"Hoje que vai dar certo"}
                  />
                </Flex>
              ))}
            </Flex>
          </Card>
        </Flex>
      )}

      <Card p={10} mt={20}>
        <Flex justify="right" gap={10}>
          <SchedulerInput />

          <Button radius="md">Schedule this publication</Button>
        </Flex>
      </Card>

    </PageTemplate>
  );
}
