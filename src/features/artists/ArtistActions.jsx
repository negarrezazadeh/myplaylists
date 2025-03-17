import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/ui/dialog";
import { ShareSVG } from "@/ui/Icons";
import { copyToClipboard } from "@/utils/utli";
import { useState } from "react";

function ArtistActions({ artistName, trigger }) {
  const [actionsAlertOpen, setActionsAlertOpen] = useState(false);
  const shareLink = `🗣 Artist:\n${artistName}\n\n🎶 Songs:\n${window.location.href}\n\n🟣 Join Channel:\n t.me/myplaylists_ir`;

  return (
    <Dialog open={actionsAlertOpen} onOpenChange={setActionsAlertOpen}>
      <div onClick={() => setActionsAlertOpen(true)}>{trigger}</div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Artist</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center">
          <div className="!mt-6 flex justify-between">
            <div
              className="flex cursor-pointer flex-col items-center"
              onClick={() => {
                copyToClipboard(shareLink);
                setActionsAlertOpen(false);
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                <ShareSVG size={25} />
              </div>
              <span className="mt-2 text-xs font-bold">Share</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ArtistActions;
