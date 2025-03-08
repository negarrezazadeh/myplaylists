import { useMutation } from '@tanstack/react-query';
import { otp as otpApi } from '../../services/apiAuth';
import { toast } from 'sonner';

export function useOTP() {
  const { mutate: otp, isPending } = useMutation({
    mutationFn: (email) => otpApi(email),
    onSuccess: (data) => {        
      if(data.success){
        toast.success(data.message)
      }else{
        toast.warning(data.message)
      }
    },
    onError: (err) => {
      console.error('ERROR', err);
      toast.error(err.response.data.message);
    },
  });

  return { otp, isPending };
}
