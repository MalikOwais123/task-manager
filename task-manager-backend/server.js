import dotenv from "dotenv";
import createApp from "./app.js";

dotenv.config();

const connectToDB = true;
createApp(connectToDB);
