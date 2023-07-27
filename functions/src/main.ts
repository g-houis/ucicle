import 'dotenv/config';
import { handleGenerateSecretRider } from './handlers/GenerateSecretRider.js';
// import { handleLoadRiders } from './handlers/LoadRiderHandler.js';

// handleLoadRiders()
//     .then((res) => {
//         console.log(res);
        handleGenerateSecretRider()
            .then((res2) => console.log(res2))
            .catch((res2) => console.error(res2));
//     })
//     .catch((res) => console.error(res));
