"use client";

import { useCreateAccount } from "@/apis/account.api";
import { useList, useUpdate } from "@/apis/crud.api";
import { useListDocuments } from "@/apis/knowledgement-document.api";
import { Logo } from "@/components/dashboard/atoms/logo";
import { ModalAddDocuments } from "@/components/dashboard/molecules/knowledgment-document/modal-add-document";
import { NoContentBlock } from "@/components/dashboard/molecules/no-content-block";
import { BASE_BACKEND_URL, INDUSTRY_OPTION, LANG_OPTION } from "@/constants";
import { SocialProfile } from "@/declarators";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Image,
  Input,
  Select,
  Stepper,
  Text,
  Textarea,
} from "@mantine/core";
import { IconFile, IconFilterFilled, IconTrash } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [payload, setPayload] = useState({});

  const setPayloadData = (data, key) => {
    setPayload((prev) => {
      prev[key] = data;

      return prev;
    });

    setStep((prev) => ++prev);
  };

  return (
    <Flex w="100%" direction="column" align="center" p={20} gap={20}>
      <Flex justify="space-between" w="100%" mb={20}>
        <Flex align="center" gap={10}>
          <Logo size={30} />

          <Text>Postfy</Text>
        </Flex>

        <Button>Theme</Button>
      </Flex>

      <Stepper children={undefined} active={step} size="xs">
        <Stepper.Step label="Profile">
          <Card radius="sm" withBorder={false} w="600px">
            <ProfileForm
              setPayloadData={setPayloadData}
              defaultValue={payload?.profile ?? {}}
            />
          </Card>
        </Stepper.Step>

        <Stepper.Step label="Tone">
          <Card radius="sm" withBorder={false} w="600px">
            <ToneForm setPayloadData={setPayloadData} />
          </Card>
        </Stepper.Step>

        <Stepper.Step label="Knowledgment">
          <Card radius="sm" withBorder={false} w="600px">
            <KnowledgementForm setPayloadData={setPayloadData} />
          </Card>
        </Stepper.Step>

        <Stepper.Step label="Social profiles">
          <Card radius="sm" withBorder={false} w="600px">
            <SocialForm />
          </Card>
        </Stepper.Step>
      </Stepper>

      {/* <NoContentBlock
        image="/images/profile-art.svg"
        title="Congratulations!"
        description="Your initial setup for your account is done!"
        footer={
          <Flex mt={10} direction="column" gap={20}>
            <Card withBorder={false}>
              Account
            </Card>

            <Button size="xs" radius="xs">Go to platform</Button>

          </Flex>
        }
      /> */}
    </Flex>
  );
}

const ProfileForm = ({ setPayloadData }) => {
  const profileSchema = yup.object().shape({
    accountName: yup.string().required(),
    industry: yup.string().required(),
    description: yup.string().required(),
    language: yup.string().required(),
  });

  const form = useForm<any>({
    resolver: yupResolver(profileSchema),
  });

  const onSuccess = () => {
    setPayloadData({}, "profile");
  };

  // Ajuste aqui: pegar a função de criação
  const { mutate: createAccount } = useCreateAccount(onSuccess);

  const errors = form.formState.errors;
  const register = form.register;

  const onSubmit = (payload: any) => {
    createAccount(payload);
  };

  return (
    // <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex direction="column" gap={10}>
        <Text>Basic profile data about you account</Text>

        <Flex gap={20}>
          <Input.Wrapper
            flex={1}
            label="Account name"
            error={errors?.accountName?.message as string}
          >
            <Input
              //   disabled={isPending}
              placeholder="Account name"
              {...register("accountName")}
              error={errors.accountName?.message as string | undefined}
            />
          </Input.Wrapper>

          <Input.Wrapper flex={1} label="Industry">
            <Select
              // label="Industry"
              placeholder="Select the newsletter idiom"
              data={INDUSTRY_OPTION}
              onChange={(val) => form.setValue("industry", val)}
              error={errors.industry?.message as string | undefined}
            />
          </Input.Wrapper>
        </Flex>

        <Input.Wrapper flex={1} label="Description">
          <Textarea
            placeholder="Description"
            {...register("description")}
            error={errors?.description?.message as string}
            autosize
            minRows={3}
          />
        </Input.Wrapper>

        <Input.Wrapper flex={1} label="Preferred language">
          <Select
            flex={1}
            leftSection={<IconFilterFilled size="12px" />}
            radius="sm"
            error={errors?.language?.message as string}
            {...register("language")}
            onChange={(val) => form.setValue("language", val)}
            data={LANG_OPTION}
          />
        </Input.Wrapper>
      </Flex>

      <Flex mt={10} w="100%" justify="right">
        <Button type="submit">Next</Button>
      </Flex>
    </form>
  );
};

