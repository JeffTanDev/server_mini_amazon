import express from "express";
import imagesRoute from "./routes/images.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8002;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/images", imagesRoute);

app.listen(PORT, () => {
  console.log(`ContentService running at http://localhost:${PORT}`);
});
