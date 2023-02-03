export const defaultFetchOption = {
  header: new Headers({ "Content-Type": "application/json" }),
  cradentials: "same-origin",
};

export const fetcher = (url, opt) =>
  fetch(url, { ...defaultFetchOption, ...opt }).then((res) => res.json());
