/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { FavouriteAtom, SearchHistoryAtom } from "../../store";
import { updateAtoms } from "../../lib/utilFunctions";
import { useEffect } from "react";

const PUBLIC_PATHS = ["/login", "register", "/", "/_error"];

export default function RouteGuard(props) {
  const [favouriteList, setFavouriteList] = useAtom(FavouriteAtom),
    [searchHistory, setSearchHistory] = useAtom(SearchHistoryAtom);
  useEffect(() => {
    updateAtoms(setFavouriteList, setSearchHistory);
  }, []);
  return <>{props.children}</>;
}
