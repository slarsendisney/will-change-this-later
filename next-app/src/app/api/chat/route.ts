import { handleQuery } from "@/utils/handleQuery";
import { NextRequest, NextResponse } from "next/server";

// "info": {
//   "approach_mode": "normal",
//   "cid": "chatbot::258:a56785fb6fb84edd890905913b0c0821",
//   "contact": {},
//   "context": {},
//   "conversation": {},
//   "widget": {}
// },
// "packet": {
//   "name": "start",
//   "payload": {}
// }

export async function POST(req: NextRequest, res: NextResponse) {
  // check response for intent and then pass to express server or not
  console.log("post request made via userlike");
  const data = await req.json();

  console.log(data)

  return NextResponse.json(
    {
      info: {
        cid: data.info.cid,
      },
      packet: {
        name: "message",
        payload: {
          body: "Hello, I am Bot.",
        },
      },
    },
    {
      status: 200,
    }
  );
}
