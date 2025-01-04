import { adminDeleteUser } from "@/services/apiAdminUsers";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const { deleteUser, isPending } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id) => adminDeleteUser(id),
  });

  return { deleteUser, isPending };
};
