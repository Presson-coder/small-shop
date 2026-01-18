import express from "express";
import itemRoutes from "./routes/itemRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectToDatabase } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDatabase();

app.use("/api/items", itemRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
