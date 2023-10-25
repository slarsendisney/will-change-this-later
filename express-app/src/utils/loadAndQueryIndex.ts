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
  retriever.similarityTopK = 4;
  return retriever;
};

export const loadIndexAsChatEngine = async (): Promise<ContextChatEngine> => {
  console.log("🔎 Loading index");
  const storageContext = await getStorageContext();
  const loadedIndex = await VectorStoreIndex.init({ storageContext });
  const retriever = loadedIndex.asRetriever();
  retriever.similarityTopK = 4;
  const chatEngine = new ContextChatEngine({
    retriever,
    chatModel: new OpenAI({
      maxTokens: 250,
      maxRetries: 0,
      model: "gpt-3.5-turbo",
      temperature: 0,
    }),
  });

  return chatEngine;
};

export const queryChatEngine = async (
  chatEngine: ContextChatEngine,
  query: string
) => {
  const loadedResponse = await chatEngine.chat(
    `Answer the following being concise, and related to context only: ${query}`
  );

  return loadedResponse;
};

export const queryRetriever = async (
  retriever: VectorIndexRetriever,
  query: string
) => {
  const chatEngine = new ContextChatEngine({
    retriever,
    chatModel: new OpenAI({
      maxTokens: 250,
      maxRetries: 0,
      model: "gpt-3.5-turbo",
      temperature: 0,
    }),
  });

  const loadedResponse = await chatEngine.chat(query);

  return loadedResponse.toString();
};
