import { useSubscribe } from "./useSubscribe";
import useIsSubscribe from "./useIsSubscribe";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { Button } from "@/ui/button";

export default function Subscribe({ userId, userIdParam }) {
  const { subscribe, isPending } = useSubscribe();
  const { isSubscribe, isLoading } = useIsSubscribe(userIdParam);

  if (isLoading) return <FullPageSpinner />;

  const handleSubscribe = () => {
    subscribe(userId);
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isPending}
      className={
        isSubscribe
          ? "bg-gray-700 text-white hover:bg-gray-600"
          : "bg-purple-500 text-white hover:bg-purple-400"
      }
    >
      {isSubscribe ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
