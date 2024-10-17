import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import { main_route } from "./routes";
import { connectDb } from "./config/database";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./handlers/error-handler";
import { HttpException } from "./handlers/http_exception-handler";
import user_router from "../src/routes/user-route";
import vocab_router from "../src/routes/vocab";

//chay database mongoose
connectDb();

dotenv.config();

const app: Application = express();
app.set("port", process.env.PORT || 3000);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
	cors({
		origin: "http://localhost:8081",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);



app.use("/api", main_route);

app.get("/", (req: Request, res: Response) => {
	res.send("Learn English");
});
app.use("/api", main_route);

app.use((req: Request, res: Response,next:NextFunction) => {
	next(new HttpException(404,"Api not found"))
  });
app.use(errorHandler)

const port: number = app.get("port");
app.listen(port, () => {
	console.log(`Server is Ruuning at http://192.168.1.100:${port}`);
});
