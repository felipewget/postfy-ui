"use client";

import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { Button, Card, Flex, Input, Select } from "@mantine/core";
import { IconFilterFilled, IconSearch, IconUsersGroup } from "@tabler/icons-react";

export default function Campaigns() {
  return (
    <ListTemplate
      header={{
        icon: <IconUsersGroup size="30px" />,
        title: "Campaigns",
        description: "Manage your clients, link them with projects",
        button: (
            <Button radius="md">Create project</Button>
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
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,<Card />,
        <Card />,
      ]}
    />
  );
}
