/**
 * Returns the first element of an array
 * @param arr
 * @returns the first element of the array
 * @example first([1, 2, 3]) // 1
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Returns the last element of an array
 * @param arr
 * @returns the last element of the array
 * @example last([1, 2, 3]) // 3
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}


/**
 * Removes the first element of an array
 * @param arr
 * @returns a new array without the first element
 * @example removeFirst([1, 2, 3]) // [2, 3]
 */
export function removeFirst<T>(arr: T[]): T[] {
  return arr.slice(1);
}

/**
 * Removes the last element of an array
 * @param arr
 * @returns a new array without the last element
 * @example removeLast([1, 2, 3]) // [1, 2]
 */
export function removeLast<T>(arr: T[]): T[] {
  return arr.slice(0, arr.length - 1);
}


