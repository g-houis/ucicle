import { uploadObject } from '../s3/S3Service.js';
import { getRankings, getRiders } from '../scrappers/proCyclingStatScrapper.js';
import { Rank, Rider } from '../types/CyclingTypes.js';
import { HandlerResponse } from '../types/ResponseTypes.js';
import { chunk } from '../utils/arrayUtils.js';
import { getMaxMemoryConsumed } from '../utils/statUtils.js';

export { handleLoadRiders };

/**
 *
 * @param event The lambda event provided to the function
 * @param context The lambda context provided to the function
 * @param callback Callback to call at the end of the function
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleLoadRiders(event: unknown, context: unknown, callback: unknown): Promise<HandlerResponse> {
    const startDate: Date = new Date();

    if (!process.env.RIDERS_FILE_NAME) throw new Error('RIDERS_FILE_NAME environment variable not defined');
    if (!process.env.RIDERS_BUCKET_NAME) throw new Error('RIDERS_FILE_NAME environment variable not defined');

    try {
        const riders: Rider[] = [];

        for (let i = 0; i <= 9; i++) {
            const rankings: Rank[] = await getRankings(i);
            const rankingsMap: Rank[][] = chunk(rankings, 20);

            // To avoid banning the ip and getting oom
            for (const rankingsElement of rankingsMap) {
                const riderResults: Rider[] = await getRiders(rankingsElement);
                riders.push(...riderResults);
            }
        }

        await uploadObject(
            riders,
            process.env.RIDERS_FILE_NAME,
            process.env.RIDERS_BUCKET_NAME,
            'ONEZONE_IA',
            'public-read'
        );

        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;
        return {
            body: `Successfully uploaded ${riders.length} riders with a maximum memory consumption of ${getMaxMemoryConsumed()}MB in ${runTime?.toFixed(2)}s`,
            statusCode: 200
        };
    } catch (e: unknown) {
        const err: Error = e as Error;
        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;
        return {
            body: `Failed importing riders (duration ${runTime?.toFixed(2)}s) with error ${err?.message || 'Unknown error'}: ${err?.stack || 'Unknown stacktrace'}`,
            statusCode: 500
        };
    }
}
