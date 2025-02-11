import { DialogHeader, Dialog, DialogContent, DialogFooter } from "@/ui/dialog";

import {
  MdDeleteOutline,
  MdOutlineModeEditOutline,
  MdShare,
} from "react-icons/md";

import OneLineText from "@/ui/OneLineText";
import { copyToClipboard } from "@/utils/utli";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/ui/button";
import useDeletePlaylist from "./useDeletePlaylist";
import PlaylistFollowButton from "./PlaylistFollowButton";

function PlaylistActions({ playlist, trigger }) {
  const { deletePlaylist } = useDeletePlaylist();

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [actionsAlertOpen, setActionsAlertOpen] = useState(false);

  const editLink = `/playlists/edit/${playlist.id}`;
  const encodedName = encodeURIComponent(playlist.name);
  const shareLink = `🎶 Playlist: ${playlist.name}\n\n📌 Follow Playlist:\n ${window.location.origin}/playlists/share/${playlist.id}/${encodedName}\n\n🟣 Join Channel t.me/myplaylists_ir`;

  function handleDelete(id) {
    deletePlaylist(id);
    setDeleteAlertOpen(false);
    setActionsAlertOpen(false);
  }

  return (
    <>
      <Dialog open={actionsAlertOpen} onOpenChange={setActionsAlertOpen}>
        <div onClick={() => setActionsAlertOpen(true)}>{trigger}</div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <OneLineText>
                <span className="max-w-64 text-start text-sm font-bold">
                  {playlist.name}
                </span>
              </OneLineText>

              <div className="!mt-6 flex justify-between">
                <div
                  className="flex cursor-pointer flex-col items-center"
                  onClick={() => {
                    copyToClipboard(shareLink);
                    setActionsAlertOpen(false);
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <MdShare size={25} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Share</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <PlaylistFollowButton playlistId={playlist.id} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Follow</span>
                </div>

                <Link to={editLink} className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <MdOutlineModeEditOutline size={25} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Edit</span>
                </Link>

                <div
                  className="flex cursor-pointer flex-col items-center"
                  onClick={() => setDeleteAlertOpen(true)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <MdDeleteOutline size={25} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Delete</span>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="mt-3 md:mt-0"
              variant="outline"
              onClick={() => setDeleteAlertOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleDelete(playlist.id)}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlaylistActions;
