import { getLatestSongs } from "@/services/apiSongs";
import { useQuery } from "@tanstack/react-query";

export function useLatestSongs() {
  const { data: latestSongs, isPending } = useQuery({
    queryKey: ["latest-songs"],
    queryFn: getLatestSongs,
  });

  return { latestSongs, isPending };
}
