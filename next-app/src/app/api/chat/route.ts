import { handleQuery } from "@/utils/handleQuery";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // check response for intent and then pass to express server or not
  console.log("post request made via userlike");
  const data = await req.json();

  if (data.packet.name === "message") {
    const { intent, data: resData } = await handleQuery(
      data.packet.payload.body
    );

    if (intent === "PRODUCT_SEARCH") {

      const results = (resData.productItems as any)
        .filter((item:any) => item.records.length > 0)
        .map((item: any, i: number) => {
          const { MetaTitle, MetaDescription, DefPictureUrl } = item.records[0];
          return ({
            headline: MetaTitle,
            subheadline: MetaDescription.slice(0, 50)+ "...",
            media: DefPictureUrl[0],
          })
        })


      return NextResponse.json(
        {
          info: {
            cid: data.info.cid,
          },
          packet: {
            name: "carousel",
            payload: {
                body: "Please choose a messenger channel:",
                fallback: "Please enter a number",
                options: results
            }
          },
        },
        {
          status: 200,
        }
      );
    }

    if (intent === "CUSTOMER_SUPPORT") {
      return NextResponse.json(
        {
          info: {
            cid: data.info.cid,
          },
          packet: {
            name: "message",
            payload: {
              body: "I understand you need some support, how can I help?",
            },
          },
        },
        {
          status: 200,
        }
      );
    }

    if (intent === "NAVIGATION") {
      return NextResponse.json(
        {
          info: {
            cid: data.info.cid,
          },
          packet: {
            name: "message",
            payload: {
              body: "Let's navigate!",
            },
          },
        },
        {
          status: 200,
        }
      );
    }

    if (intent === "FALLBACK") {
      return NextResponse.json(
        {
          info: {
            cid: data.info.cid,
          },
          packet: {
            name: "message",
            payload: {
              body: "Oh no! I don't know how to answer that question.",
            },
          },
        },
        {
          status: 200,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        info: {
          cid: data.info.cid,
        },
        packet: {
          name: "message",
          payload: {
            body: "I understand you need some support, how can I help?",
          },
        },
      },
      {
        status: 200,
      }
    );
  }
}
