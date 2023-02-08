import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const supabaseServer = createServerSupabaseClient({ req, res });

  try {
    const {
      data: { user },
    } = await supabaseServer.auth.getUser();
    if (user) {
      const { data, error } = await supabaseServer
        .from("views")
        .select("count, date")
        .eq("user_id", user?.id);
      res.status(error ? 401 : 200).json({ error, data });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
