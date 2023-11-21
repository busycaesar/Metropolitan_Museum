import jwt_decode from "jwt-decode";
import { requestUserDataResponse } from "./utilFunctions";

// This function authenticates the user using the passed credentials and call the setToken by passing the token received upon the successfull user authentication.
export const authenticateUser = async (userName, password) => {
  try {
    const res = await requestUserDataResponse("POST", "login", false, {
        userName: userName,
        password: password,
      }),
      data = await res.json();
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else throw new Error(data.message);
  } catch (error) {
    throw new Error(`${error}.`);
  }
};

// This function checks if the user is authenticated or not.
export const isAuthenticated = () => (readToken() ? true : false);

export const registerUser = async (userName, password, password2) => {
  return (
    requestUserDataResponse("POST", "register", false, [
      userName,
      password,
      password2,
    ]).status === 200
  );
};

// This function makes a post request to a passed route of the userAPI along with a bunch of body properties and returns the response.
const postRequestUserAPI = async (route, ...bodyProperties) => {
  let requestBody = {};
  bodyProperties.forEach((bodyProperty) => {
    requestBody[bodyProperty] = bodyProperty;
  });
  return await fetch(`${process.env.NEXT_USER_API}/${route}`, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "content-type": "application/json",
    },
  });
};

// This functions sets the passed token into the localStorage.
const setToken = (token) => localStorage.setItem("access_token", token);

// This function get the token from the localStorage.
export const getToken = () => {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
};

// This function decodes the received token from the localStorage.
export const readToken = () => {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    return null;
  }
};

// This function removes the token from the localStorage.
export const removeToken = () => localStorage.removeItem("access_token");
