import "dotenv/config";
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import items2Routes from "./routes/items2.routes.js";
import loginRoutes from "./routes/login.routes.js";
// import { connectDB } from "./utils/mongodb.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(indexRoutes);
app.use(itemsRoutes);
// app.use(items2Routes);
app.use(loginRoutes);
app.listen(5000, console.log("http://localhost:5000"));

