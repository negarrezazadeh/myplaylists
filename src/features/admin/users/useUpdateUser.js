import { adminUpdateUser } from "@/services/apiAdminUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: ({ id, data }) => adminUpdateUser({ userId: id, data }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users", `user-${data.user.id}`] });
      navigate("/admin/users");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { updateUser, isPending };
};
