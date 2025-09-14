"use client";

import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { Button, Card, Flex, Input, Menu, Select } from "@mantine/core";
import {
  IconFilterFilled,
  IconMessages,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function Campaigns() {
  return (
    <ListTemplate
      listType="row"
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
                <Menu.Item
                  leftSection={<IconMessages size={16} stroke={1.5} />}
                >
                  Facebook
                </Menu.Item>

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
              //   onChange={(e) => setSearch(e.currentTarget.value.trim())}
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
      cards={[
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
        <Card />,
      ]}
    />
  );
}
