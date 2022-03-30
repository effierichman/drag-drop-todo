export type Action =
  | {
      type: "ADD_LIST";
      payload: string;
    }
  | {
      type: "ADD_TASK";
      payload: { text: string; listId: string };
    }
  | {
      type: "MOVE_LIST";
      payload: {
        draggedId: string;
        hoverId: string;
      };
    };

// • ADD_LIST - contains the list title.
// • ADD_TASK - text is the task text, and listId is the reference to the list it belongs to.

export const addTask = (text: string, listId: string): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId,
  },
});

export const addList = (text: string): Action => ({
  type: "ADD_LIST",
  payload: text,
});

// We’ve added the MOVE_LIST action. This action has draggedId and hoverId in its payload. When we start dragging the column, we remember its id and pass it as draggedId. When we hover over other columns we take their ids and use them as a hoverId.
export const moveList = (draggedId: string, hoverId: string): Action => ({
  type: "MOVE_LIST",
  payload: {
    draggedId,
    hoverId,
  },
});
