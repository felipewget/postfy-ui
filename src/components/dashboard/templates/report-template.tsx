import { Avatar, Flex, Tabs, Text } from "@mantine/core";
import { IconPhoto, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

type ReportTemplateProps = {
  header: {
    icon: ReactNode;
    title: string;
    description?: string;
  };
  tabs: {
    label: string;
    link: string;
  }[];
  page: ReactNode;
};

export const ReportTemplate: FC<ReportTemplateProps> = ({
  header,
  tabs,
  page,
}) => {
  return (
    <Flex
      p={20}
      direction="column"
      w="100%"
      style={{
        maxWidth: "1300px",
      }}
    >
      <Flex w="100%" justify="space-between" align="center" py={10}>
        <Flex gap={20}>
          <Avatar size="lg">{header.icon}</Avatar>

          <Flex direction="column">
            <Text size="2xl" fw={500}>
              {header.title}
            </Text>

            {header.description && <Text>{header.description}</Text>}
          </Flex>
        </Flex>
      </Flex>

      <Tabs defaultValue="gallery">
        <Tabs.List>
          {tabs.map((tab, key) => (
            <Link href={tab.link} style={{
              textDecoration: "none"
            }}>
              <Tabs.Tab key={key} value="gallery" fw={800}>
                <Text fw={800} size="sm" c="violet">{tab.label}</Text>
              </Tabs.Tab>
            </Link>
          ))}
        </Tabs.List>
      </Tabs>

      {page}
    </Flex>
  );
};
