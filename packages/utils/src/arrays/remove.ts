/**
 * Removes the element at the specified index from the array.
 * This modifies the original array.
 * @param arr - The array from which to remove the element.
 * @param index - The index of the element to remove.
 * @returns The modified array with the element removed.
 * @example remove([1, 2, 3], 1) // [1, 3]
 */
export function remove<T>(arr: T[], index: number): T[] {
  // Adjust the index if it's negative
  const adjustedIndex = index < 0 ? arr.length + index : index;

  // If the adjusted index is out of bounds, return the original array
  if (adjustedIndex < 0 || adjustedIndex >= arr.length) {
    return arr;
  }

  // Remove the element at the specified index
  arr.splice(adjustedIndex, 1);
  return arr;
}
