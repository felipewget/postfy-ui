import { Flex, Text } from "@mantine/core";
import { FC, Fragment, useMemo, useState } from "react";
import { SlotLine } from "./slot-line";
import { SLOT_WIDTH, WEEK_DAYS } from "./constants";
import { TeamMembersBlock } from "./team-members-block";
import { MemberTaskTimelineProps, UserTimeline } from "./timeline.types";
import { DraggableHorizontalScroll } from "@/components/dashboard/templates/draggable-horizontal-scroll";
import { groupBy, mapValues, sumBy } from "lodash";
import moment from "moment";

export const TeamTimeline: FC<MemberTaskTimelineProps> = ({
  timeline,
  period,
}) => {
  const [data, setData] = useState<UserTimeline[]>(
    timeline.map((value) => ({
      ...value,
      expanded: false,
    }))
  );

  const toggleExpand = (userId: number) => {
    setData(
      data.map((value) => {
        if (userId === value.id) {
          value.expanded = !value.expanded;
        }

        return value;
      })
    );
  };

  const initialDate = period.initial;
  const finalDate = period.final;

  const dates = useMemo(
    () => getDates(initialDate, finalDate),
    [initialDate, finalDate]
  );

  const tasks = useMemo(() => {
    const formattedDates = dates.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );

    return timeline.map((line) => {
      const tasksByWeek = groupBy(line.tasks, (task) =>
        moment(task.date).startOf("isoWeek").format("YYYY-MM-DD")
      );

      const weekTotals = Object.entries(tasksByWeek).map(
        ([weekStart, tasks]) => {
          const totalInMinutes = sumBy(tasks, "time");
          const time = totalInMinutes / 60;

          const slot = formattedDates.indexOf(weekStart);

          return {
            weekStart, // data da segunda-feira
            time: totalInMinutes,
            slot,
          };
        }
      );

      const tasks = line.tasks.map((task) => {
        const slot = formattedDates.indexOf(task.date);

        task.slot = slot;

        return task;
      });

      return {
        userId: line.id,
        week: weekTotals,
        tasks,
      };
    });
  }, [dates, initialDate, finalDate]);

  return (
    <Flex w="100%">
      <Flex direction="column">
        <Flex
          bg="white"
          w="100%"
          h="60px"
          justify="center"
          align="center"
          style={{
            borderRight: "solid 1px #DDD",
            borderBottom: "solid 1px #DDD",
          }}
        >
          <Text fw={800} size="xs">
            Team
          </Text>
        </Flex>

        {data.map((user, key) => (
          <TeamMembersBlock key={key} user={user} toggleExpand={toggleExpand} />
        ))}
      </Flex>

      <Flex w="calc(100% - 300px)">
        <DraggableHorizontalScroll>
          <Flex>
            <Flex direction="column">
              <Flex>
                {dates.map((date) => (
                  <Flex
                    direction="column"
                    bg="white"
                    w={`${SLOT_WIDTH}px`}
                    h="60px"
                    justify="center"
                    align="center"
                    style={{
                      borderRight: "solid 1px #DDD",
                      borderBottom: "solid 1px #DDD",
                    }}
                  >
                    <Flex h="30px" align="center">
                      <Text fw={500} size="xs">
                        {WEEK_DAYS[date.getDay()]}
                      </Text>
                    </Flex>

                    <Flex h="30px" align="center">
                      <Text fw={500} size="xs">
                        {date.getDate()}/{date.getMonth()}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>

              {data.map((user, key) => {
                const filteresTask = tasks.find(
                  (processedTask) => processedTask.userId === user.id
                );

                return (
                  <Fragment>
                    <SlotLine
                      dates={dates}
                      isSubline={false}
                      user={user}
                      tasks={filteresTask}
                    />

                    <Flex display={user?.expanded ? "block" : "none"}>
                      {user.tasks.map((task) => (
                        <SlotLine
                          dates={dates}
                          isSubline={true}
                          user={user}
                          tasks={filteresTask}
                          taskId={task.id}
                        />
                      ))}
                    </Flex>
                  </Fragment>
                );
              })}
            </Flex>
          </Flex>
        </DraggableHorizontalScroll>
      </Flex>
    </Flex>
  );
};

const getDates = (initialDate: Date, finalDate: Date) => {
  const dates: Date[] = [];
  let currentDate = new Date(initialDate);

  while (currentDate <= finalDate) {
    dates.push(new Date(currentDate));

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
