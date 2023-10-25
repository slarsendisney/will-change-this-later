import fetch from "node-fetch";
import fs from "fs";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const categories = JSON.parse(fs.readFileSync("categories.json"));

const hits = [];

const visitedProducts = new Set();

const getProducts = async (category, page = 1) => {
    console.log(`Getting products for category: ${category}`)
  const child_url = `https://www.uat.sick.com/api/fact-finder/search/enUS-sick?query=%2A&filter=DefType%3AMasterProduct&filter=CategoryCode%3A
${category}`;
console.log(child_url, 'url')
  const response = await fetch(
    `${child_url}${page > 0 ? `&page=${page}` : ""}`
  );

  const data = await response.json();

  console.log(data)
  data.hits.map((hit) => {
    if (visitedProducts.has(hit.id)) {
      console.log(`Duplicate product: ${hit.id}`);
    } else {
      hits.push(...data.hits);
      visitedProducts.add(...data.hits.map((hit) => hit.id));
    }
  });
  return data;
};

const getAllProductsInCategory = async (category) => {
  const data = await getProducts(category);
  const pageCount = data.paging.pageCount;

  const promises = [];
  for (let i = 2; i < pageCount; i++) {
    promises.push(getProducts(category, i));
  }

  await Promise.all(promises);
};

(async () => {
  for await (const category of categories) {
    await getAllProductsInCategory(category);
  }
  fs.writeFile("45k.json", JSON.stringify(hits, null, 4), (err) => {
    if (err) {
      console.log(err);
    }
  });
})();
