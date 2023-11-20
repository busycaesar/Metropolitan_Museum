import { getToken } from "./authenticate";

// This functoon will add a new favourite item requested by the user.
export const addToFavourites = async (_id) => {
  let res = "";
};

// This function will fetch all the favourite items stored by the user and return them.
export const getFavourites = async () => fetchUserData("GET", "/favourites", true);

const fetchUserData = async (
  reqType,
  route,
  authorization = false,
  body = null
) => {
  let requestHeader = { "content-type": "application/json" };
  if (authorization) requestHeader["Authorization"] = `JWT ${getToken}`;
  let httpConfigurationObject = {
    method: `${reqType}`,
    headers: requestHeader,
  };
  if (body) httpConfigurationObject["body"] = JSON.stringify(body);
  let res = await fetch(
    `${process.env.NEXT_USER_API}/${route}`,
    httpConfigurationObject
  );
  if (res.status === 200) return res.json();
  else return [];
};
