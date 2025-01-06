import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import { usePlaylists } from "./usePlaylists";
import useAddSongToPlaylist from "./useAddSongToPlaylist";
import useAddSongsToPlaylist from "./useAddSongsToPlaylists";
import { Skeleton } from "@/ui/skeleton";

function AddSongToPlaylist({ song, songs, trigger }) {
  const { playlists, isLoading } = usePlaylists();

  const { addSongToPlaylist, isPending } = useAddSongToPlaylist();

  // for bulk of songs
  const { addSongsToPlaylist } = useAddSongsToPlaylist();

  function handleAddSong(playlistId) {
    if (song)
      addSongToPlaylist({
        playlistId,
        songId: song.id,
      });

      if(songs){
        addSongsToPlaylist({
          playlistId,
          songsIds: songs,
        })
      }
  }

  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add To Playlist</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-6"></Skeleton>
          ))
        ) : (
          <ul className="max-h-96 overflow-y-scroll">
            {playlists.map((playlist) => (
              <li
                disabled={isPending}
                className="py-2"
                onClick={() => handleAddSong(playlist.id)}
                key={playlist.id}
              >
                {playlist.name}
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddSongToPlaylist;
