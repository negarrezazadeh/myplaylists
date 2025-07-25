import FullPageSpinner from "@/ui/FullPageSpinner";
import useGetSubscriptions from "./useGetSubscriptions";
import SubscribeItem from "./SubscribeItem";

export default function SubscriptionsList() {
  const { subscriptions, isLoading } = useGetSubscriptions();

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      {subscriptions.map((sub) => (
        <SubscribeItem key={sub.id} sub={sub} />
      ))}
    </div>
  );
}
