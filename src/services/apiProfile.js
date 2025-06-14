import http from "@/utils/http";
import { upload } from "@/utils/http";

export const updateProfile = async ({ data }) => {
  const response = await http.put(`/api/profile`, data);
  return response.data;
};

export const getUserProfile = async (id) => {
  const response = await http.get(`/api/profile/${id}`);
  return response.data;
};

export const uploadAvatarCover = async ({ file, setProgress }) => {
  const formData = new FormData();
  formData.append("file", file);

  setProgress(0);

  const response = await upload.post(`api/profile/image`, formData, {
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

export const uploadBannerCover = async ({ file, setProgress }) => {
  const formData = new FormData();
  formData.append("file", file);

  setProgress(0);

  const response = await upload.post(`api/profile/banner`, formData, {
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
