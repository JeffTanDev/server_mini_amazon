import express from "express";
import cors from "cors";
import axios from "axios";

const app=express();
const PORT=8001;
app.use(cors());
app.use(express.json());

app.get('/',(req, res)=>{
    res.send("First microservice");
})

app.listen(PORT,()=>{
    console.log(`UserService running at http://localhost:${PORT}`);
})