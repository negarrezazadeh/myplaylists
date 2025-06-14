import React from "react";
import useGetUserProfile from "./useGetUserProfile";
import FullPageSpinner from "@/ui/FullPageSpinner";
import PlaylistItem from "../playlist/PlaylistItem";

export default function ProfileInfo({ userId }) {
  const { isLoading, profile } = useGetUserProfile(userId);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      {/* banner section */}
      <div className="relative -top-10 right-0 h-44 w-full md:h-64">
        <img
          src={profile.banner}
          alt="user banner"
          className="h-full w-full rounded-b-2xl object-cover"
        />
        <div className="absolute inset-0 rounded-b-2xl bg-black/50 lg:rounded-br-none" />
      </div>

      {/* user section */}
      <div className="relative left-5 -mt-[115px] flex w-full items-center gap-x-3 md:-mt-[130px]">
        <img
          src={profile.avatar}
          alt="user"
          className="h-24 w-24 rounded-full ring-2 ring-gray-600 md:h-32 md:w-32"
        />
        <div className="mb-7 flex flex-col">
          <h4 className="text-2xl font-bold capitalize">{profile.name}</h4>
          <p className="text-sm text-gray-400">{profile.bio}</p>
        </div>
      </div>
      <div className="mt-8 grid">
        <h4 className="pb-5 text-2xl font-bold">Playlists</h4>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {profile.latest_playlists.map((playlist) => (
            <PlaylistItem key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
