import { useUpdate } from "@/apis/crud.api";
import { INDUSTRY_OPTION, LANG_OPTION } from "@/constants";
import { Account } from "@/declarators";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Flex,
  Card,
  Input,
  Select,
  Textarea,
  Divider,
  Checkbox,
  Button,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconClock, IconFilterFilled } from "@tabler/icons-react";
import { AxiosError } from "axios";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export const AccountGenericBlock: FC<{ account: Account }> = ({ account }) => {
  const onLoginSuccess = (response: { access_token: string }) => {};

  const onError = ({ response }: AxiosError) => {};

  const { mutate: updateRecord, isPending } = useUpdate({
    entity: "accounts",
    recordId: account.id,
  });
  //   const { mutate: login, isPending } = useCreateSession(
  //     onLoginSuccess,
  //     onError
  //   );
  // console.log("accountaccount", account.accountName);

  const form = useForm<any>({
    resolver: yupResolver(loginSchema),
    defaultValues: account,
  });

  const errors = form.formState.errors;
  const register = form.register;

  console.log("errors", errors);

  //   const onSubmit = (payload: RegisterPayload) => login(payload);
  const onSubmit = (payload: any) => {
    updateRecord(payload);

    notifications.show({
      message: `Account updated successfully`,
      position: "bottom-right",
      icon: <IconCheck size={20} />,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  label="Account name"
                  error={errors?.accountName?.message as string}
                >
                  <Input
                    disabled={isPending}
                    placeholder="Account name"
                    {...register("accountName")}
                    error={errors.accountName?.message as string | undefined}
                  />
                </Input.Wrapper>

                <Select
                  flex={1}
                  disabled={isPending}
                  label="Industry"
                  placeholder="Select the newsletter idiom"
                  data={INDUSTRY_OPTION}
                  onChange={(val) => form.setValue("industry", val)}
                  error={errors?.industry?.message as string}
                />
              </Flex>

              <Flex flex={1}>
                <Input.Wrapper
                  flex={1}
                  label="Description"
                  error={errors?.description?.message as string}
                >
                  <Textarea
                    disabled={isPending}
                    placeholder="Description"
                    {...register("description")}
                    autosize
                    minRows={3}
                  />
                </Input.Wrapper>
              </Flex>

              <Flex flex={1}>
                <Input.Wrapper
                  flex={1}
                  label="Tone of voice"
                  error={errors?.toneOfVoice?.message as string}
                >
                  <Textarea
                    disabled={isPending}
                    {...register("toneOfVoice")}
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
                  error={errors?.audience?.message as string}
                >
                  <Textarea
                    disabled={isPending}
                    {...register("audience")}
                    placeholder="Traget audience. Ex: developers, publishers, b2b, b2c"
                    autosize
                    minRows={3}
                  />
                </Input.Wrapper>
              </Flex>

              <Divider />

              <Flex gap={10} flex={1} align="center">
                <Select
                  disabled={isPending}
                  flex={1}
                  label="Preferred language"
                  leftSection={<IconFilterFilled size="12px" />}
                  radius="sm"
                  {...register("language")}
                  onChange={(val) => form.setValue("language", val)}
                  data={LANG_OPTION}
                />

                <Flex p={10} flex={1} mt={25}>
                  <Checkbox
                    label="Use emojis"
                    {...register("useEmojis")}
                    disabled={isPending}
                  />
                </Flex>
              </Flex>

              <Flex flex={1}>
                <Input.Wrapper
                  flex={1}
                  label="Additional content instructions"
                  error={errors?.additionalInstructions?.message as string}
                >
                  <Textarea
                    disabled={isPending}
                    placeholder="Any specific instructions for content generation (e.g., avoid certain topics, focus on specific themes, etc.)"
                    autosize
                    minRows={2}
                    {...register("additionalInstructions")}
                  />
                </Input.Wrapper>
              </Flex>
            </Flex>

            <Divider />

            <Flex justify="end">
              <Button type="submit" loading={isPending}>
                Save changes
              </Button>
            </Flex>
          </Flex>
        </Card>
      </form>
    </FormProvider>
  );
};

const loginSchema = yup.object().shape({});
