import { fetcher } from "./fetcher";

const POST = async (payload) => {
  const res = await fetcher("/api/urls/post", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res;
};

const PATCH = async (urlId, payload) => {
  const res = await fetcher(`/api/urls/patch?id=${urlId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res;
};

export const Api = { POST, PATCH };
