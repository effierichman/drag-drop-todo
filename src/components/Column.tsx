import { ColumnContainer, ColumnTitle } from "../styles/styles";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "../state/AppStateContext";
import { addTask } from "../state/actions";

type ColumnProps = {
  text: string;
  id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((tasks) => (
        <Card text={tasks.text} key={tasks.id} id={tasks.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another todo task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
