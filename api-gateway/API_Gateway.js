import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 8000;
app.use(cors());
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "",
    },
  })
);

app.use(
  "/images",
  createProxyMiddleware({
    target: "http://localhost:8002",
    changeOrigin: true,
    pathRewrite: {
      "^/images": "/images", // 强制保留/images前缀
    },
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
