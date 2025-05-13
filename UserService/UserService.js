import express from "express";
import loginRoute from "./routes/login.js";
import "./env.js";

const app = express();
const PORT = 8001;
const protectURL = ["/profile"];

app.use(express.json());

app.use("/", loginRoute);

app.get("/profile", (req, res) => {
  const username = req.headers["x-user-username"];
  res.status(200).json({ username: `${username}` });
});

app.get("/protectURL", (req, res) => {
  res.status(200).json({ protectedRoutes: protectURL });
});

app.listen(PORT, () => {
  console.log(`UserService running at http://localhost:${PORT}`);
});
