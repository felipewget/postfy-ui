import { Account } from "@/declarators";
import { Paper, Flex, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { FC } from "react";

export const CardAccount: FC<{ account: Account }> = ({ account }) => {
  return (
    <Paper m={10} withBorder={false} p={10} w="100%">
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
  );
};
