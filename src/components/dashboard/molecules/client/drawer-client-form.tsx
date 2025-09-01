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
} from "@mantine/core";
import { FC, ReactNode } from "react";

type FormValues = {
  companyName: string;
  emails: { value: string }[];
  phones: { value: string }[];
  websites: { value: string }[];
  project: string;
  activeClient: boolean;
  hasNotes: boolean;
  note: string;
};

type DrawerClientFormProps = {
  element: ReactNode;
};

export const DrawerClientForm: FC<DrawerClientFormProps> = ({ element }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      companyName: "Enterness company",
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
                name="companyName"
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
                    data={[
                      { value: "Active", label: "Active" },
                      { value: "Inactive", label: "Inactive" },
                      { value: "Prospect", label: "Prospect" },
                    ]}
                  />
                )}
              />

              {/* Notes */}
              <Controller
                name="note"
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
