"use client"

import { FC, ReactNode, useState } from "react";
import { Modal, Button, Flex, Select, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type ButtonFormTaskProps = {
    element: ReactNode;
}

export const ButtonFormTask:FC<ButtonFormTaskProps> = ({element}) => {
    const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
    <Flex onClick={open}>
        {element}
    </Flex>

      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="Criar Task"
        centered
      >
        <Flex direction="column" gap="md">
          <Select
            label="Projeto"
            placeholder="Selecione o projeto"
            data={[
              { label: "Project 1", value: "proj-1" },
              { label: "Project 2", value: "proj-2" },
            ]}
          />

          <Select
            label="Categoria"
            placeholder="Selecione a categoria"
            data={[
              { label: "Segmentation", value: "Segmentation" },
              { label: "Marketing", value: "Marketing" },
            ]}
          />

          <Select
            label="People"
            placeholder="Selecione a pessoa"
            data={[
              { label: "Segmentation", value: "Segmentation" },
              { label: "Marketing", value: "Marketing" },
            ]}
          />

          <Textarea minRows={3} label="Descrição" autosize placeholder="Descrição da task" />
          
          <Button onClick={close}>Salvar</Button>
        </Flex>
      </Modal>
    </>
  );
};