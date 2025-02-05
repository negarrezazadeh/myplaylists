import { useLocalSongs } from "@/features/songs/useLocalSongs";
import { Button } from "@/ui/button";
import SongSkeleton from "@/ui/SongSkeleton";
import SongItemLocal from "./SongItemLocal";

function SongListLocal() {
    const { songs, isPending, pickSongsFolder } = useLocalSongs();

  if (isPending === true)
    return (
      <div className="space-y-4">
        <SongSkeleton count={8} />
      </div>
    );

  if (songs.length === 0)
    return (
      <div>
        <Button onClick={pickSongsFolder}>Chose Your Song Folder</Button>
      </div>
    );

  return (
    <div className="space-y-4" role="list">
      {songs.length > 0 && songs.map((song) => (
        <SongItemLocal key={song.name} song={song} />
      ))}
    </div>
  );
}

export default SongListLocal;
