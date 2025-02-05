import { useLocalSongs } from "@/features/songs/useLocalSongs";
import { Button } from "@/ui/button";
import SongSkeleton from "@/ui/SongSkeleton";
import SongItemLocal from "./SongItemLocal";

function SongListLocal() {
  const { songs, handleFiles, isPending } = useLocalSongs();

  if (isPending === true)
    return (
      <div className="space-y-4">
        <SongSkeleton count={8} />
      </div>
    );

  if (songs.length === 0)
    return (
      <div>
        <p className="mb-3">This feature depends on the current browser and the device you are using. If it doesn't work as expected, try other ways.</p>
        <Button asChild>
          <label className="relative">
            <input
              className="opacity-0 absolute h-full w-full top-0 right-0"
              type="file"
              multiple
              webkitdirectory="true"
              onChange={handleFiles}
            />
            Chose Your Song Folder
          </label>
        </Button>
      </div>
    );

  return (
    <div className="space-y-4" role="list">
      {songs.length > 0 &&
        songs.map((song) => <SongItemLocal key={song.name} song={song} />)}
    </div>
  );
}

export default SongListLocal;
