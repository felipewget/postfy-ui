import {
  Avatar,
  Badge,
  Divider,
  Flex,
  Menu,
  Paper,
  Progress,
  Text,
  VisuallyHidden,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconUser } from "@tabler/icons-react";
import { DrawerProjectForm } from "./drawer-project-form";
import { modals } from "@mantine/modals";
import { FC, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDelete } from "@/api/dashboard";
import { Project } from "@/declarators";

type ProjectCard = {
  project: Project;
}

export const ProjectCard:FC<ProjectCard> = ({project}) => {
  const queryClient = useQueryClient();

  const onSuccessDelete = () => {
    queryClient.invalidateQueries({ queryKey: ["crud-list-projects"] });
  };
  
  const editFormButton = useRef<HTMLDivElement>(null);
  const openPreviewButton = useRef<HTMLDivElement>(null);

  const { mutate: deleteProject } = useDelete(
      { entity: "projects", recordId: project.id },
      onSuccessDelete
    );

  const openDrawer = () => editFormButton?.current?.click();
  const openPreview = () => openPreviewButton?.current?.click();

  const confirmDelete = (projectId: number) => {
    modals.openConfirmModal({
      id: `project_${projectId}`,
      title: "Delete project",
      centered: true,
      size: "lg",
      p: 0,
      children: (
        <Text size="sm">
          Are you sure about delete this client? this action is irreversible
        </Text>
      ),
      labels: { confirm: "Delete Client", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deleteProject();
      },
    });
  };

  return (
    <>
      <DrawerProjectForm element={<VisuallyHidden ref={editFormButton} />} project={project} />

      {/* <ModalUserPreview element={<VisuallyHidden ref={openPreviewButton} />} /> */}

      <Paper w="100%">
        <Flex justify="space-between">
          <Flex gap={10}>
            <Badge radius="sm" mb={20}>
              Job
            </Badge>

            <Badge radius="sm">Briefing</Badge>
          </Flex>

          <Flex>
            <Menu>
              <Menu.Target>
                <IconDots size="18px" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />}>
                  View client
                </Menu.Item>

                <Menu.Item leftSection={<IconEdit size={14} />} onClick={openDrawer}>
                  Edit project
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={() => confirmDelete(project.id)}>
                  Delete project
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>

        <Flex gap={20} justify="space-between">
          <Flex gap={20} w="calc(100% - 50px)">
            <Avatar title="asdsa" size="lg">
              {project.title[0].toUpperCase()}
            </Avatar>

            <Flex direction="column" w="100%">
              <Text size="lg" fw={500}>
                {project.title}
              </Text>

              <Flex align="center" gap={10}>
                <Text>Categories: </Text>

                {project.categories.map((categorie) => (
                  <Badge variant="light" radius="md">
                    {categorie}
                  </Badge>
                ))}
              </Flex>

              <Text>{project.description}</Text>

              <Flex w="100%" align="center" gap={20} my={10}>
                <Progress radius="sm" w="100%" value={80} size="lg" />

                <Text style={{ whiteSpace: "nowrap" }}>14hrs / 1425hrs</Text>
              </Flex>

              <Avatar.Group>
                <Avatar src="image.png" />
                <Avatar src="image.png" />
                <Avatar src="image.png" />
                <Avatar>+5</Avatar>
              </Avatar.Group>
            </Flex>
          </Flex>
        </Flex>

        <Divider my={14} />

        <Flex gap="10" wrap="wrap">
          <Badge radius="sm">Created at: 22/08/1994</Badge>
        </Flex>
      </Paper>
    </>
  );
};
