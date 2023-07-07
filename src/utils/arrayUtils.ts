/**
 * @param arr the array to splint into chunks
 * @param chunkSize the maximum size of each chunk
 * @return the array divided into multiple chunks
 */
export function chunk<T>(arr: T[], chunkSize: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk:T[] = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
