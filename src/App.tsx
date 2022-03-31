import {
  AppContainer,
  AppAddContainerItem,
  AppContainerItem,
} from "./styles/styles";
import { Column } from "./components/Column";
import { AddNewItem } from "./components/AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { addList } from "./state/actions";
import { CustomDragLayer } from "./components/CustomDragLayer";

export const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <AppAddContainerItem>
        <AddNewItem
          toggleButtonText="+ Add another todo list"
          onAdd={(text) => dispatch(addList(text))}
        />
      </AppAddContainerItem>
      <AppContainerItem>
        <CustomDragLayer />
        {lists.map((list) => (
          <Column text={list.text} key={list.id} id={list.id} />
        ))}
      </AppContainerItem>
    </AppContainer>
  );
};
