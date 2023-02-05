import ExpiredLink from "@/components/redirect/Expired";
import ProtectedLink from "@/components/redirect/Protected";
import { Box, Button, Container } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import Image from "next/image";

export default function ShortPage({ page }) {
  return (
    <>
      <Container maxW="container.xl" px={[4, 10]}>
        <Box h={24} display="flex" alignItems="center" justifyContent="space-between">
          <Image src="/logo.png" width={160} height={80} alt="" />
          <Button colorScheme="twitter" size="lg" rounded="xl">
            Make your own
          </Button>
        </Box>

        {page?.protected && <ProtectedLink urlId={page?.id} />}
        {page?.expired?.state && <ExpiredLink expired={page?.expired} />}
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const supabaseServer = createServerSupabaseClient(ctx);
  const { short } = ctx.params;

  const { data } = await supabaseServer.from("urls").select().eq("slug", short).single();

  const updateViewsTable = async () => {
    const { data: views } = await supabaseServer.from("views").select().single();
    if (views) {
      await supabaseServer
        .from("views")
        .update({ count: data.count + 1 })
        .eq("date", dayjs().format("YYYY-MM-DD"))
        .eq("url_id", data.id);
    } else {
      await supabaseServer.from("views").insert({
        url_id: data.id,
        user_id: data.user_id,
        count: 1,
        date: new Date(),
      });
    }
  };

  if (data) {
    const isExpired = dayjs(data.expired_at).valueOf() < dayjs().valueOf();

    if (data.user_id) {
      // update hit column in urls table
      await supabaseServer
        .from("urls")
        .update({ hit: data.hit + 1 })
        .eq("id", data.id);

      // update analytics table
      updateViewsTable();

      if (isExpired || data.secret_key) {
        return {
          props: {
            page: {
              id: data.id,
              expired: {
                state: isExpired,
                date: data.expired_at,
              },
              protected: Boolean(data.secret_key),
            },
          },
        };
      } else {
        return {
          notFound: false,
          redirect: {
            destination: data.real_url,
            permanent: true,
          },
        };
      }
    }
  }
  return {
    notFound: true,
    props: {},
  };
}
