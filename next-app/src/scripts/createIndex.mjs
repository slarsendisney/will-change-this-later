import {
  VectorStoreIndex,
  SentenceSplitter,
  Document,
  storageContextFromDefaults,
} from "llamaindex";
import fse from "fs-extra";
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
  const filteredProducts = JSON.parse(products).filter((product) => {
    // check product.masterValues contains all metadatastrings and metadataArrayStrings
    const hasAllMetadata = metadatastrings.every((key) =>
      Object.keys(product.masterValues).includes(key)
    );
    const hasAllMetadataArray = metadataArrayStrings.every((key) =>
      Object.keys(product.masterValues).includes(key)
    );

    return hasAllMetadata && hasAllMetadataArray;
  });

  const visitedProducts = new Set();

  const chunkSize = 50;
  const chunks = [];
  let proccessedChunks = 0;
  for (let i = 0; i < filteredProducts.length; i += chunkSize) {
    chunks.push(filteredProducts.slice(i, i + chunkSize));
  }

  for await (const chunk of chunks) {
    const currentDateTimestamp = new Date().getTime();
    const indexName = `indexProducts-${currentDateTimestamp}`;

    fse.copySync("./src/storage/", `./src/storage-archive/${indexName}/`, {
      overwrite: true,
    });
    // precentage complete
    console.log(`${(proccessedChunks / chunks.length) * 100}% done`);

    const productIdsAndDocuments = chunk
      .filter((prod) => {
        if (visitedProducts.has(prod.id)) {
          return false;
        }
        visitedProducts.add(prod.id);
        return true;
      })
      .map((product) => {
        return [
          product.id,
          `${metadatastrings.map(
            (key) => `${key.replace("Meta", "")}: ${product.masterValues[key]}`
          )} ${metadataArrayStrings.map(
            (key) =>
              `${key.replace("Meta", "")}: ${product.masterValues[key].join(
                ", "
              )}`
          )}`,
        ];
      });

    const documentChunks = productIdsAndDocuments.map(
      ([id, doc], i) =>
        new Document({ text: doc, id_: id, metadata: { productId: id } })
    );

    const storageContext = await getStorageContext();

    await VectorStoreIndex.fromDocuments(documentChunks, {
      storageContext,
    });

    proccessedChunks++;
    
    console.log("chunk done")
  }
};

const main = async () => {
  await createAndPersistIndexText();
};

main();
