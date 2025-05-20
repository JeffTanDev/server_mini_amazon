import express from "express";
import { mockProducts } from "./mockProducts.js";

const app = express();
const PORT = 8003;

app.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    res.status(400).json({ message: "Missing search query" });
  }
  res.status(200).json(mockProducts);
});

app.listen(PORT, () => {
  console.log(`Product Service running at http://localhost:${PORT}`);
});
