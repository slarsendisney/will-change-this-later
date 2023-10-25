import {
  VectorStoreIndex,
  ContextChatEngine,
  OpenAI,
  VectorIndexRetriever,
} from "llamaindex";

import { getStorageContext } from "./getStorageContext";

export const loadIndexAsRetriever = async (): Promise<VectorIndexRetriever> => {
  console.log("🔎 Loading index");
  const storageContext = await getStorageContext();
  const loadedIndex = await VectorStoreIndex.init({ storageContext });
  const retriever = loadedIndex.asRetriever();
  retriever.similarityTopK = 2;
  return retriever;
};

export const loadIndexAsChatEngine = async (): Promise<ContextChatEngine> => {
  console.log("🔎 Loading index");
  const storageContext = await getStorageContext();
  const loadedIndex = await VectorStoreIndex.init({ storageContext });
  const retriever = loadedIndex.asRetriever();
  retriever.similarityTopK = 2;
  const chatEngine = new ContextChatEngine({
    retriever,
    chatModel: new OpenAI({
      maxTokens: 300,
      maxRetries: 0,
      model: "gpt-3.5-turbo",
      temperature: 0,
    }),
  });

  return chatEngine;
};

export const queryChatEngine = async (
  chatEngine: ContextChatEngine,
  query: string,
  concise: boolean = true
) => {
  const prompt = concise
    ? `Concisely answer the following question about attending a hackathon: ${query}. Respond in a friendly manner in no more than 100 words. If you think the question is not hackathon related, simply respond saying so.`
    : query;

  const loadedResponse = await chatEngine.chat(prompt);

  return loadedResponse.toString();
};

export const queryRetriever = async (
  retriever: VectorIndexRetriever,
  query: string,
  concise: boolean = true
) => {
  const chatEngine = new ContextChatEngine({
    retriever,
    chatModel: new OpenAI({
      maxTokens: 350,
      maxRetries: 0,
      model: "gpt-3.5-turbo",
      temperature: 0,
    }),
  });

  const prompt = concise
    ? `Concisely answer the following question about attending a hackathon in a friendly manner (max 250 words). If you think the question is not hackathon related simply respond saying so: ${query}`
    : query;

  const loadedResponse = await chatEngine.chat(prompt);

  return loadedResponse.toString();
};
