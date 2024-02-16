/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { FavouriteAtom, SearchHistoryAtom } from "../../store";
import { useEffect, useState } from "react";
import { getFavourites, getSearchHistory } from "../../lib/userData";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../lib/authenticate";

const PUBLIC_PATHS = ["/login", "/register", "/", "/_error"];

export default function RouteGuard(props) {
  const router = useRouter(),
    [favouriteList, setFavouriteList] = useAtom(FavouriteAtom),
    [searchHistory, setSearchHistory] = useAtom(SearchHistoryAtom),
    updateAtoms = async () => {
      setFavouriteList(await getFavourites());
      setSearchHistory(await getSearchHistory());
    },
    [authorized, setAuthorized] = useState(false),
    authCheck = (url) => {
      const path = url.split("?")[0];
      if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push("/login");
      } else setAuthorized(true);
    };
  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);
  return <>{authorized && props.children}</>;
}
