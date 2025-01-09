import { CircleLeftSVG, UploadSVG } from "@/ui/Icons";
import { Input } from "@/ui/input";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  return (
    <header className="mb-5 flex items-center gap-x-4 px-5 pt-5 h-[70px]">
      {isHomePage ? (
        <NavLink to="/songs/upload">
          <UploadSVG size={40} color="white"  />
        </NavLink>
      ) : (
        <NavLink onClick={() => navigate(-1)}>
          <CircleLeftSVG color="white" size={30} />
        </NavLink>
      )}

      <Input
        onClick={() => navigate("/search")}
        readOnly
        type="text"
        placeholder="Search"
      />
    </header>
  );
}

export default AppHeader;
