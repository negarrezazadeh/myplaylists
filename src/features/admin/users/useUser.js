import { adminGetUser } from "@/services/apiAdminUsers";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id) => {
  const { data: user, isLoading } = useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => adminGetUser(id),
  });

  return { user, isLoading };
};
