import { useQuery } from "@tanstack/react-query";
import { isFollowed as isFollowedApi } from "../../services/apiFollows";
import { useUser } from "../authentication/useUser";

export const useIsFollowed = (playlistId) => {
  const { isAuthenticated } = useUser();
  const { data: isFollowed, isLoading } = useQuery({
    queryKey: ["isFollowedPlaylist", playlistId],
    queryFn: () => isFollowedApi(playlistId),
    enabled: isAuthenticated,
  });

  return { isFollowed, isLoading };
};
