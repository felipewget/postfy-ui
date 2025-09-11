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
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useCreate, useUpdate } from "@/api/dashboard";
import { Quote } from "@/declarators";

type FormValues = {
  title: string;
  client_id: string;
  project_id: string;
};

type DrawerQuoteFormProps = {
  element: ReactNode;
  quote?: Quote;
};

export const DrawerQuoteForm: FC<DrawerQuoteFormProps> = ({
  element,
  quote,
}) => {
  const queryClient = useQueryClient();

  const onSuccessCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-quotes"] });

    notifications.show({
      title: "Create",
      message: "Client create with success!",
    });

    close();
  };

  const onSuccessUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-quotes"] });

    notifications.show({
      title: "Updated",
      message: "Client updated with success!",
    });

    close();
  };

  const { mutate: createQuote } = useCreate(
    { entity: "quotes" },
    onSuccessCreated
  );
  const { mutate: updateQuote } = useUpdate(
    { entity: "quotes", recordId: quote?.id ?? 0 },
    onSuccessUpdated
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: quote?.title,
      project_id: quote?.project_id,
      client_id: quote?.client_id,
    },
  });

  const onSubmit = (data: FormValues) => {
    //  const { team_members, ...payload } = data;

    quote ? updateQuote(data) : createQuote(data);

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
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Quote title" required />
                )}
              />

              <Divider />

              <Controller
                name="client_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onChange={field.onChange}
                    data={[{ value: "1", label: "Amazon" }]}
                    label="Client"
                  />
                )}
              />

              <Controller
                name="project_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onChange={field.onChange}
                    data={[{ value: "1", label: "Project xxxx" }]}
                    label="Project"
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
