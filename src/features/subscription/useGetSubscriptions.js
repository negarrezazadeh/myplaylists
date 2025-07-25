import { subscriptions as subscriptionsApi } from "@/services/apiSubscribe";
import { useQuery } from "@tanstack/react-query";

export default function useGetSubscriptions() {
  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => subscriptionsApi(),
  });

  return { subscriptions, isLoading };
}
