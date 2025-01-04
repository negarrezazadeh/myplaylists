import CreateUserForm from "@/features/admin/users/CreateUserForm";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

function CreateUser() {
  return (
    <RightMotion>
      <AppHeaderTitle>Create User</AppHeaderTitle>
      <AppContentBox>
        <CreateUserForm />
      </AppContentBox>
    </RightMotion>
  );
}

export default CreateUser;
