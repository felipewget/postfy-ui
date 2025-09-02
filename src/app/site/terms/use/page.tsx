import { Flex, Text } from "@mantine/core";
import { IconDiamond } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

export default function Privacy() {
  return (
    <Flex direction="column" align="center" mb={80}>
      <Flex direction="column" w="950px" gap={50}>
        <Flex direction="column" w="500px" gap={21}>
          <IconDiamond size="50px" />

          <Text size="2xl">Terms of privacy</Text>

          <Text>
            sa dijsadiosajdiosajdasdiosadioasdioasjdioasiodsajiodjsa odijsa odi
            asiod sajiod ajsidoas sa
            dijsadiosajdiosajdasdiosadioasdioasjdioasiodsajiodjsa odijsa odi
            asiod sajiod ajsidoas sa
          </Text>
        </Flex>

        {[...Array(30)].map(() => (
          <Flex direction="column" gap={21}>
            <Text size="2xl">Terms of privacy</Text>

            <Text>
              sa dijsadiosajdiosajdasdiosadioasdioasjdioasiodsajiodjsa odijsa aois jdsaiodj osiad asoid asio jdaosijisaodjsa iodj aos
              odi asiod sajiod ajsidoas sa
              dijsadiosajdiosajdasdiosadioasdioasjdioasiodsajiodjsa odijsa odi
              asiod sajiod ajsidoas sa
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
