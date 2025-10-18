"use client";

import { useGetAccountById } from "@/apis/account.api";
import { AccountBrainAiBlock } from "@/components/dashboard/molecules/account/account-brain-ai-block";
import { AccountGenericBlock } from "@/components/dashboard/molecules/account/account-generic-block";
import { AccountSettingsBlock } from "@/components/dashboard/molecules/account/account-settings-block";
import { Header } from "@/components/dashboard/organisms/header";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { Account } from "@/declarators";
import { Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconUsersGroup } from "@tabler/icons-react";

export default function Settings() {
  const { selectedAccount } = useDashboardContext();
  const collapsed = useMediaQuery(`(max-width: 1000px)`);

  const { data: accountData } = useGetAccountById({
    accountId: selectedAccount?.id ?? 0,
  });

  if (!selectedAccount || !accountData) {
    return (
      <PageTemplate>
        <Header
          icon={<IconUsersGroup size="30px" />}
          title="Settings"
          description="Manage your clients, link them with projects base knowledgment"
        />

        <p>loading</p>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Settings"
        description="Manage your clients, link them with projects base knowledgment"
      />

      <Flex
        my={20}
        gap={10}
        align="start"
        direction={collapsed ? "column" : "row"}
        w="100%"
      >
        <Flex flex={1} direction="column" gap={10} w="100%">
          <AccountGenericBlock account={selectedAccount as Account} />

          <AccountBrainAiBlock account={selectedAccount as Account} />
        </Flex>

        <Flex w={collapsed ? "100%" : "350px"}>
          <AccountSettingsBlock account={accountData} />
        </Flex>
      </Flex>
    </PageTemplate>
  );
}
