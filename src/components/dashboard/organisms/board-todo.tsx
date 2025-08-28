"use client";

import { Flex } from "@mantine/core";
import { useRef, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ColumnTodo } from "../molecules/column-todo";

export const BoardTodo = () => {
  const [leftWidth, setLeftWidth] = useState(0);
  const frame = useRef<number | null>(null);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startWidth = leftWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const delta = moveEvent.clientY - startY;
        setLeftWidth(startWidth + delta);
      });
    };

    const onMouseUp = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Estado global para todos os boards
  const [boards, setBoards] = useState({
    board1: {
      todos: [{ id: 't1', content: 'Tarefa 1' }],
      done: [{ id: 'd1', content: 'Concluído 1' }],
    },
    board2: {
      todos: [{ id: 't2', content: 'Tarefa 2' }],
      done: [{ id: 'd2', content: 'Concluído 2' }],
    },
    board3: {
      todos: [{ id: 't3', content: 'Tarefa 2' }],
      done: [{ id: 'd3', content: 'Concluído 2' }],
    },
    board4: {
      todos: [{ id: 't4', content: 'Tarefa 2' }],
      done: [{ id: 'd4', content: 'Concluído 2' }],
    },
    board5: {
      todos: [{ id: 't5', content: 'Tarefa 2' }],
      done: [{ id: 'd5', content: 'Concluído 2' }],
    },
    board6: {
      todos: [{ id: 't6', content: 'Tarefa 2' }],
      done: [{ id: 'd6', content: 'Concluído 2' }],
    },
    board7: {
      todos: [{ id: 't7', content: 'Tarefa 2' }],
      done: [{ id: 'd7', content: 'Concluído 2' }],
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const [sourceBoard, sourceCol] = source.droppableId.split("-");
    const [destBoard, destCol] = destination.droppableId.split("-");

    // Clonando o estado inteiro
    const newBoards = JSON.parse(JSON.stringify(boards));

    const movedItem = newBoards[sourceBoard][sourceCol][source.index];

    // Removendo do array de origem
    newBoards[sourceBoard][sourceCol].splice(source.index, 1);

    // Adicionando no array de destino
    newBoards[destBoard][destCol].splice(destination.index, 0, movedItem);

    setBoards(newBoards);
  };

  return (
    <Flex w="100%">
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex w="400px">
        <ColumnTodo
          leftWidth={leftWidth}
          startResizing={startResizing}
          boardId="board1"
          columns={boards.board1}
        />
      </Flex>

      <Flex w="400px">
        <ColumnTodo
          leftWidth={leftWidth}
          startResizing={startResizing}
          boardId="board2"
          columns={boards.board2}
        />
        </Flex>

        <Flex w="400px">
        <ColumnTodo
          leftWidth={leftWidth}
          startResizing={startResizing}
          boardId="board3"
          columns={boards.board3}
        />
        </Flex>
        
        <Flex w="400px">
        <ColumnTodo
          leftWidth={leftWidth}
          startResizing={startResizing}
          boardId="board4"
          columns={boards.board4}
        />
        </Flex>

        <Flex w="400px">
        <ColumnTodo
          leftWidth={leftWidth}
          startResizing={startResizing}
          boardId="board5"
          columns={boards.board5}
        />
        </Flex>

        {/* <Flex w="400px">
        <ColumnTodo
          leftWidth={leftWidth}
          startResizing={startResizing}
          boardId="board6"
          columns={boards.board6}
        />
        </Flex>

        <Flex w="400px">
        <ColumnTodo
          leftWidth={leftWidth}
          startResizing={startResizing}
          boardId="board7"
          columns={boards.board7}
        />
        </Flex> */}
      
    </DragDropContext>
    </Flex>
  );
}