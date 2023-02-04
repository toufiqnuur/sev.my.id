import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import { VStack } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sev My Id</title>
        <meta name="description" content="Make it short, make it simple" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <VStack spacing={4} align="stretch" mt="8">
        <Hero />
      </VStack>
    </>
  );
}
