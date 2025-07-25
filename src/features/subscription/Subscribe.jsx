import { useSubscribe } from "./useSubscribe";
import useIsSubscribe from "./useIsSubscribe";
import { Button } from "@/ui/button";

export default function Subscribe({ userId, userIdParam }) {
  const { subscribe, isPending } = useSubscribe();
  const { isSubscribe, isLoading } = useIsSubscribe(userIdParam);

  const handleSubscribe = () => {
    subscribe(userId);
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isPending || isLoading}
      className={`text-white ${
        isSubscribe
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-purple-500 hover:bg-purple-400"
      } `}
    >
      {isSubscribe ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
