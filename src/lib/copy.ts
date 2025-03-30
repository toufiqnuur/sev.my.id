import copy from "copy-to-clipboard";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;

export const DOMAIN = BASE_URL?.replace(/https?:\/\//, "").replace(/\/$/, "");

export const copyShorten = (shorten: string) => {
  const url = `${BASE_URL}/${shorten}`;
  copy(url);
};

export const shortUrl = (shorten: string) => `${BASE_URL}/${shorten}`;
