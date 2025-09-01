import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Switch,
  Text,
} from "@mantine/core";
import { ProjectCard } from "../project/card-project";
import { IconEye, IconX } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

type ModalUserPreviewProps = {
  element: ReactNode;
};

export const ModalUserPreview: FC<ModalUserPreviewProps> = ({ element }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Box onClick={open}>{element}</Box>

      <Modal
        size="lg"
        p={0}
        opened={opened}
        withCloseButton={false}
        onClose={close}
      >
        <Flex gap={20} justify="space-between">
          <Flex gap={20} w="calc(100% - 50px)">
            <Avatar title="asdsa" size="lg">
              FO
            </Avatar>

            <Flex direction="column" w="100%">
              <Text size="lg" fw={500}>
                Felipe Oliveira
              </Text>

              <Text>E-mail: felipe.wget@gmail.com</Text>

              <Text>Hours per week: 42hours</Text>

              <Flex gap={5}>
                <Text>Price per hour: ***</Text>

                <IconEye />
              </Flex>

              <Flex align="center" gap={10}>
                <Text>Projects: </Text>

                <Avatar.Group mt={10}>
                  <Avatar src="image.png" radius="md" />
                  <Avatar src="image.png" radius="md" />
                  <Avatar src="image.png" radius="md" />
                  <Avatar radius="md">+5</Avatar>
                </Avatar.Group>
              </Flex>

              <Flex direction="column">
                <Text fw={800}>Notes</Text>
                <Flex
                  bg="violet.1"
                  p={20}
                  style={{
                    borderRadius: "3px",
                  }}
                >
                  <Text>
                    adoiasjd aiosdjasoidasj dsaid asiod saoid asod asid saoi
                    daso
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

const Details = () => {
  return (
    <Flex direction="column">
      <Text fw={800} size="15px" mb={5}>
        Phones
      </Text>

      {[...Array(3)].map(() => (
        <Flex gap={10}>
          <Text fw={500}>Phone 1</Text>

          <Flex direction="column">
            <Text>04 2223 23345</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
