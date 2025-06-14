import { uploadBannerCover } from "@/services/apiProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadBannerCover() {
  const queryClient = useQueryClient();

  const {
    mutate: updateBannerCover,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ file, setProgress }) =>
      uploadBannerCover({ file, setProgress }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message);
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.response.data.message);
    },
  });

  return { updateBannerCover, isPending, data };
}
