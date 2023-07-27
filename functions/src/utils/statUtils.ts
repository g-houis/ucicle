/**
 * Stores the heap total in maxMemConsumed if it's the maximum since the start of the process
 */
export function memoryStats() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!global.maxMemConsumed) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.maxMemConsumed = process.memoryUsage().heapTotal/1000000;
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.maxMemConsumed = Math.max(global.maxMemConsumed, process.memoryUsage().heapTotal/1000000);
    }
}

/**
 * @return the highest value of heap size registered in MB
 */
export function getMaxMemoryConsumed(): number {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return global.maxMemConsumed;
}
