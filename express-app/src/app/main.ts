import { ContextChatEngine } from "llamaindex";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fetch from "node-fetch-commonjs";

let chatEngine: ContextChatEngine;
const app = express();
const port = process.env.PORT || 8080; // default port to listen

// (async () => {
//   chatEngine = await loadIndexAsChatEngine();
//   console.log("🔎 Loaded index");
// })();

dotenv.config();
// Configure Express to use body-parser as middle-ware.
app.use(bodyParser.json());

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.post("/api/chat", async (req, res) => {
  // check x-api-key
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.SICK_API_KEY) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (!chatEngine) {
    res.send("Loading index");
    return;
  }

  const { query } = req.body;

  // const response = await queryChatEngine(chatEngine, query);

  // send as json
  res.status(200).json({
    response: {},
  });
});

app.post("/api/request", async (req, res) => {
  // check x-api-key
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.SICK_API_KEY) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { messages } = req.body;

  if (!messages) {
    res.status(400).json({ message: "messages missing" });
    return;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY as string}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0,
    }),
  });

  const responseJson = (await response.json()) as {
    choices: { message: { content: string } }[];
  };

  if (response.ok) {
    res.status(200).json({ response: responseJson.choices[0].message.content });
  } else {
    console.log(responseJson);
    res.status(response.status).json(responseJson);
  }
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
