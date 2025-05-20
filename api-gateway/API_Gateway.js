import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";
import axios from "axios";
import "./env.js";

const app = express();
const PORT = 8000;
const JWT_SECRET = process.env.JWT_SECRET;
const USER_SERVICE_IP = process.env.USER_SERVICE_IP;
const CONTENT_SERVICE_IP = process.env.CONTENT_SERVICE_IP;
const PRODUCT_SERVICE_IP = process.env.PRODUCT_SERVICE_IP;
app.use(cors());

let protectedRoutes = [];

const fetchProtectRoutes = async () => {
  const response = await axios.get(`${USER_SERVICE_IP}/protectURL`);
  protectedRoutes = response.data.protectedRoutes;
};

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
    target: `${USER_SERVICE_IP}`,
    changeOrigin: true,
    pathRewrite: {
      "^/UserService": "",
    },
  })
);

app.use(
  "/ProductService",
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
    target: `${PRODUCT_SERVICE_IP}`,
    changeOrigin: true,
    pathRewrite: {
      "^/ProductService": "",
    },
  })
);

app.use(
  "/ContentService",
  createProxyMiddleware({
    target: `${CONTENT_SERVICE_IP}`,
    changeOrigin: true,
    pathRewrite: {
      "^/ContentService": "",
    },
  })
);

app.listen(PORT, () => {
  fetchProtectRoutes();
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
