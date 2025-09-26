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
import { useDashboardContext } from "../../templates/navbar";
import {
  useAddDocumentByContent,
  useAddDocumentByDocument,
  useAddDocumentByLink,
} from "@/apis/knowledgement-document.api";
import { useDisclosure } from "@mantine/hooks";
import { useAddTicket } from "@/apis/ticket.api";

type AddTicket = {
  accountId: number;
  element: ReactNode;
};

export const ModalAddTicket: FC<AddTicket> = ({ accountId, element }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: addTicket } = useAddTicket({ accountId });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  const onSubmit = (data: any) => addTicket(data);

  return (
    <>
      <Flex onClick={open}>{element}</Flex>

      <Modal size="lg" opened={opened} title="Add content" onClose={close}>
        <Flex direction="column">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={10}>
              <Select
                leftSection={<IconFilterFilled size="12px" />}
                radius="sm"
                onChange={(e) => setValue("category", e)}
                data={[
                  { label: "Technical Issue", value: "technical" },
                  { label: "Billing", value: "billing" },
                  { label: "Account Access", value: "account" },
                  { label: "Feature Request", value: "feature" },
                  { label: "Bug Report", value: "bug" },
                  { label: "General Inquiry", value: "general" },
                  { label: "Other", value: "other" },
                ]}
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

            <Flex gap={10} justify="end">
              <Button radius="md" variant="light">
                Cancel
              </Button>

              <Button radius="md" type="submit">
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
