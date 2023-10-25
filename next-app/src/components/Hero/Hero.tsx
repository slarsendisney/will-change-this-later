"use client";
import { ResizablePanel } from "@/animations/ResizablePanel";
import { NebulaLogo } from "@/assets/NebulaLogo";
import { PathLogo } from "@/assets/PathLogo";
import { SickLogo } from "@/assets/SickLogo";
import Highlighter from "react-highlight-words";
import {
  ArrowPathRoundedSquareIcon,
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Feedback } from "../Feedback";
import { ProductSearch } from "../ProductSearch/ProductSearch";
import { AnimatedText } from "@/animations/AnimatedText";

const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(find, "g"), replace);
};

export const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [resultReturned, setResultReturned] = useState(false);
  const [data, setData] = useState<any>();
  const [query, setQuery] = useState(
    "What lidar sensors do you have?" as string
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // if query has changed update input
  }, [query]);

  const fetchStuff = async () => {
    setLoading(true);
    const res = await fetch("/api", {
      method: "post",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setData(data);
    setLoading(false);
    setResultReturned(true);
  };

  const onClick = () => {
    fetchStuff();
  };
  return (
    <div className="mx-auto w-full sm:px-6 lg:px-8 max-w-7xl">
      <m.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="h-48 -mb-4 overflow-visible relative"
      >
        <div className="absolute bottom-0 w-full">
          <PathLogo className="w-1/2 mx-auto z-50 text-white opacity-30" />
        </div>
      </m.div>
      <m.div
        initial={{
          y: 200,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
          duration: 0.6,
        }}
        className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"
      >
        <SickLogo
          className={`w-24 absolute top-0 left-0 z-50 text-white m-8 opacity-50 `}
        />
        {resultReturned && (
          <div className="absolute top-0 right-0 m-8">
            <button
              className="btn btn-primary rounded-lg"
              onClick={() => setResultReturned(false)}
            >
              <ArrowPathRoundedSquareIcon className="w-6" />
              Restart
            </button>
          </div>
        )}
        {!resultReturned && (
          <>
            <div className="flex items-center justify-center space-x-2 mx-auto relative pointer-events-none ">
              <m.div
                animate={
                  loading
                    ? {
                        rotate: 360,
                        scale: [0.5, 0.4, 0.5],
                      }
                    : {
                        scale: 1,
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
                className="absolute top-0 left w-full h-full flex items-center justify-center"
              >
                <NebulaLogo
                  className={`w-96 h-96 transition-all duration-200 transform ${
                    loading
                      ? "opacity-80 scale-50 text-blue-400"
                      : "opacity-10 text-gray-200"
                  } `}
                />
              </m.div>
              <h2
                className={`mx-auto max-w-2xl text-center text-5xl font-bold tracking-tight text-white sm:text-6xl transition-all duration-200 ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
              >
                Nebula
              </h2>
            </div>
          </>
        )}
        <ResizablePanel initialHeight={0}>
          {!loading && !resultReturned && (
            <div id="initial" className="space-y-4  text-gray-300">
              <p className="mx-auto mt-2 max-w-xl text-center text-xl leading-8">
                Search over 19,000 products with natural language
              </p>
              <form
                className="shadow-xl rounded"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="join w-full rounded overflow-hidden">
                  <input
                    autoComplete="off"
                    id="search"
                    name="search"
                    type="serch"
                    required
                    className="input input-lg w-full bg-gray-800 text-white join-item"
                    placeholder="Ask a Question"
                    onChange={(e) => setQuery(e.target.value)}
                    // value={query}
                  />
                  <button
                    className="btn btn-primary btn-lg join-item"
                    onClick={onClick}
                  >
                    <RocketLaunchIcon className="h-6 w-6 m-1" />
                  </button>
                </div>
              </form>
              <div className="w-full space-y-4 pt-8 flex flex-col">
                <div className="flex items-center space-x-2 opacity-50">
                  <ArrowTrendingUpIcon className="h-6 w-6 inline-block" />
                  <p>Trending Questions</p>
                </div>
                {isVisible && (
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      "Sensors to detect transparent objects",
                      "Help me find a light emitting diode",
                      "Sensors to detect transparent objects",
                      "Sensors to detect transparent objects",
                      "Sensors to detect transparent objects",
                      "Sensors to detect transparent objects",
                    ].map((q, i) => (
                      <m.button
                        initial={{
                          opacity: 0,
                          y: -20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.7 + i / 10,
                          duration: 0.3,
                        }}
                        key={q + i}
                        className="card bg-gray-800 p-4"
                        onClick={(e) => {
                          setQuery(q);
                          onClick();
                        }}
                      >
                        <p>{q}</p>
                      </m.button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {resultReturned && data && (
            <>
              <div className="text-gray-400 space-y-16">
                <div className="flex flex-col space-y-4">
                  <div className="badge badge-outline px-2 badge-lg rounded-full badge-success mx-auto flex items-center">
                    <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
                    PRODUCT SEARCH
                  </div>
                  <div className="">
                    {data.data.message
                      .split("\n")
                      .map((line: string, i: number) => (
                        <AnimatedText
                          text={line}
                          key={i}
                          delay={i / 5}
                          className="text-xl font-medium text-left"
                        />
                      ))}
                  </div>
                </div>
                <ProductSearch data={data} query={data.data.message} />
                <Feedback />
              </div>
            </>
          )}
        </ResizablePanel>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 text-black opacity-20"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            className="fill-current"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx={0}
              cy={0}
              r={1}
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
            </radialGradient>
          </defs>
        </svg>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.7,
          duration: 0.6,
        }}
        className="p-2 flex flex-col w-full items-center text-gray-800 justify-center space-y-2"
      >
        <p className="text-xs uppercase opacity-70">Built by</p>
        <div className="flex items-center gap-2">
          <m.a
            initial={{
              x: -50,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              delay: 0.7,
              duration: 0.6,
            }}
            href="https://sld.codes"
          >
            <Image
              alt="SLD"
              width="40"
              height="40"
              src="/images/sam.jpeg"
              className="rounded-full"
            />
          </m.a>
          <p className="opacity-70 text-2xl">&amp;</p>
          <m.a
            initial={{
              x: 50,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              delay: 0.7,
              duration: 0.6,
            }}
            href="https://www.tessabreen.net"
          >
            <Image
              alt="TB"
              width="40"
              height="40"
              src="/images/tessa.jpeg"
              className="rounded-full"
            />
          </m.a>
        </div>
      </m.div>
    </div>
  );
};
