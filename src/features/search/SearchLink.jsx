import { SearchSVG } from "@/ui/Icons";
import { useNavigate } from "react-router-dom";
function SearchLink() {
  const navigate = useNavigate();

  return (
    <SearchSVG
      size={30}
      className="text-2xl cursor-pointer"
      onClick={() => navigate("/search")}
    />
  );
}

export default SearchLink;
