import UsersList from "@/features/admin/users/UsersList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import { CirclePlusSVG } from "@/ui/Icons";
import { Link } from "react-router-dom";

function Users() {
  return (
    <RightMotion>
      <AppHeaderTitle
        endEl={
          <Link to="create">
            <CirclePlusSVG size={30} />
          </Link>
        }
      >
        Users
      </AppHeaderTitle>
      <AppContentBox>
        <UsersList />
      </AppContentBox>
    </RightMotion>
  );
}

export default Users;
