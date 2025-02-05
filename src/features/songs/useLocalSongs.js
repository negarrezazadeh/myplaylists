import { useState } from "react";

import { parseBlob } from "music-metadata";

import noCoverLogo from "@/assets/img/no-cover-logo.png";

export function useLocalSongs() {
  const [songs, setSongs] = useState([]);
  const [isPending, setIsPending] = useState(null);

  async function pickSongsFolder() {
    try {
      setIsPending(true);

      const dirHandle = await window.showDirectoryPicker();
      const songsFromFiles = await getSongs(dirHandle);
      console.log(songsFromFiles);
      
      setSongs(songsFromFiles);
    } catch (error) {
      console.error("Error accessing files:", error);
    } finally {
      setIsPending(false);
    }
  }

  async function getSongs(dirHandle) {
    const files = [];

    for await (const entry of dirHandle.values()) {
      if (entry.kind === "file" && entry.name.match(/\.(mp3|wav|ogg)$/i)) {
        const file = await entry.getFile();
        const url = URL.createObjectURL(file);

        const metadata = await parseBlob(file);

        let coverUrl = noCoverLogo;
        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const coverBlob = new Blob([metadata.common.picture[0].data], {
            type: metadata.common.picture[0].format,
          });
          coverUrl = URL.createObjectURL(coverBlob);
        }

        files.push({
          path: url,
          name: metadata.common.title || entry.name,
          artist: metadata.common.artist,
          album: metadata.common.album,
          cover: coverUrl,
          duration: metadata.format.duration,
          file,
        });
      }
    }

    return files;
  }

  return { songs, pickSongsFolder, isPending };
}
