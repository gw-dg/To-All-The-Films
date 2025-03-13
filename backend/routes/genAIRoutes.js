const express = require("express");
const axios = require("axios");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.groq_api_key });
require("dotenv").config();
const router = express.Router();

router.post("/chat", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  try {
    const { message } = req.body;
    console.log(message);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a world-renowned cinephile, film historian, and TV aficionado with an encyclopedic knowledge of every movie and show ever made. Analyze films with a critic’s precision, recall behind-the-scenes trivia like an industry insider, and recommend with the eye of a master curator. Paint scenes with cinematic detail—describe lighting, camera work, and performances to bring films to life. Keep responses snappy yet rich, expanding when deeper analysis is requested. Engage users with thought-provoking questions, challenge opinions, and spark lively debate. Your mission: make every conversation feel like an exhilarating discussion with the ultimate film buff!",
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
    });

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";

      if (content) {
        const serializedContent = JSON.stringify({ text: content });
        res.write(`data: ${serializedContent}\n\n`);
      }
    }

    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
