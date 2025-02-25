import express from "express";
import indexRoutes from "./routes/index_routes.js"
import itemsRoutes from "./routes/items_routes.js"
import "dotenv/config"
const app = express();

app.use(indexRoutes);
app.use(itemsRoutes);

app.listen(5001, console.log("http://localhost:5001"));

