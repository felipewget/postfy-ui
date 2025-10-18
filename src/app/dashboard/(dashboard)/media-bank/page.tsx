"use client";

import { useListMediaBank } from "@/apis/media-bank.api";
import { MediaCard } from "@/components/dashboard/molecules/media-bank/media-card";
import { ModalAddMedia } from "@/components/dashboard/molecules/media-bank/modal-add-media";
import { NoContentBlock } from "@/components/dashboard/molecules/no-content-block";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import { Media } from "@/declarators";
import { Button, Flex, Input } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Medias() {
  const [search, setSearch] = useDebouncedState("", 300);
  const { selectedAccount } = useDashboardContext();

  
  const { data } = useListMediaBank({
    accountId: selectedAccount?.id ?? 0,
    params: {
      search
    },
  });
  
  if (!selectedAccount) return null;
  
  const medias = (data?.pages.flat() ?? []) as Media[];

  return (
    <ListTemplate
      listType="grid"
      header={{
        icon: <IconUsersGroup size="30px" />,
        title: "Media bank",
        description: "Medias to be used on your publications",
        button: (
          <ModalAddMedia
            element={
              <Button radius="sm" size="xs">
                Add media
              </Button>
            }
            accountId={selectedAccount.id} />
        ),
      }}
      searchPanel={
        <Flex w="100%" gap={15} p={2}>
          <Flex w="50%" gap={5}>
            <Input
              placeholder="Search"
              leftSection={<IconSearch size="16px" />}
              flex={1}
              onChange={(e) => setSearch(e.currentTarget.value.trim())}
              radius="sm"
            />
          </Flex>
        </Flex>
      }
      cards={medias.map((media) => <MediaCard media={media} />)}
      noContentBlock={
        <NoContentBlock
          image="/images/profile-art.svg"
          title="No medias"
          description="Add your own medias to be used on your publications"
          footer={
            <Flex gap={10}>
              <ModalAddMedia
                element={
                  <Button radius="sm" size="xs">
                    Add media
                  </Button>
                }
                accountId={selectedAccount.id} />
            </Flex>
          }
        />
      }
    />
  );
}
