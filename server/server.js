import cors from "cors";
import dotenv from "dotenv";
import chat from "./chat.js";
import tts from "./tts.js";
import express from "express";

dotenv.config();// 用.env


const app = express();
app.use(cors());


const PORT = 5001;


app.get("/chat", async (req, res) => {
 const resp = await chat(req.query.question);
 res.send(resp);
});


app.get("/tts", async (req, res) => {// request 和resolve
 const audioData = await tts(req.query.words);
 res.setHeader("Content-Type", "audio/mpeg");
 res.send(audioData);//必须这样用
});


app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});


