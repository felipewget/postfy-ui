"use client";

import { Header } from "@/components/dashboard/organisms/header";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { Avatar, Button, Card, Flex, Progress, Text } from "@mantine/core";
import { IconCheck, IconUsersGroup } from "@tabler/icons-react";

export default function Home() {
  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Dashboard"
        description="sdsd sads dsaasdasdadasdadsada dasds adasdsa"
        button={
          <Flex gap={10}>
            <Button
              variant="outline"
              radius="md"
              leftSection={<IconUsersGroup />}
            >
              <Text>5 accounts</Text>
            </Button>

            <Button radius="md">Add account</Button>
          </Flex>
        }
      />

      <Flex w="100%" direction="column" gap={20}>
        <Card withBorder={false} mt={10} radius="sm">
          <Flex direction="column" gap={10}>
            <Text size="lg" fw={700}>
              Complete your setup
            </Text>

            <Text>
              Add your knowledge base and connect social media accounts to start
              generating content.
            </Text>

            <Progress value={12} />

            <Flex gap={10} mt={10}>
              {[...Array(4)].map(() => (
                <Card p={10} withBorder={true}>
                  <Flex gap={20} align="center">
                    <Avatar>
                      <IconCheck />
                    </Avatar>

                    <Flex direction="column">
                      <Text>Link your social profiles</Text>

                      <Text c="dimmed">Link your social profiles</Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Flex>
        </Card>

        <Card withBorder={false}>Alerts</Card>

        <Flex gap={20}>
          <Card withBorder={false} mt={10} radius="sm">
            Current week
          </Card>

          <Card withBorder={false} mt={10} radius="sm">
            Week Summary
          </Card>
        </Flex>

        <Flex gap={20}>
          <Card withBorder={false} mt={10} radius="sm">
            Current week publications
          </Card>

          <Card withBorder={false} mt={10} radius="sm">
            Next week publications
          </Card>
        </Flex>
      </Flex>
    </PageTemplate>
  );
}
