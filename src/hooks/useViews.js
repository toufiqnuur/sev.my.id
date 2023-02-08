import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

function useViews() {
  const { data, error, mutate, isLoading } = useSWR("/api/views/get", fetcher);
  return { data, error, mutate, isLoading };
}

export default useViews;
