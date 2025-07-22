import FullPageSpinner from "@/ui/FullPageSpinner";
import useGetUserProfile from "./useGetUserProfile";
import { useAuth } from "@/context/AuthContext";
import Subscribe from "../subscription/Subscribe";
import useGetSubscribers from "../subscription/useGetSubscribers";
import useGetSubscriptions from "../subscription/useGetSubscriptions";

export default function ProfileInfo({ userId }) {
  const { isLoading, profile } = useGetUserProfile(userId);
  const { user } = useAuth();

  const { subscribers = [], isLoading: isLoadingGetSubscribers } =
    useGetSubscribers();
  const { subscriptions = [], isLoading: isLoadingGetSubscriptions } =
    useGetSubscriptions();

  if (isLoading && isLoadingGetSubscribers && isLoadingGetSubscriptions)
    return <FullPageSpinner />;

  return (
    <div className="relative p-5">
      {user.id !== userId && <Subscribe userId={userId} />}
      <div className="mb-3 flex w-full flex-col gap-y-1">
        <h4 className="text-2xl font-bold capitalize">{profile.name}</h4>
        <p className="line-clamp-3 break-words text-sm font-semibold text-gray-300 lg:w-full">
          {!profile.bio ? "" : profile.bio}
        </p>
      </div>
      {user.id === userId && (
        <div className="flex items-center gap-x-5">
          <p className="text-sm text-purple-500">
            {subscriptions.length} following
          </p>
          <span className="text-gray-300">|</span>
          <p className="text-sm text-purple-500">
            {subscribers.length} followers
          </p>
        </div>
      )}
    </div>
  );
}