const KnowledgementForm = ({ setPayloadData }) => {
  const { data } = useListDocuments({
    accountId: 3,
    sourceType: "knowledment",
    params: {
      // search,
      // searchFields: "name,emails,websites",
    },
  });

  const documents = data?.pages.flat() ?? [];

  return (
    <Flex direction="column" gap={10}>
      <Text>
        Add documents and linkes to help Postfy to unerstand your business
        generating the best content
      </Text>

      <Flex gap={20} direction="column">
        <ModalAddDocuments
          element={
            <Button size="xs" radius="xs">
              Add knowledgment to brain
            </Button>
          }
          accountId={2}
          sourceType="brain"
        />

        <Divider />

        {documents.length === 0 && (
          <NoContentBlock
            image="/images/calendar.svg"
            title="No knowledgment documents"
            description="Add knowledgment documents to create a good and focused content"
          />
        )}

        {documents.map((document) => (
          <Card withBorder={false} p={15}>
            <Flex direction="column" gap={10}>
              <Flex align="center" gap={20} justify="space-between">
                <Flex gap={10} align="center">
                  <IconFile size="20px" />

                  <Text fw={600} size="md">
                    {document.title}
                  </Text>
                </Flex>

                <Button bg="red" size="xs" radius="sm">
                  <IconTrash size="12px" />
                </Button>
              </Flex>

              <Flex
                style={{
                  borderRadius: "5px",
                }}
                p={10}
                bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
              >
                Text aodias aoi asdasi Text aodias aoi asdasi Text aodias aoi
                asdasi Text aodias aoi asdasi Text aodias aoi asdasi Text aodias
                aoi asdasi Text aodias aoi asdasi...
              </Flex>
            </Flex>
          </Card>
        ))}

        <Flex mt={10} w="100%" justify="right">
          <Button onClick={() => setPayloadData({}, "knowledgment")}>
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

const ToneForm = ({ setPayloadData }) => {
  const { mutate: updateRecord, isPending } = useUpdate({
    entity: "accounts",
    recordId: 3,
  });

  const toneSchema = yup.object().shape({
    toneOfVoice: yup.string().required(),
    audience: yup.string().required(),
    useEmojis: yup.boolean().required(),
    additionalInstructions: yup.string().optional(),
  });

  const form = useForm<any>({
    resolver: yupResolver(toneSchema),
    defaultValues: {
      useEmojis: {
        useEmojis: false,
      },
    },
  });

  const errors = form.formState.errors;
  const register = form.register;

  const onSubmit = (payload: any) => {
    console.log("payloadpayload", payload);

    updateRecord(payload);

    setPayloadData(payload, "tone");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex direction="column" gap={10}>
        <Text>
          Specify your bran's tone of coive and audience target to generate
          appropiated content
        </Text>

        <Flex gap={20} direction="column">
          <Input.Wrapper flex={1} label="Tone of voice">
            <Textarea
              error={errors?.toneOfVoice?.message as string}
              {...register("toneOfVoice")}
              placeholder="Tone of voice. Ex: Expert in the area, Firendly, techincal but with accessible, casual and homorous, etc."
              autosize
              minRows={3}
            />
          </Input.Wrapper>

          <Input.Wrapper flex={1} label="Traget audience">
            <Textarea
              {...register("audience")}
              placeholder="B2B Business dcision-makes, healthcare professionals, tech-savvy, millenials, etc."
              autosize
              error={errors?.audience?.message as string}
              minRows={3}
            />
          </Input.Wrapper>

          <Divider />

          <Flex flex={1}>
            <Checkbox
              label="Use emojis"
              {...register("useEmojis")}
              // disabled={isPending}
            />
          </Flex>

          <Input.Wrapper
            flex={1}
            label="Additional content instructions(optional)"
            error={errors?.additionalInstructions?.message as string}
          >
            <Textarea
              placeholder="Any specific instructions for content generation (e.g., avoid certain topics, focus on specific themes, etc.)"
              autosize
              minRows={2}
              {...register("additionalInstructions")}
            />
          </Input.Wrapper>
        </Flex>
      </Flex>
      <Flex mt={10} w="100%" justify="right">
        <Button type="submit">Next</Button>
      </Flex>
    </form>
  );
};

const SocialForm = () => {
  const { data } = useList({
    entity: "social-profiles",
    params: {},
  });

  const socialProfiles = (data?.pages.flat() ?? []) as SocialProfile[];

  const open = () => {
    const authUrl = `${BASE_BACKEND_URL}/social-profiles/facebook/auth`;
    window.open(authUrl, "fbAuth", "width=600,height=700");

    const popup = window.open(authUrl, "fbAuth", "width=600,height=700");

    if (!popup) {
      console.error("Não foi possível abrir o popup");
      return;
    }

    // Checa mensagens do popup
    const messageListener = (ev: MessageEvent) => {
      console.log("🔥 CHEGOU ALGUMA MENSAGEM:", ev.data);

      // Se quiser, você pode fechar o listener quando receber algo
      // window.removeEventListener("message", messageListener);
    };
    window.addEventListener("message", messageListener);

    // Intervalo para checar se o popup foi fechado
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        console.log("Popup foi fechado!");
        clearInterval(checkPopupClosed);
        window.removeEventListener("message", messageListener);
      }
    }, 500);
  };

  return (
    <Flex direction="column">
      <Text>
        Connect your social media accounts to start the content generating
      </Text>

      <Flex wrap="wrap" gap={20}>
        {["facebook"].map(() => (
          <Card w="calc(50% - 10px)">
            <Text>Instagram</Text>
            <Text>Connect your instagram account</Text>

            <Button onClick={open}>Connect Facebook</Button>

            <Divider my={20} />

            {socialProfiles.map((profile) => (
              <div>{profile.profileTitle}</div>
            ))}
          </Card>
        ))}
      </Flex>

      <Flex>
        <Button>Conclude</Button>
      </Flex>
    </Flex>
  );
};
