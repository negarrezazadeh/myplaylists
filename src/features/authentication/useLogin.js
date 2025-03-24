import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'sonner';

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async (user) => {
      await queryClient.invalidateQueries(['user']);
    },
    onError: (err) => {
      console.error('ERROR', err);
      toast.error(err.response.data.message);
    },
  });

  return { login, isPending };
}
