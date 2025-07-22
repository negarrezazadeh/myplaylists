import FullPageSpinner from "@/ui/FullPageSpinner";
import useGetSubscribers from "./useGetSubscribers";
import SubscribeItem from "./SubscribeItem";

export default function SubscribersList() {
  const { subscribers, isLoading } = useGetSubscribers();

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      {subscribers.map((sub) => (
        <SubscribeItem key={sub.id} sub={sub} />
      ))}
    </div>
  );
}
