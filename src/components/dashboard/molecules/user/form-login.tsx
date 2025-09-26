"use client";

import { useCreateSession } from "@/apis/session.api";
import {
  Anchor,
  Button,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Text,
} from "@mantine/core";
import { Input } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCookie } from "@/utils";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { CreateSessionPayload } from "@/apis/session.api.types";
import { AutocompleteInput } from "../../atoms/inputs";

export const FormLogin = () => {
  const router = useRouter();

  const [responseError, setResponseError] = useState<string | undefined>();

  const onLoginSuccess = (response: { access_token: string }) => {
    createCookie("access_token", response.access_token, {
      // domain: "newsletters.com", // Para funcionar em todos os subdomínios
      path: "/",
      secure: false, // Se estiver testando localmente, deixe `false`
      sameSite: "Strict",
    });

    router.push("/");
  };

  const onError = ({ response }: AxiosError) =>
    setResponseError(response?.data?.message);

  const { mutate: login, isPending } = useCreateSession(
    onLoginSuccess,
    onError
  );

  const form = useForm<any>({ resolver: yupResolver(loginSchema) });

  const errors = form.formState.errors;
  const register = form.register;

  const onSubmit = (payload: CreateSessionPayload) => login(payload);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" flex={1} justify="center" gap={20}>
          <Text size="lg" fw={700}>
            Login
          </Text>

          <Input.Wrapper
            label="Your e-mail"
            error={errors?.email?.message as string}
          >
            <AutocompleteInput
              placeholder="Your email"
              sufixOptions={["gmail.com", "outlook.com", "yahoo.com"]}
              name="email"
            />
          </Input.Wrapper>

          <div>
            <Group justify="space-between" mb={5}>
              <Text
                component="label"
                htmlFor="your-password"
                size="sm"
                fw={500}
              >
                Your password
              </Text>

              <Anchor href="#" pt={2} fw={500} fz="xs">
                Forgot your password?
              </Anchor>
            </Group>

            <Input.Wrapper error={errors?.password?.message as string}>
              <PasswordInput
                placeholder="Your password"
                {...register("password")}
              />
            </Input.Wrapper>
          </div>

          <Text size="sm">
            By logging into your account, you agree to our Terms of Use and
            Privacy Policy.
          </Text>

          {responseError && (
            <Paper shadow="xs">
              <Flex direction="column" gap={5}>
                <Flex justify="space-between" align="center">
                  <Text>{responseError}</Text>

                  <IconX
                    size={18}
                    cursor="pointer"
                    onClick={() => setResponseError(undefined)}
                  />
                </Flex>
              </Flex>
            </Paper>
          )}

          <Button
            fullWidth
            loading={isPending}
            loaderProps={{ type: "dots" }}
            type="submit"
          >
            Login
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
};

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});
