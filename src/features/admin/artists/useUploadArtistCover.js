import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadArtistCover } from "@/services/apiAdminArtist";

export function useUploadArtistCover() {
  const queryClient = useQueryClient();

  const { mutate: upload, isPending, data } = useMutation({
    mutationFn: ({ file, setProgress, artistName }) => uploadArtistCover({ file, setProgress, artistName }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      toast.success(data.message);
    },

    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.response.data.message);
    },

  });

  return { upload, isPending, data };
}
