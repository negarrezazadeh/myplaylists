import { useQuery } from "@tanstack/react-query";
import { followedPlaylists as followedPlaylistsApi } from "../../services/apiFollows";

export const useFollowed = () => {
  const { data: followedPlaylists, isLoading, error } = useQuery({
    queryKey: ["followedPlaylists"],
    queryFn: () => followedPlaylistsApi(),
  });

  return { followedPlaylists, isLoading, error };
};
