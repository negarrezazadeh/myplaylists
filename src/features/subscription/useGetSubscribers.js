import { subscribers as subscribersApi } from "@/services/apiSubscribe";
import { useQuery } from "@tanstack/react-query";

export default function useGetSubscribers() {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: () => subscribersApi(),
  });

  return { subscribers, isLoading };
}
