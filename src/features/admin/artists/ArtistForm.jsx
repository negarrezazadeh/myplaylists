import UploadInput from "@/ui/UploadInput";
import { useState } from "react";
import { useUploadArtistCover } from "./useUploadArtistCover";


function ArtistForm({artistName}) {
  const [progress, setProgress] = useState(0);
  const { upload, isPending } = useUploadArtistCover();

  async function handleSelectFile(e) {
    const files = e.target.files;
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];
        upload(
          { file, setProgress, artistName },
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
  return (
    <div className="w-max mx-auto">
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
    </div>
  );
}

export default ArtistForm;
