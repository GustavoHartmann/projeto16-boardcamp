import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js";
import customerRoutes from "./routes/customerRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(gameRoutes);
app.use(customerRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));
