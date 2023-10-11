import { config } from "dotenv";
config();

export const PORT = 6969;

export const mongoDBURL = process.env.MONGODB_URL;
