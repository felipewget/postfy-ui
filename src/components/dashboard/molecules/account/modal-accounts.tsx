import { useList } from "@/apis/crud.api";
import { Account } from "@/declarators";
import { Flex, Text, Modal, Paper, Box } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import * as yup from "yup";
import { useDashboardContext } from "../../templates/navbar";
import { useDisclosure } from "@mantine/hooks";

type ModalAccounts = {
  children: ReactNode;
};

export const ModalAccounts: FC<ModalAccounts> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { selectedAccount, accounts, selectAccount } = useDashboardContext();

  return (
    <Box w="100%">
      <Flex onClick={open} style={{ cursor: "pointer" }} w="100%">
        {children}
      </Flex>

      <Modal
        title={
          <Text size="sm" fw={600}>
            Account
          </Text>
        }
        opened={opened}
        onClose={close}
        styles={{
          header: {
            backgroundColor:
              "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))",
          },
          content: {
            paddingTop: "0px",
            paddingBottom: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            backgroundColor:
              "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))",
            border: "none",
          },
        }}
      >
        {accounts.map((account) => (
          <Paper
            onClick={() => selectAccount(account.id)}
            my={10}
            withBorder={false}
            p={10}
            style={{
              cursor: "pointer",
            }}
          >
            <Flex align="center">
              <Flex direction="column" flex={1}>
                <Text size="xs">Account</Text>

                <Text size="sm" fw={500}>
                  {account.accountName}
                </Text>
              </Flex>

              <IconChevronRight size="11px" />
            </Flex>
          </Paper>
        ))}
      </Modal>
    </Box>
  );
};

const loginSchema = yup.object().shape({});
