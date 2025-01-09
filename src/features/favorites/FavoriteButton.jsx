import { useState } from "react";
import { useToggleFavorite } from "./useToggleFavorite";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";
import { FavoritesOutlineSVG, FavoritesSVG } from "@/ui/Icons";

function FavoriteButton({ song }) {
  const { toggleFavorite, isPending } = useToggleFavorite();
  const isOffline = useNetworkStatus();

  const [isFavorite, setIsFavorite] = useState(song.favorite);

  const handleToggleFavorite = () => {
    if (isOffline) {
      toast.warning("Not available in offline mode");
      return;
    }

    if (isPending) return;

    toggleFavorite(song.id);
    setIsFavorite((prev) => !prev);
  };

  return isFavorite ? (
    <FavoritesSVG
      size={30}
      className="cursor-pointer text-purple-500"
      onClick={handleToggleFavorite}
    />
  ) : (
    <FavoritesOutlineSVG
      size={30}
      className="cursor-pointer text-white"
      onClick={handleToggleFavorite}
    />
  );
}

export default FavoriteButton;
