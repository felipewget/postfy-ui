"use client";

import { useList } from "@/api/dashboard";
import { SelectClientFilter } from "@/components/dashboard/molecules/client/select-client-filter";
import { ProjectCard } from "@/components/dashboard/molecules/project/card-project";
import { DrawerProjectForm } from "@/components/dashboard/molecules/project/drawer-project-form";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { Project } from "@/declarators";
import { Button, Flex, Input, Select } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconChartTreemap,
  IconFilterFilled,
  IconFlask,
  IconSearch,
  IconSortDescending,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function ProjectPage() {
  const [search, setSearch] = useDebouncedState("", 300);
  const [status, setStatus] = useDebouncedState(null, 300);
  const [stage, setStage] = useDebouncedState(null, 300);
  const [client_id, setClientId] = useDebouncedState(null, 300);

  const { data: dataCategories } = useList({
    entity: "categories",
    params: {},
  });

  const { data } = useList({
    entity: "projects",
    params: {
      search,
      searchFields: "title",
      filters: { status, stage, client_id },
    },
  });

  const projects = (data?.pages.flat() ?? []) as Project[];
  const categories = (dataCategories?.pages.flat() ?? []) as any[];

  return (
    <ListTemplate
      header={{
        icon: <IconFlask size="30px" />,
        title: "Projects",
        description: "Manage your clients, link them with projects",
        button: (
          <DrawerProjectForm
            categories={categories ?? []}
            element={<Button radius="md">Create project</Button>}
          />
        ),
      }}
      searchPanel={
        <Flex w="100%" gap={5} p={2}>
          <Flex w="100%" gap={5}>
            <SelectClientFilter onChange={setClientId} />

            <Input
              onChange={(e) => setSearch(e.currentTarget.value.trim())}
              placeholder="Search"
              leftSection={<IconSearch size="16px" />}
              flex={1}
              radius="sm"
            />

            <Select
              leftSection={<IconFilterFilled size="12px" />}
              radius="sm"
              onChange={(e) => setStatus(e)}
              data={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Flex>

          <Select
            leftSection={<IconChartTreemap size="16px" />}
            radius="sm"
            onChange={(e) => setStage(e)}
            data={[
              { label: "Briefing", value: "briefing" },
              { label: "In progress", value: "in_progress" },
              { label: "Job", value: "job" },
              { label: "Done", value: "done" },
            ]}
          />
        </Flex>
      }
      cards={(projects ?? []).map((project) => (
        <ProjectCard project={project} categories={categories ?? []} />
      ))}
    />
  );
}
