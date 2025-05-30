import { Input } from "@/ui/input";
import { useNavigate } from "react-router-dom";
import SearchList from "./SearchList";
import { useSearch } from "./useSearch";
import { useEffect, useRef, useState } from "react";
import { CircleLeftSVG } from "@/ui/Icons";

function SearchContent() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const { songs, isLoading } = useSearch(keyword);

  const debounce = useRef(null);
  const searchInput = useRef(null);

  function handleSearch(e) {
    const keywordValue = e.target.value.trim();

    if (!keywordValue) setKeyword("");

    if (debounce.current) clearTimeout(debounce.current);

    // set a new timeout to update the keyword after the debounce delay
    if (keywordValue.length <= 2) return;

    debounce.current = setTimeout(() => {
      setKeyword(keywordValue);
    }, 500);
  }

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  if (isLoading)
    return (
      <div className="fixed right-0 top-0 z-50 mx-auto flex h-full w-full max-w-[450px] flex-col gap-y-4 overflow-hidden rounded-lg bg-dark px-3 pb-3 pt-7 xl:right-3 xl:top-3 xl:h-[calc(100%-112px)] xl:max-w-[calc(100%-264px)]">
        <div className="flex gap-x-4">
          <CircleLeftSVG onClick={() => navigate(-1)} color="white" size={30} />

          <Input
            ref={searchInput}
            defaultValue={keyword}
            onChange={handleSearch}
            type="search"
            placeholder="Search"
          />
        </div>
        <div>Loading...</div>
      </div>
    );

  return (
    <div className="fixed right-0 top-0 z-50 mx-auto flex h-full w-full max-w-[450px] flex-col gap-y-4 overflow-hidden rounded-lg bg-dark px-3 pb-3 pt-7 xl:right-3 xl:top-3 xl:h-[calc(100%-112px)] xl:max-w-[calc(100%-264px)]">
      <div className="flex gap-x-4">
        <CircleLeftSVG
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          color="white"
          size={30}
        />

        <Input
          ref={searchInput}
          onChange={handleSearch}
          type="search"
          placeholder="Search"
        />
      </div>
      {songs && (
        <>
          <div className="mb-3 flex flex-col gap-y-3">
            <h6 className="text-lg font-bold">Your songs:</h6>
            <SearchList songs={songs?.user_songs} />
          </div>

          <div className="flex flex-col gap-y-3">
            <h6 className="text-lg font-bold">Global:</h6>
            <SearchList songs={songs?.global_songs} />
          </div>
        </>
      )}
    </div>
  );
}

export default SearchContent;
