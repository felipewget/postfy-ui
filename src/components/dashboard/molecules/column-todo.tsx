"use client";

import { Flex, Paper, Stack, Title, Text, Button } from "@mantine/core";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { ButtonFormTask } from "./button-form-task";

const Column = ({
  title,
  tasks,
  droppableId,
  height,
  justify = "start",
}: any) => (
  <Paper
    radius="none"
    shadow="none"
    withBorder={false}
    h={`${height}px`}
    w="100%"
    bg="transparent"
    p={0}
    style={{
      borderLeft: "solid 1px #888",
    }}
  >
    <Title order={4} mb="md" px={10} py={4}>
      {title}
    </Title>

    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <Stack
          gap={0}
          justify={justify}
          ref={provided.innerRef}
          {...provided.droppableProps}
          h={`${height - 50}px`}
        >
          {justify === "end" && (
            <ButtonFormTask
              element={<Button fullWidth>Create a new task</Button>}
            />
          )}

          {tasks.map((task: any, index: number) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <ButtonFormTask
                  element={
                    <Paper
                      radius={0}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      p="sm"
                      withBorder
                      shadow="none"
                      style={{
                        ...provided.draggableProps.style,
                        width: snapshot.isDragging
                          ? provided.draggableProps.style?.width ?? "auto"
                          : "100%",
                      }}
                    >
                      <Text>{task.content}</Text>
                    </Paper>
                  }
                />
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  </Paper>
);

export function ColumnTodo({
  leftWidth,
  startResizing,
  boardId,
  columns,
}: any) {
  const height = 600;

  return (
    <Flex direction="column" align="flex-start" w="100%">
      {Object.entries(columns).map(([colId, tasks], idx) => (
        <>
          <Column
            justify={idx == 0 ? "end" : "start"}
            key={`${boardId}-${colId}`}
            title={colId === "todos" ? "To do - 13 hours" : "Done - 12 hours"}
            tasks={tasks}
            droppableId={`${boardId}-${colId}`}
            height={idx == 0 ? height / 2 + leftWidth : height / 2 - leftWidth}
          />

          {idx < Object.keys(columns).length - 1 && (
            <Flex
              w="100%"
              h="40px"
              align="center"
              justify="center"
              bg="#555"
              c="white"
              onMouseDown={startResizing}
            >
              Today
            </Flex>
          )}
        </>
      ))}
    </Flex>
  );
}
