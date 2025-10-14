import {
  Modal,
  SegmentedControl,
  Card,
  Flex,
  Input,
  Textarea,
  Button,
  FileInput,
} from "@mantine/core";
import { IconFile, IconPdf, IconUpload } from "@tabler/icons-react";
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

type AddDocuments = {
  element: ReactNode;
  accountId: number;
  sourceType: "knowledment" | "brain";
};

export const ModalAddDocuments: FC<AddDocuments> = ({ element, ...props }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [tab, setTab] = useState<"file" | "link" | "content">("file");

  return (
    <>
      <Flex onClick={open}>{element}</Flex>

      <Modal size="lg" opened={opened} title="Add content" onClose={close}>
        <SegmentedControl
          w="100%"
          onChange={(v) => setTab(v as any)}
          data={[
            { label: "File", value: "file" },
            { label: "Link", value: "link" },
            { label: "Direct content", value: "content" },
          ]}
          radius="md"
          size="sm"
          fullWidth={false}
          styles={(theme) => ({
            control: {
              border: "none", // remove a divisória entre os itens
            },
          })}
        />

        {tab === "file" && <FormDocument {...props} />}
        {tab === "link" && <FormLink {...props} />}
        {tab === "content" && <FormContent {...props} />}
      </Modal>
    </>
  );
};

export const FormContent: FC<AddDocuments> = ({ accountId, sourceType }) => {
  const { mutate: addKnowledgmentDocument } = useAddDocumentByContent({
    accountId,
    sourceType,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contentSchema),
  });

  const onSubmit = (data: any) => addKnowledgmentDocument(data);

  return (
    <Flex direction="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card my={20}>
          <Flex direction="column" gap={10}>
            <Input.Wrapper
              flex={1}
              label="title"
              {...register("title")}
              error={errors?.title?.message as string}
            >
              <Input placeholder="Title" {...register("title")} />
            </Input.Wrapper>

            <Textarea
              placeholder="Content"
              minRows={6}
              error={errors.content?.message}
              {...register("content")}
            />
          </Flex>
        </Card>

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
  );
};

export const FormLink: FC<AddDocuments> = ({ accountId, sourceType }) => {
  const { mutate: addKnowledgmentLink } = useAddDocumentByLink({
    accountId,
    sourceType,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(linkSchema),
  });

  const onSubmit = (data: any) => addKnowledgmentLink(data);

  return (
    <Flex direction="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card my={20}>
          <Flex direction="column" gap={10}>
            <Input.Wrapper flex={1} label="Link" error={errors.link?.message}>
              <Input
                type="text"
                placeholder="https://yourlink.com"
                {...register("link")}
              />
            </Input.Wrapper>
          </Flex>
        </Card>

        <Flex gap={10} justify="end">
          <Button radius="md" variant="light">
            Cancel
          </Button>

          <Button radius="md" type="submit">
            Add link
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export const FormDocument: FC<AddDocuments> = ({ accountId, sourceType }) => {
  const { mutate: addKnowledgmentDocument } = useAddDocumentByDocument({
    accountId,
    sourceType,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(documentSchema),
  });

  const onSubmit = (data: any) => addKnowledgmentDocument(data);

  return (
    <Flex direction="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card my={20}>
          <Flex direction="column" gap={10}>
            <FileInput
              flex={1}
              leftSection={
                <Flex gap={10}>
                  <IconFile size={16} />
                </Flex>
              }
              rightSection={
                <Flex gap={10}>
                  <IconUpload size={16} />
                </Flex>
              }
              label="Upload your image or video"
              placeholder="Your media"
              leftSectionPointerEvents="none"
              error={errors.file?.message}
              onChange={(f) => setValue("file", f)}
            />
          </Flex>
        </Card>

        <Flex gap={10} justify="end">
          <Button radius="md" variant="light">
            Cancel
          </Button>

          <Button radius="md" type="submit">
            Add document
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

const contentSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().min(10, "Content must be at least 10 characters"),
});

const linkSchema = yup.object({
  link: yup.string().url("Invalid URL").required("Link is required"),
});

const documentSchema = yup.object({
  file: yup
    .mixed<File>()
    .required("File is required")
    .test("fileType", "Only PDF, TXT, DOC, DOCX allowed", (value) => {
      if (!value) return false;
      const allowedTypes = [
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return allowedTypes.includes(value.type);
    }),
});
