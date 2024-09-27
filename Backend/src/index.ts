import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { main_route } from "./Routes";
import { connectDb } from "./Config/database";
import morgan from "morgan";
import cors from "cors";

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

const port: number = app.get("port");
app.listen(port, () => {
	console.log(`Server is Ruuning at http://192.168.1.100:${port}`);
});
