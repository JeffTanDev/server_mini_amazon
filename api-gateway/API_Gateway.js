import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";
import "./env.js";

const app = express();
const PORT = 8000;
const JWT_SECRET = process.env.JWT_SECRET;
app.use(cors());

const authenticationToken = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "No Token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Token invalid" });
    }
    req.headers["x-user-username"] = user.username;
    next();
  });
};

const protectedRoutes = ["/profile", "/update-profile", "/change-password"];

app.use(
  "/UserService",
  (req, res, next) => {
    if (
      protectedRoutes.some((route) => {
        return req.path.startsWith(route);
      })
    ) {
      return authenticationToken(req, res, next);
    }
    next();
  },
  createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    pathRewrite: {
      "^/UserService": "",
    },
  })
);

app.use(
  "/ContentService",
  createProxyMiddleware({
    target: "http://localhost:8002",
    changeOrigin: true,
    pathRewrite: {
      "^/ContentService": "",
    },
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
