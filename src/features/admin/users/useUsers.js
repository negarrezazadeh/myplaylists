import { adminGetUsers } from "@/services/apiAdminUsers";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: adminGetUsers,
  });
  
  return { users, isLoading };
};
