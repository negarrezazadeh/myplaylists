import { useSubscribe } from "./useSubscribe";
import useIsSubscribe from "./useIsSubscribe";
import FullPageSpinner from "@/ui/FullPageSpinner";

export default function Subscribe({ userId, userIdParam }) {
  const { subscribe, isPending } = useSubscribe();
  const { isSubscribe, isLoading } = useIsSubscribe(userIdParam);

  if (isLoading) return <FullPageSpinner />;

  const handleSubscribe = () => {
    subscribe(userId);
  };

  return (
    <div className="absolute right-2 top-0 lg:right-5">
      <button
        onClick={handleSubscribe}
        disabled={isPending}
        className="rounded-3xl border border-gray-400 px-3 py-1 text-xs text-gray-200 lg:text-sm"
      >
        {isSubscribe ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
}
