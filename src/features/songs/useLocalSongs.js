import { useState } from "react";
import { parseBlob } from "music-metadata";
import noCoverLogo from "@/assets/img/no-cover-logo.png";

export function useLocalSongs() {
  const [songs, setSongs] = useState([]);
  const [isPending, setIsPending] = useState(false);

  function handleFiles(event) {
    const files = Array.from(event.target.files).filter(file =>
      file.name.match(/\.(mp3|wav|ogg)$/i)
    );

    if (files.length === 0) return;

    setIsPending(true);
    processSongs(files);
  }

  async function processSongs(files) {
    const processedSongs = await Promise.all(
      files.map(async file => {
        const url = URL.createObjectURL(file);
        const metadata = await parseBlob(file).catch(() => ({}));

        let coverUrl = noCoverLogo;
        if (metadata.common?.picture?.length) {
          const coverBlob = new Blob([metadata.common.picture[0].data], {
            type: metadata.common.picture[0].format,
          });
          coverUrl = URL.createObjectURL(coverBlob);
        }

        return {
          path: url,
          name: metadata.common?.title || file.name,
          artist: metadata.common?.artist || "Unknown Artist",
          album: metadata.common?.album || "Unknown Album",
          cover: coverUrl,
          duration: metadata.format?.duration || 0,
          file,
        };
      })
    );

    setSongs(processedSongs);
    setIsPending(false);
  }

  return { songs, handleFiles, isPending };
}
