import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { useUpdateProfile } from "@/features/user/profile/useUpdateProfile";

function EditProfileForm({ user }) {
  const { register, handleSubmit } = useForm({ defaultValues: user || {} });

  const { updateUser, isPending } = useUpdateProfile();
  function onSubmit(data) {
    if (isPending || !user) return;

    updateUser({ id: user.id, data });
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
