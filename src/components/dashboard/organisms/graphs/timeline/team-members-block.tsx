import { FC } from "react";
import { UserTimeline } from "./timeline.types";
import { Flex, Text } from "@mantine/core";
import { IconAlignLeft, IconPlayCard } from "@tabler/icons-react";

export const TeamMembersBlock: FC<{
  user: UserTimeline;
  toggleExpand: (user: number) => void;
}> = ({ user, toggleExpand }) => {
  return (
    <Flex
      direction="column"
      w={300}
      bg="white"
      style={{
        borderRight: "solid 1px #DDD",
      }}
    >
      <Flex
        gap={5}
        h={51}
        px={10}
        justify="space-between"
        align="center"
        onClick={() => toggleExpand(user.id)}
        style={{
          borderBottom: "solid 1px #DDD",
        }}
      >
        <Flex align="center" gap={10}>
          <Flex
            bg="blue"
            w={30}
            h={30}
            style={{
              border: "solid 2px #FFF",
              borderRadius: "50%",
            }}
          >
            <Flex
              w={10}
              h={10}
              bg="grape"
              mt={17}
              ml={17}
              style={{
                border: "solid 2px #FFF",
                borderRadius: "50%",
              }}
            />
          </Flex>

          <Text fw={500} size="md">
            {user.name}
          </Text>
        </Flex>

        <IconAlignLeft />
      </Flex>

      <Flex
        direction="column"
        bg="#F0F0F0"
        style={{
          overflow: "hidden",
          maxHeight: user.expanded ? `${3 * 60 + 30}px` : "0px",
        }}
      >
        {user?.expanded &&
          user.tasks.map(() => (
            <Flex
              h={51}
              align="center"
              px={20}
              gap={10}
              style={{
                borderBottom: "solid 1px #DDD",
              }}
            >
              <IconPlayCard />

              <Flex direction="column">
                <Text fw={500}>Front-end UI</Text>

                <Text size="sm">[1254] ..ad sadsads</Text>
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};