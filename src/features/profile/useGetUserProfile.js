import { getUserProfile } from "@/services/apiProfile";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserProfile(id) {
  const { data: profile, isLoading } = useQuery({
    queryKey: [`profile-${id}`],
    queryFn: () => getUserProfile(id),
  });

  return { profile, isLoading };
}
