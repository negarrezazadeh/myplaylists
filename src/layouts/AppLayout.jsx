import { Outlet } from "react-router-dom";
import AppContainer from "./AppContainer";
import AppFooter from "./AppFooter";
import ApplicationMode from "@/features/settings/ApplicationMode";
import MiniPlayer from "@/features/player/MiniPlayer";

function AppLayout() {
  return (
    <>
      <AppContainer>
        <div className="bg-dark xl:rounded-lg">
          <Outlet />
        </div>
      </AppContainer>

      <ApplicationMode />

      <AppFooter />
      
      <MiniPlayer  />
    </>
  );
}

export default AppLayout;
