import axios, { AxiosResponse } from 'axios';

import { uploadObject } from '../s3/S3Service.js';
import { Rider } from '../types/CyclingTypes.js';
import { HandlerResponse } from '../types/ResponseTypes.js';
import { getMaxMemoryConsumed, memoryStats } from '../utils/statUtils.js';

export { handleGenerateGuessRider };

/**
 *
 * @param event The lambda event provided to the function
 * @param context The lambda context provided to the function
 * @param callback Callback to call at the end of the function
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleGenerateGuessRider(event: unknown, context: unknown, callback: unknown): Promise<HandlerResponse> {
    const startDate: Date = new Date();

    if (!process.env.RIDERS_FILE_NAME) throw new Error('RIDERS_FILE_NAME environment variable not defined');
    if (!process.env.GUESS_RIDER_FILE_NAME) throw new Error('GUESS_RIDER_FILE_NAME environment variable not defined');
    if (!process.env.S3_REGION) throw new Error('S3_REGION environment variable not defined');
    if (!process.env.S3_DOMAIN) throw new Error('S3_DOMAIN environment variable not defined');
    if (!process.env.RIDERS_BUCKET_NAME) throw new Error('RIDERS_BUCKET_NAME environment variable not defined');

    try {
        const ridersResponse: AxiosResponse<Rider[]> = await axios.get(`https://${process.env.RIDERS_BUCKET_NAME}.${process.env.S3_DOMAIN}/${process.env.RIDERS_FILE_NAME}`);

        const top200: Rider[] = ridersResponse.data.filter((rider: Rider) => rider.rank <= 200);
        const randomIndex: number = Math.floor(Math.random() * (top200.length + 1));
        const randomRider: Rider = top200[randomIndex];

        await uploadObject(
            randomRider,
            process.env.GUESS_RIDER_FILE_NAME,
            process.env.RIDERS_BUCKET_NAME,
            'ONEZONE_IA',
            'public-read'
        );
        
        memoryStats();

        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;
        return {
            body: `Successfully generated guess rider ${randomRider.name} with a maximum memory consumption of ${getMaxMemoryConsumed()}MB in ${runTime?.toFixed(2)}s`,
            statusCode: 200
        };
    } catch (e: unknown) {
        const err: Error = e as Error;
        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;
        return {
            body: `Failed generating guess rider (duration ${runTime?.toFixed(2)}s) with error ${err?.message || 'Unknown error'}: ${err?.stack || 'Unknown stacktrace'}`,
            statusCode: 500
        };
    }
}
