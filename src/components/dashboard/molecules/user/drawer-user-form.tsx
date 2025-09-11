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
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useCreate, useUpdate } from "@/api/dashboard";
import { User } from "@/declarators";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  work_hours_per_week: number; // horas semanais de trabalho
  price_per_hour: number; // valor/hora em R$
  notes?: string;
  role?: string; // ex: 'designer', 'developer', 'manager'
  status: "active" | "inactive";
};

type DrawerUserFormProps = {
  element: ReactNode;
  user?: User;
};

export const DrawerUserForm: FC<DrawerUserFormProps> = ({ element, user }) => {
  const queryClient = useQueryClient();

  const onSuccessCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-users"] });

    notifications.show({
      title: "Create",
      message: "Client create with success!",
    });

    close();
  };

  const onSuccessUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-users"] });

    notifications.show({
      title: "Updated",
      message: "Client updated with success!",
    });

    close();
  };

  const { mutate: createUser } = useCreate(
    { entity: "users" },
    onSuccessCreated
  );
  const { mutate: updateUser } = useUpdate(
    { entity: "users", recordId: user?.id ?? 0 },
    onSuccessUpdated
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
      password: user?.password,
      work_hours_per_week: user?.work_hours_per_week,
      price_per_hour: user?.price_per_hour,
      notes: user?.notes,
      role: user?.role,
      status: user?.status,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);

    user ? updateUser(data) : createUser(data);

    close();
    // close();
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
            <Stack h="calc(100vh - 107px)">
              <Flex
                direction="column"
                mt={20}
                flex={1}
                style={{
                  overflow: "auto",
                }}
              >
                <Stack>
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
                      name="work_hours_per_week"
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
                      name="price_per_hour"
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
                    name="notes"
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
                          { value: "active", label: "Active" },
                          { value: "inactive", label: "Inactive" },
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
                          {
                            value: "Project Manager",
                            label: "Project Manager",
                          },
                          { value: "Developer", label: "Developer" },
                          { value: "Jr. developer", label: "Jr. developer" },
                        ]}
                      />
                    )}
                  />
                </Stack>
              </Flex>

              <Flex direction="column" gap={10}>
                <Divider />

                <Group justify="end">
                  <Button variant="outline" onClick={close}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </Group>
              </Flex>
            </Stack>
          </div>
        </form>
      </Drawer>
    </>
  );
};
