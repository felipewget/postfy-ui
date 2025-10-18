import {
  Modal,
  SegmentedControl,
  Card,
  Flex,
  Input,
  Textarea,
  Button,
  FileInput,
  Select,
  Text,
  Loader,
} from "@mantine/core";
import {
  IconFile,
  IconFilterFilled,
  IconPdf,
  IconUpload,
} from "@tabler/icons-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import {
  useAddDocumentByContent,
  useAddDocumentByDocument,
  useAddDocumentByLink,
} from "@/apis/knowledgement-document.api";
import { useDisclosure } from "@mantine/hooks";
import { useAddTicket } from "@/apis/ticket.api";
import { notifications } from "@mantine/notifications";

type AddTicket = {
  accountId: number;
  element: ReactNode;
};

export const ModalAddTicket: FC<AddTicket> = ({ accountId, element }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const onSuccess = () => {
    notifications.show({
      title: "Ticket created with success",
      message: "Our specialists are looking your case right now",
    });

    reset();
    close();
  };

  const { mutate: addTicket, isPending: isLoading } = useAddTicket(
    { accountId },
    onSuccess
  );

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  const onSubmit = (data: any) => addTicket(data);

  if (isLoading) {
    return (
      <>
        <Flex onClick={open}>{element}</Flex>

        <Modal
          size="lg"
          opened={opened}
          title={
            <Text size="sm" fw={500}>
              Add content
            </Text>
          }
          onClose={close}
          radius="sm"
          styles={{
            header: {
              backgroundColor:
                "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))",
            },
            content: {
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "0px",
              paddingRight: "0px",
              backgroundColor:
                "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))",
              border: "none",
            },
          }}
        >
          <Flex direction="column">
            <Flex p={50} justify="center">
              <Loader type="dots" />
            </Flex>
          </Flex>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Flex onClick={open}>{element}</Flex>

      <Modal
        size="lg"
        opened={opened}
        title={
          <Text size="sm" fw={500}>
            Add content
          </Text>
        }
        onClose={close}
        radius="sm"
        styles={{
          header: {
            backgroundColor:
              "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))",
          },
          content: {
            paddingTop: "0px",
            paddingBottom: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            backgroundColor:
              "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))",
            border: "none",
          },
        }}
      >
        <Flex direction="column">
          <Text mb={20} size="sm" c="dimmed">
            Create a support ticket for any questions, technical issues, or
            billing inquiries. Our team typically responds within 24 hours.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={10}>
              <Select
                label="Category"
                leftSection={<IconFilterFilled size="12px" />}
                radius="xs"
                placeholder="Select the ticket category"
                onChange={(category) =>
                  category ? setValue("category", category) : reset("category")
                }
                data={SUPPORT_SUBJECT_OPTION}
                error={errors?.category?.message as string}
              />

              <Input.Wrapper
                flex={1}
                label="subject"
                {...register("subject")}
                error={errors?.subject?.message as string}
              >
                <Input placeholder="Subject" {...register("subject")} />
              </Input.Wrapper>

              <Textarea
                autosize
                placeholder="Message"
                minRows={6}
                error={errors.message?.message}
                {...register("message")}
              />
            </Flex>

            <Flex gap={10} justify="end" mt={10}>
              <Button radius="sm" size="xs" variant="light">
                Cancel
              </Button>

              <Button radius="sm" size="xs" type="submit">
                Add content
              </Button>
            </Flex>
          </form>
        </Flex>
      </Modal>
    </>
  );
};

const ticketSchema = yup.object({
  category: yup.string().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

const SUPPORT_SUBJECT_OPTION = [
  { label: "Technical Issue", value: "technical" },
  { label: "Billing", value: "billing" },
  { label: "Account Access", value: "account" },
  { label: "Feature Request", value: "feature" },
  { label: "Bug Report", value: "bug" },
  { label: "General Inquiry", value: "general" },
  { label: "Other", value: "other" },
];
