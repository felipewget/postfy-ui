"use client";

import { ModalAccounts } from "@/components/dashboard/molecules/account/modal-accounts";
import { CardWeekPublication } from "@/components/dashboard/molecules/publication/card-week-publication";
import { CardWeekStrategy } from "@/components/dashboard/molecules/publication/card-week-strategy";
import { Header } from "@/components/dashboard/organisms/header";
import { useDashboardContext } from "@/components/dashboard/templates/dashboard.template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import { Avatar, Button, Card, Flex, Progress, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCalendar,
  IconCheck,
  IconThumbUp,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";

export default function Home() {
  const collapsed = useMediaQuery(`(max-width: 1000px)`);
  const accountButton = useMediaQuery(`(min-width: 700px)`);

  const { accounts } = useDashboardContext();

  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Dashboard"
        description="sdsd sads dsaasdasdadasdadsada dasds adasdsa"
        button={
          <Flex gap={10} ml={20}>
            <ModalAccounts>
              <Button
                radius="sm"
                size="xs"
                variant="outline"
                leftSection={<IconUsersGroup size="16px" />}
              >
                <Text>
                  {accounts.length} {accountButton ? "accounts" : ""}
                </Text>
              </Button>
            </ModalAccounts>

            <Link href="/account/create">
              <Button radius="sm" size="xs">
                Add account
              </Button>
            </Link>
          </Flex>
        }
      />

      <Flex w="100%" direction="column" gap={10} pb={10}>
        <Card withBorder={false} radius="sm">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={10}>
              <IconCalendar />

              <Text fw={500} size="lg">
                Notifications
              </Text>
            </Flex>
          </Flex>

          {/*  */}
          <Card withBorder={true} mt={10} radius="sm" p={10}>
            <Flex direction="column" gap={0}>
              <Text size="md" fw={700}>
                Complete your setup
              </Text>

              <Text c="dimmed" mb={5} size="sm">
                Add your knowledge base and connect social media accounts to
                start generating content.
              </Text>

              <Progress value={12} />

              <Flex gap={10} mt={10}>
                {[...Array(4)].map(() => (
                  <Card p={10} withBorder={true}>
                    <Flex gap={10} align="center">
                      <Avatar radius="md">
                        <IconCheck />
                      </Avatar>

                      <Flex direction="column">
                        <Text size="sm" fw={700}>
                          Link your social profiles
                        </Text>

                        <Text c="dimmed" size="sm">
                          Link your social profiles
                        </Text>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            </Flex>
          </Card>

          <Card withBorder={true} mt={10} radius="sm" p={10}>
            <Flex direction="column">
              <Text fw={700}>Next week publications status</Text>

              <Text c="dimmed" size="sm">
                Scheduled (Email sent)
              </Text>
            </Flex>
          </Card>
          {/*  */}
        </Card>

        <Flex
          gap={10}
          align="start"
          direction={collapsed ? "column-reverse" : "row"}
        >
          <CardWeekPublication />

          <Card
            w={collapsed ? "100%" : "auto"}
            withBorder={false}
            radius="sm"
            style={{
              minWidth: "300px",
            }}
          >
            <Flex direction="column">
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={10}>
                  <IconCalendar />

                  <Text fw={500} size="lg">
                    Week summary
                  </Text>
                </Flex>
              </Flex>

              <Flex direction="column" gap={10} my={20}>
                <WeekSummary label="Publication" value="145%" />

                <WeekSummary label="Egagement ratee" value="145%" />

                <WeekSummary
                  label="Likes overange"
                  value="124 per publication"
                />

                <WeekSummary label="Best platform" value="Facebook" />
              </Flex>
            </Flex>
          </Card>
        </Flex>

        <CardWeekStrategy />
      </Flex>
    </PageTemplate>
  );
}

const WeekSummary: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <Flex justify="space-between" align="start">
      <Flex direction="column">
        <Text size="sm" fw={700}>
          {label}
        </Text>

        <Text size="sm">{value}</Text>
      </Flex>

      <Avatar radius="sm" size="sm">
        <IconThumbUp size="16px" />
      </Avatar>
    </Flex>
  );
};
