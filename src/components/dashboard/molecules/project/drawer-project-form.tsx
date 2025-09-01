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
} from "@mantine/core";
import { FC, ReactNode } from "react";

type FormValues = {
  name: string;
  emails: { value: string }[];
  phones: { value: string }[];
  websites: { value: string }[];
  project: string;
  activeClient: boolean;
  hasNotes: boolean;
  note: string;
};

type DrawerProjectFormProps = {
  element: ReactNode;
};

export const DrawerProjectForm: FC<DrawerProjectFormProps> = ({ element }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "Enterness company",
      emails: [{ value: "felipe.wget@gmail.com" }],
      phones: [{ value: "+41 5689 7458" }],
      websites: [{ value: "https://google.com" }],
      project: "1 Project",
      activeClient: true,
      hasNotes: true,
      note: "",
    },
  });

  const emailsArray = useFieldArray({ control, name: "emails" });
  const phonesArray = useFieldArray({ control, name: "phones" });
  const websitesArray = useFieldArray({ control, name: "websites" });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
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

              <TagsInput label="Categories" allowDuplicates={false} />


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
                      { value: "Active", label: "Active" },
                      { value: "Inactive", label: "Inactive" },
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
                      { value: "Active", label: "Active" },
                      { value: "Inactive", label: "Inactive" },
                    ]}
                  />
                )}
              />

              <Controller
                name="team_members"
                control={control}
                render={({ field }) => (
                  <Select multiple label="Team members on the project" data={[
                    {label: 'ADAAAS', value: '131'}
                  ]} />
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
