"use client";

import { Header } from "@/components/dashboard/organisms/header";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import { PageTemplate } from "@/components/dashboard/templates/page-template";
import {
    ActionIcon,
  Button,
  Card,
  Flex,
  Input,
  Menu,
  SegmentedControl,
  Select,
  Tabs,
} from "@mantine/core";
import {
    IconDots,
  IconFilterFilled,
  IconHome,
  IconMessages,
  IconSearch,
  IconTrash,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function BrainAI() {
  return (
    <PageTemplate>
      <Header
        icon={<IconUsersGroup size="30px" />}
        title="Knowledgment AI"
        description="Manage your clients, link them with projects base knowledgment"
        button={
          <Flex gap={20}>
            <Menu
              transitionProps={{ transition: "pop" }}
              withArrow
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <Button radius="md">Add knowledgment</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconMessages size={16} stroke={1.5} />}
                >
                  Add link
                </Menu.Item>

                <Menu.Item
                  leftSection={<IconMessages size={16} stroke={1.5} />}
                >
                  Add content
                </Menu.Item>

                <Menu.Item
                  leftSection={<IconMessages size={16} stroke={1.5} />}
                >
                  Add document
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        }
      />

      <Flex my={20}>
        <SegmentedControl
          // value={value}
          // onChange={setValue}
          data={[
            { label: "Documents", value: "documents" },
            { label: "Links", value: "links" },
            { label: "Content", value: "contents" },
          ]}
          radius="md"
          size="sm"
          fullWidth={false}
          styles={(theme) => ({
            control: {
              border: "none", // remove a divisória entre os itens
            },
          })}
        />
      </Flex>
    </PageTemplate>
  );
}
