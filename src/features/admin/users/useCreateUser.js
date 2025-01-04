import { adminCreateUser } from "@/services/apiAdminUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateUser = () => {
    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: (data) => adminCreateUser(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/admin/users");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { createUser, isPending };
};
