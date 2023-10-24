import {
  VectorStoreIndex,
  ContextChatEngine,
  OpenAI,
  VectorIndexRetriever,
  storageContextFromDefaults,
} from "llamaindex";
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


  console.log(loadedResponse);
  return loadedResponse.toString();
};

export const loadIndexAsChatEngine = async () => {
  console.log("🔎 Loading index");
  const storageContext = await getStorageContext();
  const loadedIndex = await VectorStoreIndex.init({ storageContext });
  const retriever = loadedIndex.asRetriever();
  retriever.similarityTopK = 2;
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
    "I am looking for a Speed Monitor that provides Safe Motion Monitoring and Control",
    false
  );

  console.log(response);

  const response2 = await queryChatEngine(
    chatEngine,
    "I am searching for a sensor that can detect transparent objects",
    false
  );

  console.log(response2);
};

const main = async () => {
  await testIndex();
};

main();
