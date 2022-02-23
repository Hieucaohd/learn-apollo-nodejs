import { config } from 'dotenv';

const {parsed} = config();

export const {
	PORT,
	MODE,
	IN_PROD = (MODE === "prod"),
	DB = 'mongodb+srv://hieucao192:helloworld123@authenticationtest.6lh8w.mongodb.net/learnApollo?retryWrites=true&w=majority',
	BASE_URL,
	URL = `${BASE_URL}${PORT}`,
} = parsed;