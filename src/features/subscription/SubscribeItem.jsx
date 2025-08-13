import { Link } from "react-router-dom";
import myPlaylistsCover from "../../assets/img/no-cover-logo.png";
import Subscribe from "./Subscribe";
import { useAuth } from "@/context/AuthContext";

export default function SubscribeItem({ sub }) {
  const { user } = useAuth();

  return (
    <div className="flex w-full items-center gap-x-3 border-b border-black py-4 last:border-b-0">
      <Link to={`/profile/${sub.id}`} className="flex w-full gap-x-3">
        <img
          src={sub.avatar ? sub.avatar : myPlaylistsCover}
          alt="user-avatar"
          className="h-16 w-16 rounded-full"
        />
        <div className="flex w-52 flex-col gap-y-1 overflow-hidden xl:w-[800px]">
          <p className="mt-1 text-lg font-semibold">{sub.name}</p>
          <p className="w-full truncate text-sm text-gray-300">{sub.bio}</p>
        </div>
      </Link>
      <Subscribe userId={sub.id} userIdParam={user.id} />
    </div>
  );
}
