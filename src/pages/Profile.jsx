import { useAuth } from "@/context/AuthContext";
import UserProfile from "@/features/profile/Profile";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import { SettingSVG } from "@/ui/Icons";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Profile() {
  const { userId: userIdParam } = useParams();
  const { user, isLoading } = useAuth();

  const userId = userIdParam || user.id;

  const editPageLink =
    !isLoading && user.id === +userId ? (
      <Link to={`/edit-profile`}>
        <SettingSVG size={30} />
      </Link>
    ) : null;

  return (
    <RightMotion>
      <AppHeaderTitle endEl={editPageLink}>Profile</AppHeaderTitle>
      <AppContentBox>
        <UserProfile userId={userId} />
      </AppContentBox>
    </RightMotion>
  );
}
