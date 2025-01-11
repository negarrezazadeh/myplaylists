import { upload } from "@/utils/http";

export const uploadArtistCover = async ({ file, setProgress,artistName }) => {
  const formData = new FormData();
  formData.append("file", file);

  setProgress(0);

  const response = await upload.post(`api/admin/artists/${artistName}/cover`, formData, {
    onUploadProgress: (progressEvent) => {
      const currentProgressPercentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      const percentCompleted = Math.min(currentProgressPercentage, 95);
      setProgress(percentCompleted);
    },
  });

  return response.data;
};