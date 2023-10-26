import { handleQuery } from "@/utils/handleQuery";
import { NextRequest, NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req: NextRequest, res: NextResponse) {
  // check response for intent and then pass to express server or not
  console.log("post request made");
  const { query } = await req.json();

  const {intent, data} = await handleQuery(query);

  return NextResponse.json(
    {
      intent,
      data,
    },
    {
      status: 200,
    }
  );
}
