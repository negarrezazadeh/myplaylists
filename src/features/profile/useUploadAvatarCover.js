import { uploadAvatarCover } from "@/services/apiProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadAvatarCover() {
  const queryClient = useQueryClient();

  const {
    mutate: updateAvatarCover,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ file, setProgress }) =>
      uploadAvatarCover({ file, setProgress }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message);
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.response.data.message);
    },
  });

  return { updateAvatarCover, isPending, data };
}
