import { Link } from "react-router-dom";
import myPlaylistsCover from "../../assets/img/no-cover-logo.png";

export default function SubscribeItem({ sub }) {
  return (
    <Link to={`/profile/${sub.id}`} className="flex w-full items-center gap-x-3 border-b border-black py-4">
      <img
        src={sub.avatar ? sub.avatar : myPlaylistsCover}
        alt="user-avatar"
        className="h-16 w-16 rounded-full"
      />
      <div className="flex w-full flex-col gap-y-1 overflow-hidden">
        <p className="text-lg">{sub.name}</p>
        <p className="w-full max-w-full truncate text-sm text-gray-300">
          {sub.bio}
        </p>
      </div>
    </Link>
  );
}
