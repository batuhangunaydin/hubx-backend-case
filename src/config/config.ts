import dotenv from 'dotenv';

dotenv.config();

// Declare all variables
const NODE_ENV = process.env.NODE_ENV || '';
const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || '';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.xgqwh.mongodb.net/hubx`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const MONGO_URL_LOCAL = process.env.MONGO_URL || '';

//Create config object
const config = {
    mongo: {
        url: MONGO_URL,
        dbName: MONGO_DB_NAME
    },
    server: {
        port: SERVER_PORT,
    },
};

//Check for environment
if (NODE_ENV === 'production') {
    config.mongo.url = MONGO_URL;
    config.server.port = SERVER_PORT;
} else if (NODE_ENV === 'dev') {
    config.mongo.url = MONGO_URL_LOCAL;
    config.server.port = SERVER_PORT;
}

//export
export default config;