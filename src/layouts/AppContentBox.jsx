import { useLocation } from "react-router-dom";

function AppContentBox({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/" ;
  return (
    <div className={`h-[calc(100vh-200px)] ${!isHome ? "overflow-auto pb-20 lg:pb-5" : ""} px-5 pt-5 relative`}>
      {children}
    </div>
  );
}

export default AppContentBox;
