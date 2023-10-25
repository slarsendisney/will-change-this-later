import { storageContextFromDefaults } from "llamaindex";
import path from "path";

export const getStorageContext = async () => {
  console.log("💾 Creating or loading storage context");
  //storage should use var/data in the root of the project
  const storageContext = await storageContextFromDefaults({
    persistDir: path.join("/var", "data"),
  });

  return storageContext;
};
