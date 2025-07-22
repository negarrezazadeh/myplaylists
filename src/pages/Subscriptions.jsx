import SubscriptionsList from "@/features/subscription/SubscriptionsList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

export default function Subscriptions() {
  return (
    <RightMotion>
      <AppHeaderTitle>Subscribers</AppHeaderTitle>
      <AppContentBox>
        <SubscriptionsList />
      </AppContentBox>
    </RightMotion>
  );
}
