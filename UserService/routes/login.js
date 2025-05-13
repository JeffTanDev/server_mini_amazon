import express from "express";
import jwt from "jsonwebtoken";
import "../env.js";

const JWT_SECRET = process.env.JWT_SECRET;
const userInfo = { 111: "password" };

const route = express.Router();

route.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or Password are required" });
  }
  if (userInfo[username]) {
    return res.status(400).json({ message: "User already exist" });
  }
  userInfo[username] = password;
  return res.status(200).json({ message: "User create successfully" });
});

route.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or Password are required" });
  }
  if (userInfo[username] === password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1m" });
    return res.status(200).json({ message: "Login Success", token });
  } else {
    return res.status(400).json({ message: "Wrong username or password" });
  }
});

export default route;
