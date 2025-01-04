import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { useCreateUser } from "./useCreateUser";
import { Button } from "@/ui/button";
import { useUpdateUser } from "./useUpdateUser";

function CreateUserForm({ user }) {
  const { register, handleSubmit } = useForm({ defaultValues: user || {} });
  const { createUser, isPending } = useCreateUser();
  const { updateUser, isPending: isPendingUpdate } = useUpdateUser();
  function onSubmit(data) {
    if (isPending || isPendingUpdate) return;

    if (user) {
      updateUser({ id: user.id, data });
    } else {
      createUser(data);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
      <Input placeholder="name" {...register("name", { required: true })} />
      <Input placeholder="email" {...register("email", { required: true })} />
      {!user && (
        <Input
          placeholder="password"
          {...register("password", { required: true, minLength: 8 })}
        />
      )}
      <Input placeholder="role" {...register("role")} />
      <Input
        placeholder="telegram username"
        {...register("telegram_username")}
      />

      <Button disabled={isPending || isPendingUpdate}>
        {user ? "Update" : "Create"}
      </Button>
    </form>
  );
}

export default CreateUserForm;
