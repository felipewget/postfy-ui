"use client";

import { Datepicker } from "@/components/dashboard/atoms/datepicker";
import { ButtonFormTask } from "@/components/dashboard/molecules/button-form-task";
import { BoardTodo } from "@/components/dashboard/organisms/board-todo";
import { TextCentralized } from "@/components/site/molecules/text-centralized";
import { TextNextToImage } from "@/components/site/molecules/text-next-to-image";
import {
  Button,
  Card,
  Divider,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
  Textarea,
  Select,
  Group,
} from "@mantine/core";
import { IconBrandWhatsapp, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  subject: string;
  message: string;
  companySize: string;
};

export default function Contact() {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      companyName: "",
      name: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      subject: "",
      message: "",
      companySize: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    reset();
  };

  return (
    <Flex w="100%" direction="column" align="center">
      <Flex w="100%" justify="center" bg="blue">
        <Flex w="950px" py={5}>
          <Flex gap={5} align="center">
            <Text>Talk with one</Text>

            <Text px={10} py={5} bg="yellow">
              TeamTime
            </Text>

            <Text>expert</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex w="950px" justify="space-between">
        <Flex direction="column">
          <Flex direction="column" py={20}>
            <Text size="2xl">Contact</Text>

            <Text>
              Align work planning and delivery to strategy across the entire
              enterprise.
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* --- Formulário adicionando aqui --- */}
      <Flex w="950px" direction="column" gap={20} py={20}>
        <Card shadow="sm" p="lg" withBorder={false}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex gap={20}>
              {/* Company Name */}
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextInput
                    flex={1}
                    {...field}
                    label="Company Name"
                    mb="sm"
                    required
                  />
                )}
              />

              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    flex={1}
                    {...field}
                    label="Your Name"
                    mb="sm"
                    required
                  />
                )}
              />
            </Flex>

            <Flex gap={20}>
              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    flex={1}
                    {...field}
                    label="Email"
                    type="email"
                    mb="sm"
                    required
                  />
                )}
              />

              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextInput flex={1} {...field} label="Phone" mb="sm" />
                )}
              />
            </Flex>

            {/* Subject */}
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextInput {...field} label="Subject" mb="sm" />
              )}
            />

            {/* Message */}
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea {...field} label="Message" mb="sm" required />
              )}
            />

            {/* Company Size */}
            <Controller
              name="companySize"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Company Size"
                  data={[
                    { value: "1-10", label: "1-10" },
                    { value: "11-50", label: "11-50" },
                    { value: "51-200", label: "51-200" },
                    { value: "201-500", label: "201-500" },
                    { value: "501+", label: "501+" },
                  ]}
                  mb="sm"
                  placeholder="Select company size"
                />
              )}
            />

            <Flex justify="right" mt="md">
              <Button type="submit">Send my message </Button>
            </Flex>
          </form>
        </Card>
      </Flex>
      {/* --- Formulário finalizado --- */}

      <Flex w="950px">
        <Card withBorder={false} w="100%">
          <Flex gap={20} justify="space-between" align="center">
            <Flex direction="column">
              <Text fw={500}>Whatsapp canal direto</Text>

              <Text>Se prferir, fale diretamente conosc via whatsapp</Text>
            </Flex>

            <Button leftSection={<IconBrandWhatsapp />}>Start a talk</Button>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
