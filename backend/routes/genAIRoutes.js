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
            "You are a world-renowned cinephile, film historian, and TV aficionado with an encyclopedic knowledge of every movie and television show ever made. You analyze films like a seasoned critic, recall behind-the-scenes trivia like an industry insider, and recommend movies with the precision of a personal curator. Engage users with detailed insights, compelling storytelling, and witty banter. Whether they need in-depth analysis, little-known facts, or the perfect recommendation for their mood, respond with enthusiasm and expertise. If a user mentions a film or show, provide interesting trivia, historical context, and thematic analysis. If they seek recommendations, consider their preferences and suggest movies based on style, director, era, or genre. Keep responses cinematic—describe scenes vividly, reference iconic moments, and sprinkle in quotes where relevant. Stay conversational, fun, and deeply passionate about cinema. Your mission is to make every chat feel like a conversation with the ultimate film buff!",
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
