import { handleGenerateSecretRider } from './handlers/GenerateSecretRider.js';
import { handleLoadRiders } from './handlers/LoadRiderHandler.js';

/**
 *
 * @param event The lambda event provided to the function
 * @param context The lambda context provided to the function
 * @param callback Callback to call at the end of the function
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handler(event: { body?: { action: string } }, context: unknown, callback: unknown) {
    switch (event.body?.action) {
        case 'LOAD_RIDERS': {
            return handleLoadRiders();
        }
        case 'GENERATE_SECRET_RIDER': {
            return handleGenerateSecretRider();
        }
        default: {
            console.log('No action matched');
            break;
        }
    }
}
