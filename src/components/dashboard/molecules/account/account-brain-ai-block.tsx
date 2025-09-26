import { useListDocuments } from "@/apis/knowledgement-document.api";
import { Account } from "@/declarators";
import { Flex, Card, Button, Text, Select } from "@mantine/core";
import { IconClock, IconFile, IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import { ModalAddDocuments } from "../knowledgment-document/modal-add-document";

export const AccountBrainAiBlock: FC<{ account: Account }> = ({ account }) => {
  const { data } = useListDocuments({
    accountId: account.id,
    sourceType: "brain",
    params: {
      // search,
      // searchFields: "name,emails,websites",
    },
  });

  const documents = data?.pages.flat() ?? [];

  return (
    <Card flex={1} withBorder={false}>
      <Flex direction="column" gap={20}>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={10}>
            <IconClock />

            <Text>Brain AI</Text>
          </Flex>

          <ModalAddDocuments
            element={<Button radius="md">Add knowledgment to brain</Button>}
            accountId={account.id}
            sourceType="brain"
          />
        </Flex>

        <Flex direction="column" gap={10}>
          {documents.map((document) => (
            <Card withBorder={false} p={15}>
              <Flex direction="column" gap={10}>
                <Flex align="center" gap={20} justify="space-between">
                  <Flex gap={10} align="center">
                    <IconFile size="20px" />

                    <Text fw={600} size="md">
                      {document.title}
                    </Text>
                  </Flex>

                  <Button bg="red" size="xs" radius="sm">
                    <IconTrash size="12px" />
                  </Button>
                </Flex>

                <Flex
                  style={{
                    borderRadius: "5px",
                  }}
                  p={10}
                  bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
                >
                  Text aodias aoi asdasi Text aodias aoi asdasi Text aodias aoi
                  asdasi Text aodias aoi asdasi Text aodias aoi asdasi Text
                  aodias aoi asdasi Text aodias aoi asdasi...
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
