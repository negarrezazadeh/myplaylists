import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import { Button } from "@/ui/button";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <RightMotion>
      <AppHeaderTitle>Dashboard</AppHeaderTitle>
      <AppContentBox>
        <Button asChild>
          <Link to="/admin/users">Users</Link>
        </Button>
      </AppContentBox>
    </RightMotion>
  );
}

export default Dashboard;
