import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register as registerApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: ({ email, password, name }) => registerApi({ email, password, name }),
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
