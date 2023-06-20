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
        <Box
          h={24}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image src="/logo.png" width={160} height={80} alt="" />
          <Button colorScheme="twitter" size="lg" rounded="xl">
            Make your own
          </Button>
        </Box>

        {page.expired.state ? (
          <ExpiredLink expired={page.expired} />
        ) : page.protected ? (
          <ProtectedLink urlId={page.id} />
        ) : null}
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const supabaseServer = createServerSupabaseClient(ctx);
  const { short } = ctx.params;

  const { data } = await supabaseServer
    .from("urls")
    .select()
    .eq("slug", short)
    .single();

  const updateViews = async () => {
    // update views
    await supabaseServer
      .from("urls")
      .update({ hit: data.hit + 1 })
      .eq("id", data.user_id);
    // update analytics
    const { data: views } = await supabaseServer
      .from("views")
      .select()
      .match({ url_id: data.id, date: dayjs().format("YYYY-MM-DD") })
      .single();
    if (views) {
      await supabaseServer
        .from("views")
        .update({ count: views.count + 1 })
        .match({ url_id: data.id, date: dayjs().format("YYYY-MM-DD") });
    } else {
      await supabaseServer.from("views").insert({
        url_id: data.id,
        user_id: data.user_id,
        count: 1,
        date: dayjs().format("YYYY-MM-DD"),
      });
    }
  };

  if (data) {
    const isExpired = dayjs(data.expired_at).valueOf() < dayjs().valueOf();
    const isProtected = !!data.secret_key;

    // measure owner is not ANONYMOUS
    if (data.user_id) {
      updateViews();
    }

    if (isExpired || isProtected) {
      return {
        props: {
          page: {
            id: data.id,
            protected: isProtected,
            expired: {
              state: isExpired,
              date: data.expired_at,
            },
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
  } else {
    return {
      notFound: true,
    };
  }
}
