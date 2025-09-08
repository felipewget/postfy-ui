"use client";

import { FC, ReactNode, useEffect } from "react";
import {
  Modal,
  Button,
  Flex,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useCreate, useUpdate } from "@/api/dashboard";
import { Task } from "@/declarators";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// --- Schema de validação com Yup ---
const taskSchema = yup.object().shape({
  projectId: yup.string().required("Selecione um projeto"),
  categoryId: yup.string().required("Selecione uma categoria"),
  taskIdentifier: yup.string().required("Informe o identificador da task"),
  assignedTo: yup.string().required("Selecione uma pessoa"),
  date: yup.date().required("Selecione uma data"),
  description: yup.string().nullable(),
  status: yup
    .mixed<"todo" | "in_progress" | "done">()
    .oneOf(["todo", "in_progress", "done"], "Status inválido")
    .required(),
});

type TaskFormValues = yup.InferType<typeof taskSchema>;

type ButtonFormTaskProps = {
  element: ReactNode;
  task?: Task;
};

export const ButtonFormTask: FC<ButtonFormTaskProps> = ({ element, task }) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: createTask } = useCreate(
    { entity: "tasks" },
    () => {
      queryClient.invalidateQueries({ queryKey: ["crud-list-tasks"] });
      notifications.show({ title: "Create", message: "Task criada com sucesso!" });
      close();
    }
  );

  const { mutate: updateTask } = useUpdate(
    { entity: "tasks", recordId: task?.id ?? 0 },
    () => {
      queryClient.invalidateQueries({ queryKey: ["crud-list-tasks"] });
      notifications.show({ title: "Update", message: "Task atualizada com sucesso!" });
      close();
    }
  );
  
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      projectId: task?.projectId?.toString() ?? "",
      categoryId: task?.categoryId?.toString() ?? "",
      taskIdentifier: task?.taskIdentifier ?? "",
      assignedTo: task?.assignedTo?.toString() ?? "",
      date: task?.date ? new Date(task.date) : undefined,
      description: task?.description ?? "",
      status: (task?.status as TaskFormValues["status"]) ?? "todo",
    },
  });

  useEffect(() => {
  if (task) {
    reset({
      projectId: task.projectId?.toString() ?? "",
      categoryId: task.categoryId?.toString() ?? "",
      taskIdentifier: task.taskIdentifier ?? "",
      assignedTo: task.assignedTo?.toString() ?? "",
      date: task.date ? new Date(task.date) : undefined,
      description: task.description ?? "",
      status: task.status ?? "todo",
    });
  }
}, [task, reset]);

  const onSubmit = (values: TaskFormValues) => {
    if (task) {
      updateTask(values);
    } else {
      createTask(values);
    }
  };

  return (
    <>
      <Flex onClick={open}>{element}</Flex>

      <Modal opened={opened} onClose={close} size="lg" title="Criar Task" centered>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="md">
            {/* Projeto - Controller */}
            <Controller
              control={control}
              name="projectId"
              render={({ field }) => (
                <Select
                  label="Projeto"
                  placeholder="Selecione o projeto"
                  data={[
                    { label: "Project 1", value: "1" },
                    { label: "Project 2", value: "2" },
                  ]}
                  value={field.value ?? ""}
                  onChange={(v) => field.onChange(v)}
                  error={errors.projectId?.message as string | undefined}
                />
              )}
            />

            {/* Categoria - Controller */}
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <Select
                  label="Categoria"
                  placeholder="Selecione a categoria"
                  data={[
                    { label: "Segmentation", value: "1" },
                    { label: "Marketing", value: "2" },
                  ]}
                  value={field.value ?? ""}
                  onChange={(v) => field.onChange(v)}
                  error={errors.categoryId?.message as string | undefined}
                />
              )}
            />

            {/* Task Identifier - string normal */}
            <TextInput
              label="Task id"
              {...register("taskIdentifier")}
              error={errors.taskIdentifier?.message as string | undefined}
            />

            {/* Pessoa - Controller */}
            <Controller
              control={control}
              name="assignedTo"
              render={({ field }) => (
                <Select
                  label="Pessoa"
                  placeholder="Selecione uma pessoa"
                  data={[
                    { label: "Felipe", value: "1" },
                    { label: "Maria", value: "2" },
                  ]}
                  value={field.value ?? ""}
                  onChange={(v) => field.onChange(v)}
                  error={errors.assignedTo?.message as string | undefined}
                />
              )}
            />

            {/* DateInput já via Controller */}
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DateInput
                  label="Data"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.date?.message as string | undefined}
                />
              )}
            />

            <Textarea
              minRows={3}
              label="Descrição"
              autosize
              placeholder="Descrição da task"
              {...register("description")}
              error={errors.description?.message as string | undefined}
            />

            {/* Status - Controller */}
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  label="Status"
                  data={[
                    { label: "To do", value: "todo" },
                    { label: "In progress", value: "in_progress" },
                    { label: "Done", value: "done" },
                  ]}
                  value={field.value ?? "todo"}
                  onChange={(v) => field.onChange(v)}
                  error={errors.status?.message as string | undefined}
                />
              )}
            />

            <Button type="submit">Salvar</Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};