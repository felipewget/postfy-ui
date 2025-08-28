import { Flex } from "@mantine/core";
import { FC } from "react";
import { SLOT_WIDTH } from "./constants";
import { Task } from "./task";
import { UserTimeline } from "./timeline.types";

export const SlotLine: FC<any & UserTimeline> = ({
  dates,
  tasks,
  taskId,
  isSubline = false,
}) => {
  const width = dates.length * SLOT_WIDTH;
  
  return (
    <Flex direction="column" ml={-1}>
      <Flex
        w={`${width}px`}
        h="51px"
        style={{
          borderBottom: "solid 1px #DDD",
          borderRight: "solid 1px #DDD",
          backgroundImage: `repeating-linear-gradient(to right, rgba(0,0,0,.12) 0, rgba(0,0,0,.12) 1px, ${isSubline ? "#F7F7F7" : "#FFFFFF"} 1px, ${isSubline ? "#F7F7F7" : "#FFFFFF"} ${SLOT_WIDTH}px)`,
          // , ${isSubline ? "#F7F7F7" : "#FFFFFF"}
        }}
      >
        {!isSubline &&
          tasks.week.map((task) => {
            const marginLeft = task.slot * SLOT_WIDTH;

            return (
              <Flex ml={marginLeft} mt={5} >
                <Task time={task.time / 60} />
              </Flex>
            );
          })}

        {isSubline &&
          tasks.tasks
            .filter((task) => {
              return task.id === taskId;
            })
            .map((task) => {
              const marginLeft = task.slot * SLOT_WIDTH;

              return (
                <Flex ml={marginLeft} mt={5}>
                  <Task time={task.time / 60} />
                </Flex>
              );
            })}
      </Flex>
    </Flex>
  );
};
