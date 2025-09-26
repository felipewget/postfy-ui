"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  Select,
  Switch,
  TagsInput,
  Text,
} from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { TYPE_OF_CONTENT_OPTION } from "@/constants";
import { Header } from "@/components/dashboard/organisms/header";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { ImageCheckboxes } from "@/components/dashboard/molecules/publication/social-profile-select";
import { useList } from "@/apis/crud.api";
import { SocialProfile } from "@/declarators";
import { useState } from "react";
import { useAddCampaign } from "@/apis/campaign.api";
import { useDashboardContext } from "@/components/dashboard/templates/navbar";

export const IMAGE_CATEGORY_OPTIONS = [
  { label: "Negócios", value: "business" },
  { label: "Tecnologia", value: "technology" },
  { label: "Saúde", value: "health" },
  { label: "Educação", value: "education" },
  { label: "Viagem", value: "travel" },
  { label: "Natureza", value: "nature" },
  { label: "Esportes", value: "sports" },
  { label: "Comida", value: "food" },
  { label: "Moda", value: "fashion" },
];

// 🔹 Mapeamento dias → entity fields
const DAYS_MAP = [
  { key: "monday", label: "Segunda" },
  { key: "tuesday", label: "Terça" },
  { key: "wednesday", label: "Quarta" },
  { key: "thursday", label: "Quinta" },
  { key: "friday", label: "Sexta" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
];

export default function Campaigns() {
  const [selectedProfiles, setSelectedProfiles] = useState<SocialProfile[]>([]);

  const { selectedAccount } = useDashboardContext();

  const { mutate: createCampaign } = useAddCampaign({
    accountId: selectedAccount?.id ?? 0,
  });

  const { data } = useList({
    entity: "social-profiles",
    params: {},
  });

  const socialProfiles = (data?.pages.flat() ?? []) as SocialProfile[];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(campaignSchema),
    defaultValues: {
      title: "",
      useEmojis: false,
      approverEmail: "",
      ...Object.fromEntries(
        DAYS_MAP.map((d) => [
          [
            d.key,
            {
              enabled: false,
              startTime: "",
              contentType: "",
              imagesEnabled: false,
              images: { iaGenerated: false, category: "" },
            },
          ],
        ])
      ),
    },
  });

  const onSubmit = (data: any) => {
    const payload: any = {
      title: data.title,
      needsApprovation: data.useEmojis,
      emailToApprove: data.approverEmail || null,
    };

    DAYS_MAP.forEach(({ key }) => {
      const day = data[key];

      payload[key] = day.enabled ? day.contentType || null : null;
      payload[`${key}Hour`] = day.enabled ? day.startTime || null : null;
      payload[`${key}Config`] = day.enabled
        ? {
            imagesEnabled: day.imagesEnabled,
            images: day.imagesEnabled ? day.images : null,
          }
        : null;
    });

    createCampaign({
      profiles: selectedProfiles.map((profile) => profile.id),
      ...payload,
    });
  };

  const useEmojis = watch("useEmojis");
  const days = watch();

  if (!selectedAccount) return null;

  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Create campaign"
        description="Manage your clients, link them with projects base knowledgment"
      />

      <Flex w="100%">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {/* 🔹 Título */}
          <Input.Wrapper label="Title" error={errors?.title?.message}>
            <Input placeholder="Title" {...register("title")} />
          </Input.Wrapper>

          {/* 🔹 Aprovação */}
          <Checkbox
            label="Needs approbation?"
            description="If this option is enabled, you will receive posts for next week to approve"
            {...register("useEmojis")}
          />

          {useEmojis && (
            <Input.Wrapper
              label="E-mail to approve"
              error={errors?.approverEmail?.message}
            >
              <Input
                placeholder="E-mail to approve"
                {...register("approverEmail")}
              />
            </Input.Wrapper>
          )}

          <Divider />

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

          {/* 🔹 Dias da semana */}
          <Flex wrap="wrap" gap={20} mt={20} align="start">
            {DAYS_MAP.map(({ key, label }) => {
              const day = watch(key);
              return (
                <Card key={key} w="calc(50% - 10px)">
                  <Flex justify="space-between" align="center">
                    <Text>{label}</Text>
                    <Switch label="Ativo" {...register(`${key}.enabled`)} />
                  </Flex>

                  {day?.enabled && (
                    <>
                      <Input.Wrapper
                        label="Hora de início"
                        error={errors?.[key]?.startTime?.message}
                      >
                        <Input type="time" {...register(`${key}.startTime`)} />
                      </Input.Wrapper>

                      <Input.Wrapper
                        label="Tipo de conteúdo"
                        error={errors?.[key]?.contentType?.message}
                      >
                        <Select
                          onChange={(value) =>
                            setValue(`${key}.contentType`, value)
                          }
                          data={TYPE_OF_CONTENT_OPTION}
                        />
                      </Input.Wrapper>

                      <Switch
                        label="Imagens"
                        {...register(`${key}.imagesEnabled`)}
                      />

                      {day?.imagesEnabled && (
                        <Card mt={10}>
                          <Switch
                            label="Imagens geradas por IA"
                            {...register(`${key}.images.iaGenerated`)}
                          />

                          {!day?.images?.iaGenerated && (
                            <Input.Wrapper
                              label="Categoria da imagem"
                              error={errors?.[key]?.images?.category?.message}
                            >
                              <TagsInput
                                maxTags={1}
                                onChange={(values) =>
                                  setValue(
                                    `${key}.images.category`,
                                    values[0] ?? undefined
                                  )
                                }
                                data={IMAGE_CATEGORY_OPTIONS.map(
                                  (c) => c.value
                                )}
                              />
                            </Input.Wrapper>
                          )}
                        </Card>
                      )}
                    </>
                  )}
                </Card>
              );
            })}
          </Flex>

          <Button mt={20} type="submit">
            Salvar
          </Button>
        </form>
      </Flex>
    </PageTemplate>
  );
}

// 🔹 Schema atualizado
const campaignSchema = yup.object().shape({
  title: yup.string().required("Informe o título da campanha"),
  useEmojis: yup.boolean(),
  approverEmail: yup
    .string()
    .email("Email inválido")
    .when("useEmojis", {
      is: true,
      then: (schema) => schema.required("Informe o e-mail para aprovação"),
      otherwise: (schema) => schema.notRequired(),
    }),
  ...Object.fromEntries(
    DAYS_MAP.map(({ key }) => [
      key,
      yup.object().shape({
        enabled: yup.boolean(),
        startTime: yup.string().when("enabled", {
          is: true,
          then: (s) => s.required("Selecione a hora de início"),
          otherwise: (s) => s.notRequired(),
        }),
        contentType: yup.string().when("enabled", {
          is: true,
          then: (s) =>
            s
              .oneOf(TYPE_OF_CONTENT_OPTION.map((o) => o.value))
              .required("Selecione o tipo de conteúdo"),
          otherwise: (s) => s.notRequired(),
        }),
        imagesEnabled: yup.boolean(),
        images: yup.object().when("enabled", {
          is: true,
          then: (schema) =>
            schema.shape({
              iaGenerated: yup.boolean(),
              category: yup
                .string()
                .oneOf(IMAGE_CATEGORY_OPTIONS.map((o) => o.value))
                .when("iaGenerated", {
                  is: false,
                  then: (s) => s.required("Selecione a categoria da imagem"),
                  otherwise: (s) => s.notRequired(),
                }),
            }),
          otherwise: (schema) => schema.notRequired(),
        }),
      }),
    ])
  ),
});
