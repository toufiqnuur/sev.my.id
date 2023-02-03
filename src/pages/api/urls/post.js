import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { customAlphabet } from "nanoid";

export default async function handler(req, res) {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const payload = JSON.parse(req.body);

  const generateSlug = async () => {
    const nanoid = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      7
    );
    const slug = nanoid();
    const { error: slugAvailable } = await supabaseServer
      .from("urls")
      .select("slug")
      .eq("slug", slug)
      .single();
    return slugAvailable ? slug : await generateSlug();
  };

  try {
    const slug = await generateSlug();
    const { data, error } = await supabaseServer
      .from("urls")
      .insert({ slug, ...payload })
      .select()
      .single();
    res.status(error ? 401 : 200).json({ error, data });
  } catch (error) {
    res.status(500).json({ error });
  }
}
