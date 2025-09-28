"use client";

import { useListCampaign } from "@/apis/campaign.api";
import { useList } from "@/apis/crud.api";
import { CampaignCard } from "@/components/dashboard/molecules/campaign/campaign-card";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { useDashboardContext } from "@/components/dashboard/templates/navbar";
import { Campaign, SocialProfile } from "@/declarators";
import { Button, Card, Flex, Input, Select, Text } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconFilterFilled,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function Campaigns() {
  const [search, setSearch] = useDebouncedState("", 300);
  const [enabled, setEnabled] = useDebouncedState("", 300);
  
  const { selectedAccount } = useDashboardContext();

  if (!selectedAccount) return null;

  const { data } = useListCampaign({
    accountId: selectedAccount.id,
    params: {
      search
    },
  });

  const campaigns = (data?.pages.flat() ?? []) as Campaign[];

  return (
    <ListTemplate
      listType="row"
      header={{
        icon: <IconUsersGroup size="30px" />,
        title: "Campaigns",
        description: "Manage your clients, link them with projects",
        button: <Button radius="md">Create project</Button>,
      }}
      searchPanel={
        <Flex w="100%" gap={15} p={2}>
          <Flex w="100%" gap={5}>
            <Input
              placeholder="Search"
              leftSection={<IconSearch size="16px" />}
              flex={1}
              onChange={(e) => setSearch(e.currentTarget.value.trim())}
              radius="sm"
            />

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              //   onChange={(e) => setStatus(e)}
              data={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Flex>
        </Flex>
      }
      cards={campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    />
  );
}
