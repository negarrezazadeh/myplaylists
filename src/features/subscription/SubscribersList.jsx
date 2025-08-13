import FullPageSpinner from "@/ui/FullPageSpinner";
import SubscribeItem from "./SubscribeItem";
import useGetSubscribers from "./useGetSubscribers";

export default function SubscribersList({ userId }) {
  const { subscribers, isLoading } = useGetSubscribers(userId);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      {subscribers.map((sub) => (
        <SubscribeItem key={sub.id} sub={sub} />
      ))}
    </div>
  );
}
