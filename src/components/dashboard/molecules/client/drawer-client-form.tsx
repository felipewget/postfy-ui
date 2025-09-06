import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
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
} from "@mantine/core";
import { FC, ReactNode } from "react";
import { Client } from "@/declarators";
import { useCreate, useUpdate } from "@/api/dashboard";
import { notifications } from "@mantine/notifications";

type FormValues = {
  name: string;
  emails: { value: string }[];
  phones: { value: string }[];
  websites: { value: string }[];
  project: string;
  status: string;
  hasNotes: boolean;
  notes: string;
};

type DrawerClientFormProps = {
  element: ReactNode;
  client?: Client;
};

export const DrawerClientForm: FC<DrawerClientFormProps> = ({
  element,
  client,
}) => {
  const queryClient = useQueryClient();

  const onSuccessCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-clients"] });

    notifications.show({
      title: "Create",
      message: "Client create with success!"
    });

    close();
  };

  const onSuccessUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-clients"] });

    notifications.show({
      title: "Updated",
      message: "Client updated with success!"
    });

    close();
  };

  const { mutate: createClient } = useCreate(
    { entity: "clients" },
    onSuccessCreated
  );
  const { mutate: updateClient } = useUpdate(
    { entity: "clients", recordId: client?.id ?? 0 },
    onSuccessUpdated
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: client?.name,
      emails: (client?.emails ?? []).map((value) => ({ value })),
      phones: (client?.phones ?? []).map((value) => ({ value })),
      websites: (client?.websites ?? []).map((value) => ({ value })),
      project: client?.name,
      status: client?.status ?? "active",
      hasNotes: (client?.notes ?? "")?.length > 0,
      notes: client?.notes,
    },
  });

  const emailsArray = useFieldArray({ control, name: "emails" });
  const phonesArray = useFieldArray({ control, name: "phones" });
  const websitesArray = useFieldArray({ control, name: "websites" });

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      emails: (data?.emails ?? []).map((field) => field.value),
      websites: (data?.websites ?? []).map((field) => field.value),
      phones: (data?.phones ?? []).map((field) => field.value),
      notes: data.notes,
      status: data.status,
    };

    client ? updateClient(payload) : createClient(payload);
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
                  <TextInput {...field} label="Company Name" required />
                )}
              />

              <Divider />

              {/* Emails */}
              {emailsArray.fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`emails.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Flex w="100%" gap={10}>
                      <TextInput
                        flex={1}
                        {...field}
                        label={index > 0 ? "" : `Emails`}
                        required
                      />
                      {index > 0 && (
                        <Button
                          radius="sm"
                          onClick={() => emailsArray.remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Flex>
                  )}
                />
              ))}
              <Button
                size="xs"
                variant="outline"
                onClick={() => emailsArray.append({ value: "" })}
              >
                + Add Email
              </Button>

              {/* Phones */}
              {phonesArray.fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`phones.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Flex w="100%" gap={10}>
                      <TextInput
                        flex={1}
                        {...field}
                        label={index > 0 ? "" : `Phones`}
                        required
                      />
                      {index > 0 && (
                        <Button
                          radius="sm"
                          onClick={() => phonesArray.remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Flex>
                  )}
                />
              ))}
              <Button
                size="xs"
                variant="outline"
                onClick={() => phonesArray.append({ value: "" })}
              >
                + Add Phone
              </Button>

              {/* Websites */}
              {websitesArray.fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`websites.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Flex w="100%" gap={10}>
                      <TextInput
                        flex={1}
                        {...field}
                        label={index > 0 ? "" : `Websites`}
                        required
                      />
                      {index > 0 && (
                        <Button
                          radius="sm"
                          onClick={() => websitesArray.remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Flex>
                  )}
                />
              ))}
              <Button
                size="xs"
                variant="outline"
                onClick={() => websitesArray.append({ value: "" })}
              >
                + Add Website
              </Button>

              <Divider />

              {/* Status select */}
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    value={field.value}
                    onChange={field.onChange}
                    data={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                      { value: "prospect", label: "Prospect" },
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
