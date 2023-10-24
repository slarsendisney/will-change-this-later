import fs from "fs";

const hits = JSON.parse(fs.readFileSync("45k.json"));
const products = hits.length;

console.log(`Total products: ${products}`);


const refinedProducts = []

hits.map((hit) => {
    refinedProducts.push({
        title: hit.masterValues.MetaTitle,
        desc: hit.masterValues.MetaDescription,
        slogan: hit.masterValues.Slogan,
        fieldsOfApplication: hit.masterValues.FieldsOfApplication,
        categoryCode: hit.masterValues.CategoryCode,
        benefits: hit.masterValues.Benefits,
    })
});

let tokenCount = 0
let tokenPrice = 0.0015 / 1000

refinedProducts.map((product) => {
    tokenCount += JSON.stringify(product).split(" ").length;
})

console.log(`Total tokens: ${tokenCount}`)
console.log(`Total price: $${(tokenCount * tokenPrice).toFixed(2)}`)

// const CategoryCodes = new Set();

// hits.map((hit) => {
//    hit.masterValues.CategoryCode.forEach((code) => {
//         CategoryCodes.add(code);
//      })
// })

// console.log(`Total categories: ${CategoryCodes.size}`)

// // write categories to JSON
// fs.writeFile("categories.json", JSON.stringify([...CategoryCodes], null, 4), (err) => {
//     if (err) {
//       console.log(err);
//     }
//   })
