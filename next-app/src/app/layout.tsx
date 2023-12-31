import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { MessengerProvider } from "@/providers/messenger-context";
import { AnimationProvider } from "@/providers/AnimationProvider";

const inter = Inter({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: "Sick Nebula",
  description: "Product search with Natural Language",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="corporate">
      <body className={`${inter.className} ${sourceCodePro.variable}`}>
        <AnimationProvider>
          <MessengerProvider>{children}</MessengerProvider>
        </AnimationProvider>
        <Script
          async
          type="text/javascript"
          src="https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/2e2f911a8f594f10a171a24424fdd25a7f63c1eb6ff04efab2a3b7a2d30b75d3.js"
        />
      </body>
    </html>
  );
}
