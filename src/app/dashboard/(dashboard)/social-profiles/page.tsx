"use client";

import { useList } from "@/apis/crud.api";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { BASE_BACKEND_URL } from "@/constants";
import { SocialProfile } from "@/declarators";
import {
  Button,
  Card,
  Flex,
  Image,
  Input,
  Menu,
  Select,
  Text,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconFilterFilled,
  IconMessages,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Campaigns() {
  const [search, setSearch] = useDebouncedState("", 300);
  const [channel, setChannel] = useDebouncedState(null, 300);

  const { data } = useList({
    entity: "social-profiles",
    params: {
      search,
      searchFields: "profileTitle",
      filters: { channel },
    }
  });

  const socialProfiles = (data?.pages.flat() ?? []) as SocialProfile[];

  return (
    <ListTemplate
      header={{
        icon: <IconUsersGroup size="30px" />,
        title: "Social profiles",
        description: "Manage your clients, link them with projects",
        button: (
          <Flex gap={20}>
            <Menu
              transitionProps={{ transition: "pop" }}
              withArrow
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <Button radius="md">Add social profiles</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  target="_blank"
                  href={`${BASE_BACKEND_URL}/social-profiles/facebook/auth`}
                >
                  <Menu.Item
                    leftSection={<IconMessages size={16} stroke={1.5} />}
                  >
                    Facebook
                  </Menu.Item>
                </Link>

                <Menu.Item
                  leftSection={<IconMessages size={16} stroke={1.5} />}
                >
                  LinkedId
                </Menu.Item>

                <Menu.Item
                  leftSection={<IconMessages size={16} stroke={1.5} />}
                >
                  Instagram
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ),
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
              onChange={(e) => setChannel(e)}
              data={[
                { label: "Facebook", value: "facebook" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Flex>
        </Flex>
      }
      cards={socialProfiles.map((profile) => (
        <Card p={10} w="100%">
          <Flex gap={10} align="center">
            <Image
              src={`https://graph.facebook.com/${profile.profileId}/picture?type=large`}
              w={50}
              h={50}
              radius="sm"
            />

            <Flex direction="column">
              <Text size="sm" c="dimmed">
                {profile.channel}
              </Text>

              <Text fw={600}>{profile.profileTitle}</Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    />
  );
}
