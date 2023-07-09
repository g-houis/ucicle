import 'dotenv/config';
import { handleGenerateGuessRider } from './handlers/GenerateGuessRiderHandler.js';
import { handleLoadRiders } from './handlers/LoadRiderHandler.js';

handleLoadRiders(null, null, null)
    .then((res) => {
        console.log(res);
        handleGenerateGuessRider(null, null, null)
            .then((res2) => console.log(res2))
            .catch((res2) => console.error(res2));
    })
    .catch((res) => console.error(res));
