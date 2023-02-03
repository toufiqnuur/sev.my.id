import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const payload = JSON.parse(req.body);

  const doPatch = async () => {
    const {
      data: { user },
    } = await supabaseServer.auth.getUser();
    const { data, error } = await supabaseServer
      .from("urls")
      .update({ ...payload })
      .eq("id", req.query.id)
      .eq("user_id", user?.id);
    res.status(error ? 401 : 200).json({ error, data });
  };

  try {
    const { error: slugAvailable } = await supabaseServer
      .from("urls")
      .select("slug")
      .eq("slug", payload.slug)
      .single();
    if (payload?.slug) {
      if (slugAvailable) {
        await doPatch();
      } else {
        res.status(401).json({ error: { message: "Slug not available" } });
      }
    } else {
      await doPatch();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
