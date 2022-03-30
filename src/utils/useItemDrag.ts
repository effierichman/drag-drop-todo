import { useDrag } from "react-dnd";
import { useAppState } from "../state/AppStateContext";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../state/actions";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  return { drag };
};

// Internally this hook uses useDrag from react-dnd. We pass an options object to it.
// • type - it will be CARD or COLUMN
// • item - returns dragged item object and dispatches the SET_DRAGGED_ITEM action • end - is called when we release the item
// As you can see inside this hook we dispatch the new SET_DRAGGED_ITEM action. When we start dragging, we store the item in our app state, and when we stop, we reset it to null.
// The useDrag hook returns three values inside the array:
// • [0] - Collected Props: An object containing collected properties from the collect function. If no collect function is defined, an empty object is returned.
// • [1] - DragSource Ref: A connector function for the drag source. This must be attached to the draggable portion of the DOM.
// • [2] - DragPreview Ref: A connector function for the drag preview. This may be attached to the preview portion of the DOM.
// It is a common pattern with hooks, because it allows us to destructure this array and assign its values to variables that have the names we want.
// An example of this is the useState hook that returns two values inside the array:
// • [0] - getter, allows us to get the state value.
// • [1] - setter function, allows us to update the state value.
// It allows us to call the getter and the setter however we want. For example const [fruit, setFruit] = useState("apple").
// In our hook we don’t need the Collected Props object, so we skip it which leaves us with this a hanging comma in the beginning. The syntax might look a bit awkward, but really we are just skipping the value that we aren’t going to use.
