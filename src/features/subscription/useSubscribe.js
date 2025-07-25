import { subscribe as subscribeApi } from "@/services/apiSubscribe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  const { mutate: subscribe, isPending } = useMutation({
    mutationKey: ["subscribe-user"],
    mutationFn: (id) => subscribeApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["isSubscribe"] });
    },
    onError: (error) => {
      toast.error("Subscription failed. Please try again later.");
      console.error(error);
    },
  });
  return { subscribe, isPending };
};
