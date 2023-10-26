
const gptURL  = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https://sick-express-gpt.onrender.com" :  "http://localhost:8080"

export const handleQuery = async (query: string) => {
  const instructions = `you are a robot that when asked a question will respond with one of the following intents:
        - PRODUCT_SEARCH: identifies users looking to find information about or purchase a product.
        - CUSTOMER_SUPPORT: identifies users looking to speak to a member of the team in regard to the product they have already purchased.
        - PRESS:  identifies users wanting to read published content.
        - SERVICE:  identifies users looking to find information about services.
        - NAVIGATION: identify users that are looking for information online.
        - FALLBACK: all other user questions should fall into this category.
        
        You must respond with either PRODUCT_SEARCH, CUSTOMER_SUPPORT or FALLBACK. DO NOT INCLUDE ANY OTHER TEXT.`;

  const messages = [
    { role: "system", content: instructions },
    { role: "user", content: query },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY as string}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0,
    }),
  });

  const data = await response.json();

  const recognizedIntents = [
    "PRODUCT_SEARCH",
    "CUSTOMER_SUPPORT",
    "PRESS",
    "SERVICE",
    "NAVIGATION",
    "FALLBACK",
  ];

  let intent = data.choices[0].message.content;

  if (!recognizedIntents.includes(intent)) {
    intent = "FALLBACK";
  }

  const dataObj: any = {};

  switch (intent) {
    case "PRODUCT_SEARCH":
      // pass to express server

      const response = await fetch(
        `${gptURL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.SICK_API_KEY as string,
          },
          body: JSON.stringify({
            query,
          }),
        }
      );

      const productData = await response.json();

      const productIds = productData.response.sourceNodes.map(
        (product: any) => product.metadata.productId
      );

      const productInfo = await Promise.all(
        productIds.map(async (productId: string) => {
          const productResponse = await fetch(
            `https://www.sick.com/api/fact-finder/records/enUS-sick?productNumber=${productId}`
          );
          const productJson = await productResponse.json();
          return productJson;
        })
      );

      console.log(productInfo);

      dataObj["productData"] = productData;
      dataObj["productItems"] = productInfo;
      dataObj["message"] = productData.response.response;

      // https://www.uat.sick.com/api/fact-finder/records/deDE-sick?productNumber=g568268

      break;
    case "CUSTOMER_SUPPORT":
      dataObj["message"] = "Need to speak to a human?";
      break;
    case "NAVIGATION":
      dataObj["message"] = "Let's navigate!";
      break;
    default:
      dataObj["message"] = "Oh no! I don't know how to answer that question.";
      break;
  }

  return { intent, data: dataObj };
};
