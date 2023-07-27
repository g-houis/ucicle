import { uploadObject } from '../s3/S3Service.js';
import { getRankings, getRiders } from '../scrappers/proCyclingStatScrapper.js';
import { Rank, Rider } from '../types/CyclingTypes.js';
import { HandlerResponse } from '../types/ResponseTypes.js';
import { chunk } from '../utils/arrayUtils.js';
import { getMaxMemoryConsumed } from '../utils/statUtils.js';

export { handleLoadRiders };

async function handleLoadRiders(): Promise<HandlerResponse> {

    const startDate: Date = new Date();

    if (!process.env.BUCKET_NAME) throw new Error('BUCKET_NAME environment variable not defined');

    try {
        const riders: Rider[] = [];

        for (let i = 0; i <= 9; i++) {
            const rankings: Rank[] = await getRankings(i);
            const rankingsMap: Rank[][] = chunk(rankings, 5);

            // To avoid banning the ip and getting oom
            for (const rankingsElement of rankingsMap) {
                const riderResults: Rider[] = await getRiders(rankingsElement);
                riders.push(...riderResults);
            }
        }

        await uploadObject(
            riders,
            'api/riders.json',
            process.env.BUCKET_NAME,
            'ONEZONE_IA',
            'public-read'
        );

        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;

        console.info(`Successfully uploaded ${riders.length} riders with a maximum memory consumption of ${getMaxMemoryConsumed()}MB in ${runTime?.toFixed(2)}s`);
        return {
            body: `Successfully uploaded ${riders.length} riders with a maximum memory consumption of ${getMaxMemoryConsumed()}MB in ${runTime?.toFixed(2)}s`,
            statusCode: 200
        };
    } catch (e: unknown) {
        const err: Error = e as Error;
        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;

        console.error(`Failed importing riders (duration ${runTime?.toFixed(2)}s) with error ${err?.message || 'Unknown error'}: ${err?.stack || 'Unknown stacktrace'}`);
        return {
            body: `Failed importing riders (duration ${runTime?.toFixed(2)}s) with error ${err?.message || 'Unknown error'}: ${err?.stack || 'Unknown stacktrace'}`,
            statusCode: 500
        };
    }
}
