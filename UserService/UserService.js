import express from "express";
import jwt from "jsonwebtoken";
import "./env.js";

const app = express();
const PORT = 8001;
const JWT_SECRET = process.env.JWT_SECRET;
const userInfo = { 111: "password" };

app.use(express.json());

app.post("/register", (req, res) => {
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

app.post("/login", (req, res) => {
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

app.get("/profile", (req, res) => {
  const username = req.headers["x-user-username"];
  res.status(200).json({ username: `${username}` });
});

app.listen(PORT, () => {
  console.log(`UserService running at http://localhost:${PORT}`);
});
