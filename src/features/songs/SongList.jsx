import { Link } from "react-router-dom";
import SongItem from "./SongItem";
import { useSongs } from "./useSongs";
import { Button } from "@/ui/button";
import SongSkeleton from "@/ui/SongSkeleton";
import { usePlayerController } from "@/context/PlayerControllerContext";
import React from "react";
import { Virtuoso } from "react-virtuoso";
import AccessBot from "./AccessBot";

function SongList() {
  const { songs, isPending } = useSongs();
  const { play, stop } = usePlayerController();

  if (isPending)
    return (
      <div className="space-y-4">
        <SongSkeleton count={8} />
      </div>
    );

  if (songs?.length === 0)
    return (
      <>
        <div className="mt-2">
          <p>You can use our telegram bot to upload your song</p>
          <AccessBot />
        </div>
        <div className="mt-7">
          <p>You didn't add any song, try uploading one</p>
          <Button className="mt-2" asChild>
            <Link to={"/songs/upload"}>Upload song</Link>
          </Button>
        </div>
      </>
    );

  return (
    <Virtuoso
      data={songs}
      itemContent={(_, song) => (
        <SongItem className="mb-4" song={song} play={play} stop={stop} />
      )}
    />
  );
}

export default SongList;
