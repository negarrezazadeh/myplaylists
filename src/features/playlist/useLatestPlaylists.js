import {  getLatestPlaylists } from "@/services/apiPlaylists";
import { useQuery } from "@tanstack/react-query";

export const useLatestPlaylists = () => {
  const { data: latestPlaylists, isLoading } = useQuery({
    queryKey: ["latest-playlists"],
    queryFn: getLatestPlaylists,
  });
  return { latestPlaylists, isLoading };
};
