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

type DrawerUserFormProps = {
  element: ReactNode;
};

export const DrawerUserForm: FC<DrawerUserFormProps> = ({ element }) => {
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
        title={<Title order={3}>Client</Title>}
        padding="sm"
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Stack spacing="sm">
              {/* Company Name */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Name" required />
                )}
              />

              <Divider />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Email" required />
                )}
              />

              <Flex gap={20}>
                <Controller
                  flex={1}
                  name="hurs[erWeek"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      label="Work hours per week"
                      required
                      rightSectionWidth={100}
                      rightSection={<Text>Hours</Text>}
                    />
                  )}
                />

                <Controller
                  flex={1}
                  name="Salary amount peer week"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      label="Work hours per week"
                      required
                      leftSectionWidth={50}
                      leftSection={<Text>R$</Text>}
                    />
                  )}
                />
              </Flex>

              {/* Notes */}
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} label="Notes" autosize minRows={3} />
                )}
              />
              
              <Divider />

              {/* Status select */}
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
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Role"
                    data={[
                      { value: "Project Manager", label: "Project Manager" },
                      { value: "Developer", label: "Developer" },
                      { value: "Jr. developer", label: "Jr. developer" },
                    ]}
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
