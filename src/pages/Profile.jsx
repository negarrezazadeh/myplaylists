import { useAuth } from "@/context/AuthContext";
import Logout from "@/features/authentication/Logout";
import EditProfileForm from "@/features/user/profile/EditProfileForm";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

function Profile() {
  const { user } = useAuth();
  return (
    <RightMotion>
      <AppHeaderTitle endEl={<Logout icoSize="30" text="" />}>
        Profile
      </AppHeaderTitle>
      <AppContentBox>
        <EditProfileForm user={user} />
      </AppContentBox>
    </RightMotion>
  );
}

export default Profile;
