import React from "react";
import userImg from "./../../assets/img/user.jpg";
import banner from "./../../assets/img/banner-image.jpg";
import Playlists from "../playlist/Playlists";

export default function User() {
  return (
    <div>
      {/* banner section */}
      <div className="relative -top-10 right-0 h-44 w-full md:h-64">
        <img
          src={banner}
          alt="user banner"
          className="h-full w-full rounded-b-2xl object-cover"
        />
        <div className="absolute inset-0 rounded-b-2xl bg-black/50 lg:rounded-br-none" />
      </div>

      {/* user section */}
      <div className="relative left-4 z-10 -mt-[115px] flex items-center gap-x-3 md:left-7 md:-mt-[130px]">
        <img
          src={userImg}
          alt="user"
          className="h-24 w-24 rounded-full ring-2 ring-gray-600 md:h-32 md:w-32"
        />
        <div className="flex flex-col justify-center">
          <h4 className="text-2xl font-bold">Pargon</h4>
          <p className="text-sm text-gray-400">
            Life is too short to wait...🌱
          </p>
        </div>
      </div>
      <div className="mt-8 grid">
        <h4 className="pb-5 text-2xl font-bold">Playlists</h4>
        <Playlists />
      </div>
    </div>
  );
}
