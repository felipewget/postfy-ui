import { useList } from "@/apis/crud.api";
import { TYPE_OF_CONTENT_OPTION } from "@/constants";
import { SocialProfile } from "@/declarators";
import {
  Flex,
  Card,
  Divider,
  Textarea,
  Checkbox,
  Select,
  Button,
  Text,
  Image,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { ImageCheckboxes } from "./social-profile-select";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type PublicationContentCard = {
  onChange: (payload: any) => void;
};

export const PublicationContentCard: FC<PublicationContentCard> = ({
  onChange,
}) => {
  const [selectedProfiles, setSelectedProfiles] = useState<SocialProfile[]>([]);
  const [payload, setPayload] = useState();

  const { data } = useList({
    entity: "social-profiles",
    params: {},
  });

  const socialProfiles = (data?.pages.flat() ?? []) as SocialProfile[];

  const form = useForm<any>({
    resolver: yupResolver(publicationContentCard),
    defaultValues: {
      profiles: [],
    },
  });

  const errors = form.formState.errors;
  const register = form.register;

  const onSubmit = (payload: any) => {
    setPayload(payload);
    onChange(payload);
  };

  useEffect(() => {
    form.setValue("profiles", selectedProfiles);
  }, [selectedProfiles]);

  if (payload) {
    return (
      <Card my={20}>
        <Flex gap={10} mb={10}>
          <Text c="dimmed">Generic idea:</Text>

          <Text>{payload.content}</Text>
        </Flex>

        <Flex gap={10}>
          <Text c="dimmed">Type of content:</Text>

          <Text>{payload.contentType}</Text>
        </Flex>

        <Flex gap={10}>
          <Text c="dimmed">Different content for each social network:</Text>

          <Text>Yes</Text>
        </Flex>

        <Divider my={10} />

        <Flex gap={10} wrap="wrap">
          {selectedProfiles.map((profile) => (
            <Card p={10}>
              <Flex gap={10} align="center">
                <Image
                  src={`https://graph.facebook.com/${profile.profileId}/picture?type=large`}
                  w={50}
                  h={50}
                  radius="sm"
                />

                <Flex direction="column">
                  <Text size="sm" c="dimmed">
                    {profile.channel}
                  </Text>

                  <Text fw={600}>{profile.profileTitle}</Text>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Card>
    );
  }

  return (
    <Flex my={20}>
      <Card w="100%">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex direction="column" gap={20}>
              <Flex direction="column" gap={10}>
                <Text fw={600} size="md">
                  Social profiles
                </Text>

                <ImageCheckboxes
                  socialProfiles={socialProfiles}
                  setSelectedProfiles={setSelectedProfiles}
                />

                {errors?.profiles && (
                  <Text c="red" size="sm">
                    {errors.profiles.message as string}
                  </Text>
                )}
              </Flex>

              <Divider />

              <Flex direction="column" gap={10}>
                <Text fw={600} size="md">
                  Your content idea
                </Text>

                <Textarea
                  {...register("content")}
                  error={errors?.content?.message as string}
                  placeholder="Enter your original content idea here... We'll optimize it for each platform."
                  autosize
                  minRows={3}
                />
              </Flex>

              <Flex>
                <Checkbox
                  onChange={(val) => form.setValue("contentType", val)}
                  flex={1}
                  label="Optimize content for each socialnetwork"
                  description="We will gerenate different texts based on each socila network platform"
                />

                <Flex direction="column" gap={10} flex={1}>
                  <Text>Type of content</Text>

                  <Select
                    placeholder="Type of content"
                    data={TYPE_OF_CONTENT_OPTION}
                    onChange={(val) => form.setValue("contentType", val)}
                    error={errors?.contentType?.message as string}
                  />
                </Flex>
              </Flex>

              <Divider />

              <Flex justify="end">
                <Button radius="md" type="submit">
                  Generate content and previews
                </Button>
              </Flex>
            </Flex>
          </form>
        </FormProvider>
      </Card>
    </Flex>
  );
};

const publicationContentCard = yup.object().shape({
  contentType: yup.string().required(),
  content: yup.string().required(),
  profiles: yup
    .array()
    .of(
      yup.object().shape({
        profileId: yup.string().required(),
        profileTitle: yup.string().required(),
      })
    )
    .min(1, "Select at least one social profile"),
});
