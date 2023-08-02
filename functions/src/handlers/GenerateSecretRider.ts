import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { uploadObject } from '../s3/S3Service.js';
import { Rider } from '../types/CyclingTypes.js';
import { GameSession } from '../types/GameType.js';
import { HandlerResponse } from '../types/ResponseTypes.js';
import { convertToMin2Digit } from '../utils/numberUtils.js';
import { getMaxMemoryConsumed, memoryStats } from '../utils/statUtils.js';

export { handleGenerateSecretRider };

async function handleGenerateSecretRider(): Promise<HandlerResponse> {
    const startDate: Date = new Date();

    if (!process.env.REGION) throw new Error('REGION environment variable not defined');
    if (!process.env.DOMAIN) throw new Error('DOMAIN environment variable not defined');
    if (!process.env.BUCKET_NAME) throw new Error('BUCKET_NAME environment variable not defined');

    try {
        const dateDayjs = dayjs();
        const date: string = dateDayjs.year().toString()
          .concat(
            convertToMin2Digit(dateDayjs.month())
              .concat(convertToMin2Digit(dateDayjs.date())),
          );
        const ridersResponse: AxiosResponse<Rider[]> = await axios.get(`http://${process.env.BUCKET_NAME}.${process.env.DOMAIN}/api/riders.json`);

        const top200: Rider[] = ridersResponse.data.filter((rider: Rider) => rider.rank <= 100);
        const randomIndex: number = Math.floor(Math.random() * (top200.length + 1));
        const randomRider: Rider = top200[randomIndex];

        const gameSession: GameSession = {
            rider: randomRider,
            date: date
        };

        await uploadObject(
            gameSession,
            'api/secret_rider.json',
            process.env.BUCKET_NAME,
            'ONEZONE_IA',
            'public-read'
        );
        
        memoryStats();

        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;

        console.info(`Successfully generated guess rider ${randomRider.name} with a maximum memory consumption of ${getMaxMemoryConsumed()}MB in ${runTime?.toFixed(2)}s`);
        return {
            body: `Successfully generated guess rider ${randomRider.name} with a maximum memory consumption of ${getMaxMemoryConsumed()}MB in ${runTime?.toFixed(2)}s`,
            statusCode: 200
        };
    } catch (e: unknown) {
        const err: Error = e as Error;
        const endDate: Date = new Date();
        const runTime: number = (endDate.getTime() - startDate.getTime()) / 1000;

        console.error(`Failed generating guess rider (duration ${runTime?.toFixed(2)}s) with error ${err?.message || 'Unknown error'}: ${err?.stack || 'Unknown stacktrace'}`);
        return {
            body: `Failed generating guess rider (duration ${runTime?.toFixed(2)}s) with error ${err?.message || 'Unknown error'}: ${err?.stack || 'Unknown stacktrace'}`,
            statusCode: 500
        };
    }
}
