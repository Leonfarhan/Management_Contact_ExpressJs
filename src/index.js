import 'dotenv/config';
import express from 'express';
import appMiddleware from './middleware/index.js';

const app = express();
const PORT = 3000;

app.use(appMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});