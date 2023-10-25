import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    // check response for intent and then pass to express server or not
    console.log('post request made')
    const { query } = await req.json();

    const instructions = `you are a robot that when asked a question will respond with one of the following intents:
      - PRODUCT_SEARCH: identifies users looking to find information about or purchase a product.
      - CUSTOMER_SUPPORT: identifies users looking to speak to a member of the team in regard to the product they have already purchased.
      - PRESS:  identifies users wanting to read published content.
      - SERVICE:  identifies users looking to find information about services.
      - NAVIGATION: identify users that are looking for a page or information.
      - FALLBACK: all other user questions should fall into this category.
      
      You must respond with either PRODUCT_SEARCH, CUSTOMER_SUPPORT or FALLBACK. DO NOT INCLUDE ANY OTHER TEXT.`

    const messages = [{ role: "system", content: instructions }, { role: "user", content: query }];

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


    if (response.ok) {
      // res.status(200).json({ response: responseJson.choices[0].message.content });
      // match intents and parse to express route 
      //https://sick-express-gpt
    } else {
      // console.log(responseJson);
      // res.status(response.status).json(responseJson);
    }
  }
};

export default handler;