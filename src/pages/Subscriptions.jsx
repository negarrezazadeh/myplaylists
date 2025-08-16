import SubscriptionsList from "@/features/subscription/SubscriptionsList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import { useParams } from "react-router-dom";

export default function Subscriptions() {
  const { userId } = useParams();
  return (
    <RightMotion>
      <AppHeaderTitle>Subscriptions</AppHeaderTitle>
      <AppContentBox>
        <SubscriptionsList userId={+userId} />
      </AppContentBox>
    </RightMotion>
  );
}
