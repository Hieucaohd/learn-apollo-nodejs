import { config } from 'dotenv';

const {parsed} = config();

export const {
	PORT,
	MODE,
	IN_PROD = (MODE === "prod"),
	DB = 'mongodb://localhost:27017/hieucaodb',
	BASE_URL,
	URL = `${BASE_URL}${PORT}`,
} = parsed;