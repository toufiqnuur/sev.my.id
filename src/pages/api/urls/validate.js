import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const supbaseServer = createServerSupabaseClient({ req, res });
  const { id, passphrase } = JSON.parse(req.body);

  const { data, error } = await supbaseServer
    .from("urls")
    .select()
    .eq("id", id)
    .eq("secret_key", passphrase)
    .single();

  res.status(error ? 401 : 200).json({ redirect: data?.real_url, error });
}
