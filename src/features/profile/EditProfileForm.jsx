import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { useUpdateProfile } from "@/features/profile/useUpdateProfile";
import { useState } from "react";
import UploadInput from "@/ui/UploadInput";
import { useUploadAvatarCover } from "./useUploadAvatarCover";
import { useUploadBannerCover } from "./useUploadBannerCover";

function EditProfileForm({ user }) {
  const [avatarCoverProgress, setAvatarCoverProgress] = useState(0);
  const [bannerCoverProgress, setBannerCoverProgress] = useState(0);

  const { isPending: isPendingAvatarCover, updateAvatarCover } =
    useUploadAvatarCover();
  const { isPending: isPendingBannerCover, updateBannerCover } =
    useUploadBannerCover();

  const { register, handleSubmit } = useForm({ defaultValues: user || {} });

  const { updateUser, isPending } = useUpdateProfile();
  function onSubmit(data) {
    if (isPending || !user) return;

    updateUser({ id: user.id, data });
  }

  async function handleSelectFile(e, uploadMethod, setProgress) {
    const files = e.target.files;
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];
        uploadMethod(
          { file, setProgress },
          {
            onError: () => setProgress(0),
            onSuccess: () => setProgress(100),
          },
        );
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
      <Input
        autoComplete="off"
        placeholder="name"
        disabled
        {...register("email", { disabled: true })}
      />
      <Input
        autoComplete="off"
        placeholder="name"
        {...register("name", { required: true })}
      />
      <Input
        autoComplete="off"
        placeholder="nickname"
        {...register("nickname")}
      />
      <Input autoComplete="off" placeholder="bio" {...register("bio")} />

      <div className="flex gap-5">
        <UploadInput
          label={isPendingAvatarCover ? "Uploading..." : "Avatar Cover"}
          progress={avatarCoverProgress}
          onSelectFile={(e) =>
            handleSelectFile(e, updateAvatarCover, setAvatarCoverProgress)
          }
          disabled={isPendingAvatarCover}
        />

        <UploadInput
          label={isPendingBannerCover ? "Uploading..." : "Banner Cover"}
          progress={bannerCoverProgress}
          onSelectFile={(e) =>
            handleSelectFile(e, updateBannerCover, setBannerCoverProgress)
          }
          disabled={isPendingBannerCover}
        />
      </div>

      <div>
        <p className="mb-2 ps-1 text-xs text-dark-50">
          Update to sync your email with your telegram
        </p>
        <div className="flex items-center justify-center">
          <span className="rounded-l-lg bg-dark-900 px-2 py-1">@</span>
          <Input
            autoComplete="off"
            className="rounded-l-none"
            placeholder="telegram username"
            {...register("telegram_username")}
          />
        </div>
      </div>

      <Button disabled={isPending}>Save</Button>
    </form>
  );
}

export default EditProfileForm;
