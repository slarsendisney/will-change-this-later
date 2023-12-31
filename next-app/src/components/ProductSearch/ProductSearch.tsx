"use client";
import { m } from "framer-motion";
import Highlighter from "react-highlight-words";
import Image from "next/image";

export const ProductSearch = ({
  data,
  query,
}: {
  data: any;
  query: string;
}): JSX.Element => (
  <div className="grid md:grid-cols-2 gap-4">
    {(data.data.productItems as any)
      .filter((item: any) => item.records.length > 0)
      .map((item: any, i: number) => {
        const { MetaTitle, MetaDescription, DefPictureUrl, DefUrl } =
          item.records[0];

        console.log("item", item.records[0]);

        return (
          <m.div
            key={i}
            className="card w-full bg-base-100 shadow-xl"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: i / 10,
              duration: 0.3,
            }}
          >
            <div className="h-64">
              {DefPictureUrl.length > 0 ? (
                <Image
                  width="600"
                  height="200"
                  src={DefPictureUrl[0]}
                  alt="Shoes"
                  className="h-64 w-auto object-cover origin"
                />
              ) : (
                <div className="bg-gray-400 h-32 w-full" />
              )}
            </div>
            <div className="card-body bg-gray-800">
              <h2 className="card-title">{MetaTitle || "-"}</h2>
              <p>
                <Highlighter
                  highlightClassName={`text-white bg-gray-700 rounded`}
                  searchWords={query
                    .split(" ")
                    .map((q, i) => (i > 0 ? ` ${q} ` : `${q} `))}
                  autoEscape={true}
                  textToHighlight={
                    (MetaDescription || "-").slice(0, 200) + "..."
                  }
                />
              </p>
              <div className="card-actions justify-end">
                <a
                  href={`https://sick.com${DefUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn btn-primary rounded-lg">Visit</button>
                </a>
              </div>
            </div>
          </m.div>
        );
      })}
  </div>
);
