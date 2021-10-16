
import { config } from 'dotenv';
config();


// CONFIG Variable
export default {
	PORT: process.env.PORT || 3000,
	DB_PASS: process.env.DB_PASS,
	DB_NAME: process.env.DB_NAME,
	DB_USER: process.env.DB_USER,
	SECRET: process.env.SECRET,
	EXPIRE_TIME: 60 * 60 * 24,
}