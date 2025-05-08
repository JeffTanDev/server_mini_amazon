import express from "express";
import imagesRoute from "./routes/images.js";

const app = express();
const PORT = 8002;

app.use("/", express.static("uploads"));

app.use("/images", imagesRoute);

app.listen(PORT, () => {
  console.log(`ContentService running at http://localhost:${PORT}`);
});
