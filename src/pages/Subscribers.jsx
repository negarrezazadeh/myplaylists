import SubscribersList from "@/features/subscription/SubscribersList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";
import { useParams } from "react-router-dom";

export default function Subscribers() {
  const { userId } = useParams();
  return (
    <RightMotion>
      <AppHeaderTitle>Subscribers</AppHeaderTitle>
      <AppContentBox>
        <SubscribersList userId={+userId} />
      </AppContentBox>
    </RightMotion>
  );
}
