import { useState } from "react";
import { usePlaylistFollowToggle } from "./usePlaylistFollowToggle";
import { BookmarkOutlineSVG, BookmarkSVG } from "@/ui/Icons";

function PlaylistFollowButton({ playlistId, isFollowed = false }) {
  const { toggleFollow, isPending } = usePlaylistFollowToggle();

  const [follow, setFollow] = useState(isFollowed);

  function handleToggle() {
    if (isPending) return;

    toggleFollow(playlistId, {
      onSuccess: (data) => setFollow((prev) => !prev),
    });
  }

  return (
    <div className="flex justify-end">
      {!follow && (
        <BookmarkOutlineSVG
          size={30}
          className="cursor-pointer"
          onClick={handleToggle}
        />
      )}
      {follow && (
        <BookmarkSVG
          size={30}
          className="cursor-pointer"
          onClick={handleToggle}
        />
      )}
    </div>
  );
}

export default PlaylistFollowButton;
