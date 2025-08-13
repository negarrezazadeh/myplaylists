import FullPageSpinner from "@/ui/FullPageSpinner";
import SubscribeItem from "./SubscribeItem";
import useGetSubscriptions from "./useGetSubscriptions";

export default function SubscriptionsList({ userId }) {
  const { subscriptions, isLoading } = useGetSubscriptions(userId);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      {subscriptions.map((sub) => (
        <SubscribeItem key={sub.id} sub={sub} />
      ))}
    </div>
  );
}
