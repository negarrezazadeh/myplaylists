import { updateProfile as updateProfileApi } from "@/services/apiProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: ({ id, data }) => updateProfileApi({ userId: id, data }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["user"]);
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { updateUser, isPending };
};
