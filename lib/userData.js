import { getToken } from "./authenticate";
import { requestUserData } from "./utilFunctions";

// This functoon will add a new favourite item requested by the user.
export const addToFavourites = async (_id) => {
  let res = "";
};

// This function will fetch all the favourite items stored by the user and return them.
export const getFavourites = async () =>
  requestUserData("GET", "favourites", true);
