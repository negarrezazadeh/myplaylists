import { useSubscribe } from "./useSubscribe";

export default function Subscribe({ userId }) {
  const { subscribe, isPending } = useSubscribe();

  const subscribeHandler = () => {
    if (!isPending) subscribe(userId);
  };

  return (
    <div className="absolute right-2 top-0 lg:right-5">
      <button
        onClick={subscribeHandler}
        disabled={isPending}
        className="rounded-3xl border border-gray-400 px-3 py-1 text-xs text-gray-200 lg:text-sm"
      >
        Subscribe
      </button>
    </div>
  );
}
