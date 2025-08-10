import { useMutation } from "@tanstack/react-query";
import { sendSong as sendSongApi } from "@/services/apiSongs";
import { toast } from "sonner";
export function useSendSong() {
  const { mutate: sendSong, isPending } = useMutation({
    mutationFn: (data) => sendSongApi(data),
    mutationKey: ["send-song"],
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { sendSong, isPending };
}
