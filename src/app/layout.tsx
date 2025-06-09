"use client";
import "./globals.css";
import { Host_Grotesk } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/apollo/apolloClient";
import CircleContext, {
  initialState,
  reducer,
} from "@/controller/CircleController";
import { useReducer } from "react";
import Modal from "@/components/Modal/Modal";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <html lang="en">
      <head>
        <title>Circles</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Circles - A social media platform" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ overflow: "hidden" }} className={hostGrotesk.className}>
        <ApolloProvider client={apolloClient}>
          <CircleContext value={{ state, dispatch }}>
            {children}
            <Modal />
          </CircleContext>
        </ApolloProvider>
      </body>
    </html>
  );
}
