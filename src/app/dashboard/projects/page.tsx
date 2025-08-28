"use client";

import { ProjectCard } from "@/components/dashboard/molecules/project/card-project";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import {
  Button,
  Flex,
  Input,
  Select,
} from "@mantine/core";
import {
  IconChartTreemap,
  IconFilterFilled,
  IconSearch,
  IconSortDescending,
} from "@tabler/icons-react";

export default function ProjectPage() {
  return (
    <ListTemplate
      header={{
        title: "Projects",
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
              radius="sm"
            />

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              data={[
                { label: "Active", value: "active" },
                { label: "Non active", value: "non-active" },
              ]}
            />
          </Flex>

          <Select
            leftSection={<IconChartTreemap size="16px" />}
            radius="sm"
            data={[]}
          />

          <Select
            leftSection={<IconSortDescending size="16px" />}
            radius="sm"
            data={[]}
          />
        </Flex>
      }
      cards={[
        <ProjectCard />,
        <ProjectCard />,
        <ProjectCard />,
        <ProjectCard />,
        <ProjectCard />,
      ]}
    />
  );
}
