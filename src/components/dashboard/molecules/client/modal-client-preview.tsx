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
import { IconX } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

type ModalClientPreviewProps = {
  element: ReactNode;
};

export const ModalClientPreview: FC<ModalClientPreviewProps> = ({
  element,
}) => {
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
        <Flex direction="column" gap={20}>
          <Flex
            justify="space-between"
            w="100%"
            align="center"
            pb={5}
            style={{
              borderBottom: "solid 1px #DDD",
            }}
          >
            <Text fw={500} size="18px">
              Client preview
            </Text>

            <Button variant="transparent" p={0}>
              <IconX size={18} />
            </Button>
          </Flex>

          <Flex gap={20}>
            <Flex>
              <Avatar size="80px">E</Avatar>
            </Flex>

            <Flex direction="column" gap={10} w="100%">
              <Text>Enterness ada sda </Text>

              <Flex align="center" gap={20}>
                <Text>Client is active: </Text>

                <Switch radius="sm" />
              </Flex>

              <Divider />

              <Flex direction="column" gap={10}>
                <Details />

                <Details />

                <Details />
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
