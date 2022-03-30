import { ColumnContainer, ColumnTitle } from "../styles/styles";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "../state/AppStateContext";
import { moveList, addTask, moveTask, setDraggedItem } from "../state/actions";
import { useRef } from "react";
import { useItemDrag } from "../utils/useItemDrag";
import { throttle } from "throttle-debounce-ts";
import { useDrop } from "react-dnd";
import { isHidden } from "../utils/isHidden";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }

        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((tasks) => (
        <Card columnId={id} text={tasks.text} key={tasks.id} id={tasks.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another todo task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
