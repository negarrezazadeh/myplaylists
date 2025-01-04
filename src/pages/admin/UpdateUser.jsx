import CreateUserForm from "@/features/admin/users/CreateUserForm";
import { useUser } from "@/features/admin/users/useUser";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useParams } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();

  const { user, isLoading } = useUser(id);

  return (
    <RightMotion>
      <AppHeaderTitle>Update User</AppHeaderTitle>
      <AppContentBox>
        {isLoading && <FullPageSpinner />}
        {!isLoading && <CreateUserForm user={user} />}
      </AppContentBox>
    </RightMotion>
  );
}

export default UpdateUser;
