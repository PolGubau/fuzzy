/**
 * Chunk an array into smaller arrays of a specified size
 * @param data - the array to chunk
 * @param size - the size of each chunk (default 10)
 * @returns an array of smaller arrays (data[])
 */
export const chunk = <T>(data: T[], size = 10): T[][] => {
  return data.reduce((chunks: T[][], item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
};