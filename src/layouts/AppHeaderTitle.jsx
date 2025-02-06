import { CircleLeftSVG } from "@/ui/Icons";
import { NavLink, useNavigate } from "react-router-dom";

function AppHeaderTitle({ children, navLink = -1, endEl }) {
  const navigate = useNavigate();

  return (
    <header className="mb-5 grid h-[70px] grid-cols-12 items-center gap-x-4 bg-dark-900 xl:bg-dark xl:rounded-t-lg px-5 pb-5 pt-5">
      <NavLink className="col-span-2" onClick={() => navigate(navLink)}>
        <CircleLeftSVG color="white" size={30} />
      </NavLink>

      <h6 className="col-span-8 mx-auto text-lg font-bold"> {children}</h6>
      <div className="col-span-2 text-end">{endEl} </div>
    </header>
  );
}

export default AppHeaderTitle;
