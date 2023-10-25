import { storageContextFromDefaults } from "llamaindex";

export const getStorageContext = async () => {
  console.log("💾 Creating or loading storage context");
  const storageContext = await storageContextFromDefaults({
    persistDir: "./src/storage",
  });

  return storageContext;
};
