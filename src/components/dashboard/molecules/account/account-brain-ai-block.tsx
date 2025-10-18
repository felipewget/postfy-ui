import { useListDocuments } from "@/apis/knowledgement-document.api";
import { Account } from "@/declarators";
import { Flex, Card, Button, Text, Select, Loader } from "@mantine/core";
import { IconClock, IconFile, IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import { ModalAddDocuments } from "../knowledgment-document/modal-add-document";
import { NoContentBlock } from "../no-content-block";
import { KnowledgmentDocumentBlock } from "../knowledgment-document/knowledgment-document-block";

export const AccountBrainAiBlock: FC<{ account: Account }> = ({ account }) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useListDocuments({
    accountId: account.id,
    sourceType: "brain",
    params: {},
  });

  const documents = data?.pages.flat() ?? [];

  return (
    <Card flex={1} withBorder={false} radius="sm">
      <Flex direction="column" gap={20}>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={10}>
            <IconClock />

            <Text>Brain AI</Text>
          </Flex>

          <ModalAddDocuments
            element={
              <Button size="xs" radius="sm">
                Add knowledgment to brain
              </Button>
            }
            accountId={account.id}
            sourceType="brain"
          />
        </Flex>

        <Flex direction="column" gap={10}>
          {isLoading && (
            <Flex p={50} justify="center">
              <Loader type="dots" />
            </Flex>
          )}

          {!isLoading &&
            documents.map((document) => <KnowledgmentDocumentBlock document={document} />)}

          {!isLoading && documents.length === 0 && (
            <NoContentBlock
              image="/images/files.svg"
              title="No brain added"
              description="Crete a custom new publication or program a campaign to create your publications automatically"
              footer={
                <Flex gap={10}>
                  <ModalAddDocuments
                    element={
                      <Button radius="sm" size="xs">
                        Add documents with informations about your brand
                      </Button>
                    }
                    accountId={account.id}
                    sourceType="brain"
                  />
                </Flex>
              }
            />
          )}

          {hasNextPage && (
              <Flex>
                <Button
                  mt={10}
                  size="xs"
                  radius="xs"
                  disabled={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </Button>
              </Flex>
            )}
        </Flex>
      </Flex>
    </Card>
  );
};
