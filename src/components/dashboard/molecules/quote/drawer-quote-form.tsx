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

type DrawerQuoteFormProps = {
  element: ReactNode;
};

export const DrawerQuoteForm: FC<DrawerQuoteFormProps> = ({ element }) => {
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
        title={<Title order={3}>Quote</Title>}
        padding="sm"
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Stack spacing="sm">
              <Controller
                name="quoteTitle"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Quote title" required />
                )}
              />

              <Divider />

               <Controller
                name="client"
                control={control}
                render={({ field }) => (
                  <Select data={[]} label="Client" />
                )}
              />

              <Controller
                name="project"
                control={control}
                render={({ field }) => (
                  <Select data={[]} label="Project" />
                )}
              />

              <Divider />

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
