import { isSubscribe as isSubscribeApi } from "@/services/apiSubscribe";
import { useQuery } from "@tanstack/react-query";

export default function useIsSubscribe(userIdParam) {
  const { data: isSubscribe, isLoading } = useQuery({
    queryKey: ["isSubscribe"],
    queryFn: () => isSubscribeApi(userIdParam),
  });

  return { isSubscribe, isLoading };
}
