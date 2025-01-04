import { useState } from "react";
import UploadInput from "../../ui/UploadInput";

import { useUploadSong } from "./useUploadSong";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function UploadSongForm() {
  const [progress, setProgress] = useState(0);
  const { upload, isPending, data } = useUploadSong();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  if (user?.canUpload === false) {
    return (
      <div className="flex flex-col gap-y-4">
        <h6 className="text-lg font-bold">
          Sorry You don't have access to uploader 🫠.
        </h6>
        <p className="text-lg">
          For uploading your songs you need to upgrade your account.
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
      <div className="flex h-full flex-col items-center justify-center gap-y-5">
        <UploadInput
          label={
            isPending
              ? "Uploading..."
              : isPending === false
                ? "Uploaded"
                : "Upload Song"
          }
          progress={progress}
          onSelectFile={handleSelectFile}
          disabled={isPending}
        />
        {progress === 100 && (
          <>
            <Button onClick={() => navigate(`/songs/edit/${data?.song.id}`)}>
              Edit song info
            </Button>
            <Button onClick={() => setProgress(0)}>Upload new one</Button>
          </>
        )}
      </div>
    </>
  );
}

export default UploadSongForm;
