import {
  Modal,
  Flex,
  Textarea,
  Button,
  Group,
  FileButton,
  TagsInput,
} from "@mantine/core";
import { FC, ReactNode, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddMedia } from "@/apis/media-bank.api";

type AddDocuments = {
  element: ReactNode;
  accountId: number;
};

type FormData = {
  description: string;
  tags: string[];
  file: File | null;
};

const schema = Yup.object().shape({
  file: Yup.mixed().required("Adicione uma imagem ou vídeo"),
  description: Yup.string().trim().required("A descrição é obrigatória"),
  tags: Yup.array().of(Yup.string()).min(1, "Adicione pelo menos 1 tag"),
});

export const ModalAddMedia: FC<AddDocuments> = ({ element }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      file: null,
      description: "",
      tags: [],
    },
  });

  const { mutate: addMedia } = useAddMedia(2);

  const onSubmit = (data: FormData) => {

    addMedia(data);
    console.log("Dados válidos:", data);
    // close();
    // reset();
  };

  return (
    <>
      <Flex onClick={open} style={{ cursor: "pointer" }}>
        {element}
      </Flex>

      <Modal size="lg" opened={opened} title="Add media" onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={10}>
            {/* Upload */}
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <>
                  <FileButton
                    onChange={(file) => field.onChange(file)}
                    accept="image/*,video/*"
                  >
                    {(props) => (
                      <Button {...props} variant="outline">
                        {field.value
                          ? `Selecionado: ${(field.value as File).name}`
                          : "Upload imagem ou vídeo"}
                      </Button>
                    )}
                  </FileButton>
                  {errors.file && (
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.file.message}
                    </span>
                  )}
                </>
              )}
            />

            {/* Descrição */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Descrição"
                  placeholder="Digite uma descrição..."
                  value={field.value}
                  onChange={field.onChange}
                  minRows={2}
                  error={errors.description?.message}
                />
              )}
            />

            {/* Tags */}
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagsInput
                  label="Tags"
                  placeholder="Digite e pressione Enter"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.tags?.message}
                />
              )}
            />

            <Group position="right">
              <Button type="submit">Salvar</Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  );
};