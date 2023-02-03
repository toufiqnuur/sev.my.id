import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

function useUrls() {
  const { data, error, mutate, isLoading } = useSWR("/api/urls/get", fetcher);
  return { data, error, mutate, isLoading };
}

export default useUrls;
