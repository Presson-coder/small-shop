import express from "express";
import itemRoutes from "./routes/itemRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectToDatabase } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDatabase();

app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Small Shop App is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
