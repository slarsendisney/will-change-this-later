import {
  VectorStoreIndex,
  ContextChatEngine,
  OpenAI,
  VectorIndexRetriever,
  storageContextFromDefaults,
} from "llamaindex";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const getStorageContext = async () => {
  console.log("💾 Creating or loading storage context");
  const storageContext = await storageContextFromDefaults({
    persistDir: "./src/storage",
  });

  return storageContext;
};

export const queryChatEngine = async (chatEngine, query) => {
  const loadedResponse = await chatEngine.chat(query);

  loadedResponse.sourceNodes.map((node) => {
    console.log(node.metadata.productId);
  })
 
  return loadedResponse.toString();
};

export const loadIndexAsChatEngine = async () => {
  console.log("🔎 Loading index");
  const storageContext = await getStorageContext();
  const loadedIndex = await VectorStoreIndex.init({ storageContext });
  const retriever = loadedIndex.asRetriever();
  retriever.similarityTopK = 10;
  const chatEngine = new ContextChatEngine({
    retriever,
    chatModel: new OpenAI({
      maxTokens: 100,
      maxRetries: 0,
      model: "gpt-3.5-turbo",
      temperature: 0,
    }),
  });

  return chatEngine;
};

const testIndex = async () => {
  const chatEngine = await loadIndexAsChatEngine();

  const response = await queryChatEngine(
    chatEngine,
    "what lidar products do you have and what are the differences in benefits between them?"
  );

  console.log(response);

};

const main = async () => {
  await testIndex();
};

main();
