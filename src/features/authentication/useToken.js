import { getToken as apiGetToken } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useToken() {
  const { mutate: getToken, isPending } = useMutation({
    mutationKey: ["token"],
    mutationFn: apiGetToken,
    onError: (err) => {
      toast.error(err.response.data.message);
    },
    onSuccess: (data) => {
       toast.success("Your access token generated successfully");
    }
  });

  return { getToken, isPending };
}
