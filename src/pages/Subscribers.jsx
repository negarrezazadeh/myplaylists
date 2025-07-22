import SubscribersList from "@/features/subscription/SubscribersList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

export default function Subscribers() {
  return (
    <RightMotion>
      <AppHeaderTitle>Subscribers</AppHeaderTitle>
      <AppContentBox>
        <SubscribersList />
      </AppContentBox>
    </RightMotion>
  );
}
