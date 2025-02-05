import AppContentBox from "@/layouts/AppContentBox";
import AppHeader from "@/layouts/AppHeader";
import SongListLocal from "@/features/songs/SongListLocal";

function LocalSongs() {
  return (
    <div
      initial={{ x: "-20%" }}
      animate={{ x: 0 }}
      exit={{ x: "-20%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <AppHeader />
      <AppContentBox>
        <SongListLocal />
      </AppContentBox>
    </div>
  );
}

export default LocalSongs;
