import {
  VectorStoreIndex,
  SentenceSplitter,
  Document,
  storageContextFromDefaults,
} from "llamaindex";
import dotenv from "dotenv";
import fs from "node:fs/promises";

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

const metadatastrings = ["MetaTitle", "MetaDescription", "Slogan"];

const metadataArrayStrings = [
  "FieldsOfApplication",
  "CategoryCode",
  "Benefits",
];

const createAndPersistIndexText = async () => {
  const products = await fs.readFile("./45k.json", "utf-8");
  const filteredProducts = JSON.parse(products)
    .filter((product) => {
      // check product.masterValues contains all metadatastrings and metadataArrayStrings
      const hasAllMetadata = metadatastrings.every((key) =>
        Object.keys(product.masterValues).includes(key)
      );
      const hasAllMetadataArray = metadataArrayStrings.every((key) =>
        Object.keys(product.masterValues).includes(key)
      );

      return hasAllMetadata && hasAllMetadataArray;
    })
    .slice(0, 1000);

  const productIdsAndDocuments = filteredProducts.map((product) => {
    console.log(product.masterValues);
    return [
      product.id,
      `${metadatastrings.map(
        (key) => `${key.replace("Meta", "")}: ${product.masterValues[key]}`
      )} ${metadataArrayStrings.map(
        (key) =>
          `${key.replace("Meta", "")}: ${product.masterValues[key].join(", ")}`
      )}`,
    ];
  });

  console.log(productIdsAndDocuments);

  const documentChunks = productIdsAndDocuments.map(
    ([id, doc], i) =>
      new Document({ text: doc, id_: id, metadata: { productId: id } })
  );

  const storageContext = await getStorageContext();

  const index = await VectorStoreIndex.fromDocuments(documentChunks, {
    storageContext,
  });

  console.log("📄 Index of Products created");
};

const main = async () => {
  await createAndPersistIndexText();
};

main();
