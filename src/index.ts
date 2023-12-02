import express from "express";
import dotenv from "dotenv";

import "./config/passport.config";
import { routes } from "./index.routes";

dotenv.config();
const app = express();
const PORT: number = Number(process.env.PORT) | 3003;


app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
	console.log("listening to port " + PORT);
});