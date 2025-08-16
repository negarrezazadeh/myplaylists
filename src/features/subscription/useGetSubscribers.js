import { subscribers as subscribersApi } from "@/services/apiSubscribe";
import { useQuery } from "@tanstack/react-query";

export default function useGetSubscribers(id) {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: () => subscribersApi(id),
  });

  return { subscribers, isLoading };
}
