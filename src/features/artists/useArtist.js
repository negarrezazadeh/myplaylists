import { getArtists } from "@/services/apiArtist";
import { useQuery } from "@tanstack/react-query";

export function useArtist() {
  const { data:artists, isLoading, error } = useQuery({
    queryKey: ["artists"],
    queryFn: () => getArtists(),
  });

  return { artists, isLoading, error };
}
