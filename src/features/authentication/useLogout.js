import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "sonner";

export function useLogout() {

  const { mutate: logout, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutApi,
    onSuccess: async () => {
      window.location.reload() ;
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.response.data.message);
    },
  });

  return { logout, isPending };
}
