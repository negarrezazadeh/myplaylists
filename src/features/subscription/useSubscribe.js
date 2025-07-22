import { subscribe as subscribeApi } from "@/services/apiSubscribe";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSubscribe = () => {
  const { mutate: subscribe, isPending } = useMutation({
    mutationKey: ["subscribe-user"],
    mutationFn: (id) => subscribeApi(id),
    onSuccess: () => {
      toast.success("You have successfully subscribed!");
    },
    onError: (error) => {
      toast.error("Subscription failed. Please try again later.");
      console.error(error);
    },
  });
  return { subscribe, isPending };
};
