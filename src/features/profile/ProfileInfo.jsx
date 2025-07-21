import FullPageSpinner from "@/ui/FullPageSpinner";
import useGetUserProfile from "./useGetUserProfile";
import Subscribe from "../subscription/Subscribe";

export default function ProfileInfo({ userId }) {
  const { isLoading, profile } = useGetUserProfile(userId);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="relative p-5">
      <Subscribe />
      <div className="mb-3 flex w-full flex-col gap-y-1">
        <h4 className="text-2xl font-bold capitalize">{profile.name}</h4>
        <p className="line-clamp-2 break-words text-sm font-semibold text-gray-300 lg:w-full">
          {!profile.bio ? "" : profile.bio}
        </p>
      </div>
      <div className="flex items-center gap-x-5">
        <p className="text-sm text-purple-500">123 following</p>
        <span className="text-gray-300">|</span>
        <p className="text-sm text-purple-500">12 followers</p>
      </div>
    </div>
  );
}
