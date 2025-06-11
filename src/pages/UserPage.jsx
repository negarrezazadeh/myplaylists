import User from "@/features/user/User";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import React from "react";

export default function UserPage() {
  return (
    <RightMotion>
      <AppHeaderTitle>koft</AppHeaderTitle>
      <AppContentBox>
        <User />
      </AppContentBox>
    </RightMotion>
  );
}
