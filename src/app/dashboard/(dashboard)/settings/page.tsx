"use client";

import { AccountBrainAiBlock } from "@/components/dashboard/molecules/account/account-brain-ai-block";
import { AccountGenericBlock } from "@/components/dashboard/molecules/account/account-generic-block";
import { Header } from "@/components/dashboard/organisms/header";
import { useDashboardContext } from "@/components/dashboard/templates/navbar";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { Account } from "@/declarators";
import { Box, Card, Divider, Flex, Select, Switch, Text } from "@mantine/core";
import { IconClock, IconUsersGroup } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Settings() {
  const { selectedAccount } = useDashboardContext();

  if (!selectedAccount) {
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

      <Flex my={20} gap={20} align="start">
        <Flex flex={1} direction="column" gap={10}>
          <AccountGenericBlock account={selectedAccount as Account} />

          <AccountBrainAiBlock account={selectedAccount as Account} />
        </Flex>

        <Card
          withBorder={false}
          p={0}
          w="450px"
          style={{
            minWidth: "300px",
          }}
        >
          <Flex justify="space-between" align="center">
            <Flex align="center" p={20} gap={10}>
              <IconClock />

              <Text>Behaviours</Text>
            </Flex>
          </Flex>

          <Divider mx={10} />

          <Flex direction="column" p={10} gap={10}>
            {[...Array(5)].map(() => (
              <Card withBorder={false}>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text size="sm">General email notificatins</Text>

                    <Text size="lg">Promotions aoidhaoidjaiod</Text>
                  </Flex>

                  <Box>
                    <Switch />
                  </Box>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Card>
      </Flex>
    </PageTemplate>
  );
}
