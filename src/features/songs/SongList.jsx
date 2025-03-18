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

  /*   return (
   <Virtuoso
    data={songs}
    itemContent={(_, song) => <SongItem song={song} play={play} stop={stop} />}
    components={{
      List: React.forwardRef(({ style, children }, ref) => (
        <div ref={ref} className="space-y-4 !h-[calc(100vh-200px)]" role="list">
          {children}
        </div>
      )),
      Scroller: React.forwardRef(({ style, children }, ref) => (
        <div
          ref={ref}
          style={{ ...style, outline: "none", overflowY: "unset", position: "relative" }}
          data-testid="virtuoso-scroller"
          data-virtuoso-scroller="true"
          tabIndex={0}
        >
          {children}
        </div>
      )) 
    }}
  />
  ); */

  return (
    <Virtuoso
      data={songs}
      itemContent={(_, song) => (
        <SongItem className="mb-4" song={song} play={play} stop={stop} />
      )}
    />

    /*   return (
    <div className="space-y-4" role="list">
      {songs?.map((song) => (
        <SongItem key={song.id} song={song} play={play} stop={stop} />
      ))}
    </div>
  ) */
  );
}

export default SongList;
