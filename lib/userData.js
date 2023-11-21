import { requestUserData } from "./utilFunctions";

// This functoon will add a new favourite item requested by the user.
export const addToFavourites = async (itemId) =>
  requestUserData("PUT", `favourites/${itemId}`, true);

// This function will remove the item from the favourites requested by the user.
export const removeFromFavourites = async (itemId) =>
  requestUserData("DELETE", `favourites/${itemId}`, true);

// This function will fetch all the favourite items stored by the user.
export const getFavourites = async () =>
  requestUserData("GET", "favourites", true);

// This function will add the item to the histroy as requested by the user.
export const addToSearchHistory = async (itemId) =>
  requestUserData("PUT", `historyistory/${itemId}`, true);

// This function will remove the requested item from the SearchHistory.
export const removeFromSearchHistory = async (itemId) =>
  requestUserData("DELETE", `history/${itemId}`, true);

// This function will fetch the histroy of the user.
export const getSearchHistory = async () =>
  requestUserData("GET", "history", true);
