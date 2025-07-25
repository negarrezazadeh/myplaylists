import { useAuth } from "@/context/AuthContext";
import { AvatarSVG, CircleLeftSVG, UploadSVG } from "@/ui/Icons";
import { Input } from "@/ui/input";
import { MdOutlineShield } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { isAdmin } = useAuth();

  return (
    <header className="mb-5 flex h-[70px] items-center gap-x-4 px-5 pt-5">
      {isHomePage ? (
        <NavLink to="/songs/upload">
          <UploadSVG size={40} color="white" />
        </NavLink>
      ) : (
        <NavLink onClick={() => navigate(-1)}>
          <CircleLeftSVG color="white" size={30} />
        </NavLink>
      )}

      {isAdmin && (
        <NavLink
          to="/admin/dashboard"
          className="flex flex-col items-center py-3"
        >
          <MdOutlineShield size={35} />
        </NavLink>
      )}

      <NavLink to="/profile">{<AvatarSVG size={35} />}</NavLink>

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
