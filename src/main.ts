import 'dotenv/config';
import { handleLoadRiders } from './handlers/LoadRiderHandler.js';

handleLoadRiders(null, null, null)
    .then((res) => console.log(res))
    .catch((res) => console.error(res));
