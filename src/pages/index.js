import Features from "@/components/home/Features";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import { Box, Container, Grid, Heading, Show, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

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
      <VStack spacing={[24, 16]} align="stretch" mt="8">
        <Hero />
        <Features />
      </VStack>
    </>
  );
}
