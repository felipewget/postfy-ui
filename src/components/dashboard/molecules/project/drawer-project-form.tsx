"use client";

import { useDisclosure } from "@mantine/hooks";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Drawer,
  Button,
  Group,
  TextInput,
  Checkbox,
  Stack,
  Title,
  Textarea,
  Flex,
  Divider,
  Select,
  Box,
  NumberInput,
  Text,
  TagsInput,
  MultiSelect,
} from "@mantine/core";
import { FC, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useCreate, useUpdate } from "@/api/dashboard";
import { Project } from "@/declarators";

type FormValues = {
  title: string;
  description?: string;
  categories: string[];
  notes?: string;
  stage: string;
  status: string;
  team_members: []; // ajustar depois se vier da API
};

type DrawerProjectFormProps = {
  element: ReactNode;
  project?: Project;
};

export const DrawerProjectForm: FC<DrawerProjectFormProps> = ({
  element,
  project,
}) => {
  const queryClient = useQueryClient();

  const onSuccessCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-projects"] });

    notifications.show({
      title: "Create",
      message: "Client create with success!",
    });

    close();
  };

  const onSuccessUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-projects"] });

    notifications.show({
      title: "Updated",
      message: "Client updated with success!",
    });

    close();
  };

  const { mutate: createProject } = useCreate(
    { entity: "projects" },
    onSuccessCreated
  );
  const { mutate: updateProject } = useUpdate(
    { entity: "projects", recordId: project?.id ?? 0 },
    onSuccessUpdated
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      categories: project?.categories ?? [],
      notes: project?.notes ?? "",
      stage: project?.stage ?? "",
      status: project?.status ?? "",
      // team_members: [], // ajustar depois se vier da API
      // name: "Enterness company",
      // emails: [{ value: "felipe.wget@gmail.com" }],
      // phones: [{ value: "+41 5689 7458" }],
      // websites: [{ value: "https://google.com" }],
      // project: "1 Project",
      // activeClient: true,
      // hasNotes: true,
      // note: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const { team_members, ...payload } = data;

    project ? updateProject(payload) : createProject(payload);

    close();
  };

  return (
    <>
      <Box onClick={open}>{element}</Box>

      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title={<Title order={3}>Project</Title>}
        padding="sm"
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Stack spacing="sm">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Title" required />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} label="Description" autosize required />
                )}
              />

              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    label="Categories"
                    placeholder="Pick value"
                    data={[
                      { value: "1", label: "React" },
                      { value: "2", label: "Angular" },
                      { value: "3", label: "Vue" },
                      { value: "4", label: "Svelte" },
                    ]}
                  />
                )}
              />

              {/* Notes */}
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} label="Notes" autosize minRows={3} />
                )}
              />

              <Divider />

              <Controller
                name="stage"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Stage"
                    data={[
                      { value: "briefing", label: "Briefing" },
                      { value: "done", label: "Done" },
                      { value: "job", label: "Job" },
                      { value: "in_progress", label: "In progress" },
                    ]}
                  />
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    data={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                  />
                )}
              />

              <Controller
                name="team_members"
                control={control}
                render={({ field }) => (
                  <Select
                    multiple
                    label="Team members on the project"
                    data={[{ label: "ADAAAS", value: "131" }]}
                  />
                )}
              />

              {/* Fixed footer */}
              <Group>
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </Group>
            </Stack>
          </div>
        </form>
      </Drawer>
    </>
  );
};
