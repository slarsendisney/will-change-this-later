import { handleQuery } from "@/utils/handleQuery";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
  // check response for intent and then pass to express server or not
  console.log("post request made via userlike");
  const data = await req.json();

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
