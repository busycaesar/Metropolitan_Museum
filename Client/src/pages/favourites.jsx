import React from "react";
import { FavouriteAtom } from "../../store";
import { useAtom } from "jotai";
import DisplayArtworks from "@/components/DisplayArtworks";

export default function Favourites() {
  const [favouriteList, setFavouriteList] = useAtom(FavouriteAtom);
  if (!favouriteList) return null;
  return (
    <>
      <h1>Favourite List:</h1>
      <DisplayArtworks artworkList={[favouriteList]} />
    </>
  );
}
