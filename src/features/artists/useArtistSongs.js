import {  getArtistSongs } from "@/services/apiArtist";
import { useQuery } from "@tanstack/react-query";

export function useArtistSongs(artistName) {
  const { data:songs, isLoading, error } = useQuery({
    queryKey: ["artist", ],
    queryFn: () => getArtistSongs(artistName),
  });

  return { songs, isLoading, error };
}
