import express from "express";

const app = express();
const PORT = 8002;
app.use("/", express.static("uploads"));
app.listen(PORT, () => {
  console.log(`ContentService running at http://localhost:${PORT}`);
});
