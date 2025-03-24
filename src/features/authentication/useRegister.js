import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register as registerApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({ email, password, name, code }) => registerApi({ email, password, name, code }),
    onSuccess: (user) => {
      queryClient.invalidateQueries(['user']);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.error('ERROR', err);
      toast.error(err.response.data.message);
    },
  });

  return { register, isPending };
}
