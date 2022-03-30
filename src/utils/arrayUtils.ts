type Item = {
  id: string;
};

// findItemIndexById is used to conect the new tesk to the correct list
export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item: TItem) => item.id === id);
};

export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
  // We use the spread operator to generate a new array with the portion before the index that we get using the slice method, and the portion after the index using the slice method with index + 1.
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function insertItemAtIndex<TItem>(
  array: TItem[],
  item: TItem,
  index: number
) {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

// First we store the item in the item constant. Then we use the removeItemAtIndex function to remove the item from its original position and then we insert it back to the new position using the insertItemAtIndex function.
export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
