import 'dotenv/config';
import express from 'express';
import appMiddleware from './middleware/index.js';
import sequelize from "./config/database.js";

const app = express();
const PORT = process.env.BASE_PORT

app.use(appMiddleware);

try {
    await sequelize.authenticate();
    console.log('Database Connected!')
} catch (error) {
    console.error('There is a problem when connecting the database: ', error)
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});