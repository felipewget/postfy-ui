import { Flex, Text } from "@mantine/core";
import { SLOT_WIDTH } from "./constants";
import { FC } from "react";

export const Task:FC<{time:number}> = ({time}) => {
  const timeWeek = 40; // Total hours at the week
  const businessDays = 5;

  const fullWidth = SLOT_WIDTH * businessDays;

  let width = (fullWidth / timeWeek) * time;
  if (fullWidth < width) {
    width = fullWidth;
  }

  return (
    <Flex
      style={{
        borderRadius: "3px",
        marginRight: width > SLOT_WIDTH ? `${SLOT_WIDTH - width}px` : "0",
        zIndex: 10,
        cursor: "pointer",
      }}
      align="center"
      w={`${width}px`}
      h="40px"
      bg={time > timeWeek ? "red" : "blue"}
    >
      <Text ml={4} c="#FFF" size="xs" fw={800}>
        {time > timeWeek && "More than "}
        {time > timeWeek ? timeWeek : time}hrs
      </Text>
    </Flex>
  );
};