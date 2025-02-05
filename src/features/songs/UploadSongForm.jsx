import { useState } from "react";
import UploadInput from "../../ui/UploadInput";

import { useUploadSong } from "./useUploadSong";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import SongListLocal from "./SongListLocal";

function UploadSongForm() {
  const navigate = useNavigate();

  const { upload, isPending, data } = useUploadSong();
  const { canUploadDownload } = useAuth();

  const [progress, setProgress] = useState(0);
  const [tab, setTab] = useState("file");

  async function handleSelectFile(e) {
    const files = e.target.files;
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];
        upload(
          { file, setProgress },
          {
            onError: (err) => {
              setProgress(0);
            },
            onSuccess: (data) => {
              setProgress(100);
            },
          },
        );
      }
    }
  }

  if (canUploadDownload === false && false) {
    return (
      <div className="flex flex-col gap-y-4">
        <h6 className="text-lg font-bold">
          Sorry You don't have access to upload or download songs 🫠.
        </h6>
        <p className="text-lg">
          For uploading and downloading songs you need to upgrade your account.
        </p>
        <p className="text-lg">
          But don't worry 🤗 for upgrading your account and get full access
          contact &nbsp;
          <a
            className="text-blue-500 underline"
            href="https://t.me/p_nightwolf"
          >
            t.me/p_nightwolf
          </a>
        </p>
        <p className="text-lg">
          💥 Still you can follow other users &nbsp;
          <Link className="text-blue-500 underline" to="/top-playlists">
            playlists
          </Link>
          &nbsp;, listen to &nbsp;
          <Link className="text-blue-500 underline" to="/top-songs">
            top songs
          </Link>
          &nbsp; and add to your favorites
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-x-4">
        <span
          onClick={() => setTab("file")}
          className={`cursor-pointer ${tab === "file" ? "text-xl font-bold text-purple-500" : "text-sm"}`}
        >
          File
        </span>
        <span
          onClick={() => setTab("storage")}
          className={`cursor-pointer ${tab === "storage" ? "text-lg font-bold text-purple-500" : "text-sm"}`}
        >
          Storage
        </span>
      </div>
      {tab === "storage" && (
        <div className="pt-6 ">
          <SongListLocal />
        </div>
      )}
      {tab === "file" && (
        <div className="flex flex-col items-center justify-center gap-y-5 pt-20">
          <UploadInput
            label={
              isPending
                ? "Uploading..."
                : isPending === false && progress === 100
                  ? "Uploaded"
                  : "Upload Song"
            }
            progress={progress}
            onSelectFile={handleSelectFile}
            disabled={isPending}
          />
          {progress === 100 && (
            <div className="flex gap-x-3">
              <Button onClick={() => navigate(`/songs/edit/${data?.song.id}`)}>
                Edit song info
              </Button>
              <Button onClick={() => setProgress(0)}>Upload new one</Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UploadSongForm;
