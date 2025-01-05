import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import loading from '@/assets/loading.lottie';

function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-32 h-44">
        <DotLottieReact src={loading} loop autoplay />
      </div>
    </div>
  );
}

export default FullPageSpinner;
