import { TelegramSVG } from "@/ui/Icons";

function TelegramAuthButton() {
  return (
    <div className="flex flex-col items-center gap-y-3 text-center">
      <a
        className="flex items-center justify-center gap-x-2 rounded-xl bg-blue-500 px-4 py-2"
        href="https://t.me/Myplaylists_ir_Bot?start=login"
        color="text-white"
      >
        <TelegramSVG size={40} />
        <strong> Login in with telegram</strong>
      </a>

      <p>OR</p>
    </div>
  );
}

export default TelegramAuthButton;
