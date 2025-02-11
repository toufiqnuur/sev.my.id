import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import TrialForm from "@/components/home/TrialForm";
import { Box, Stack } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";

export default function Home({ statistics }) {
  return (
    <>
      <Head>
        <title>Sev My Id</title>
        <meta name="description" content="Make it short, make it simple" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box bg="#03001C" overflow="hidden">
        <Header />
        <Stack spacing={[24, 16]} align="stretch" mt="8">
          <Hero />
          <Features />
          <Statistics data={statistics} />
          <TrialForm />
        </Stack>
        <Footer />
      </Box>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const supabaseServer = createServerSupabaseClient(ctx);

  let { data: statistics_view, error } = await supabaseServer
    .from('statistics_view')
    .select('*')
    .single();

  return {
    props: {
      statistics: statistics_view
    },
  };
}
