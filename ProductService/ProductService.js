import express from "express";
import { mockProducts } from "./mockProducts.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8003;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/images/:id", async (req, res) => {
  const productId = req.params.id;
  const productDir = path.join(__dirname, "uploads", productId);
  try {
    await fs.access(productDir);
  } catch (error) {
    return res.status(404).json({ message: "Product Images not found" });
  }
  const files = await fs.readdir(productDir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
  });
  const imgURL = imageFiles.map((file) => {
    return `/uploads/${productId}/${file}`;
  });
  res.status(200).json(imgURL);
});

app.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    res.status(400).json({ message: "Missing search query" });
  }
  res.status(200).json(mockProducts);
});

app.get("/getProduct/:id", (req, res) => {
  const productId = req.params.id;
  const productInfo = mockProducts.filter(
    (product) => product.id == productId
  )[0];
  if (!productInfo) {
    res.status(400).json({ message: "Product ID Incorrect" });
  }
  res.status(200).json(productInfo);
});

app.listen(PORT, () => {
  console.log(`Product Service running at http://localhost:${PORT}`);
});
