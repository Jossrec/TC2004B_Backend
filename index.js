import "dotenv/config"
import express from "express";
import indexRouter from "./routes/index.routes.js"
import itemsRouter from "./routes/items.routes.js"
import loginRouter from "./routes/login.routes.js"
import cors from "cors";
import morgan from "morgan";

const app = express();

//connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(indexRouter);
app.use(itemsRouter);
app.use(loginRouter);



app.listen(5000, console.log("http://localhost:5000"));
