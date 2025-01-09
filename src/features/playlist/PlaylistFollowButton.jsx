import { useEffect, useState } from "react";
import { usePlaylistFollowToggle } from "./usePlaylistFollowToggle";
import { useIsFollowing } from "./useIsFollowing";
import { BookmarkOutlineSVG, BookmarkSVG } from "@/ui/Icons";


function PlaylistFollowButton({ playlistId }) {
  const { toggleFollow, isPending } = usePlaylistFollowToggle();
  const { isFollowing, isLoading } = useIsFollowing(playlistId);

  const [follow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(isFollowing);
  }, [isFollowing]);

  function handleToggle() {
    if (isPending || isLoading) return;

    toggleFollow(playlistId, {
      onSuccess: (data) => setIsFollow((prev) => !prev),
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
