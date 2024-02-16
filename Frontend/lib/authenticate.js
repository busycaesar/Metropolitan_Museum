import { jwtDecode } from "jwt-decode";
import { requestUserDataResponse } from "./utilFunctions";

// This function authenticates the user using the passed credentials and call the setToken by passing the token received upon the successfull user authentication.
export const authenticateUser = async (userName, password) => {
  try {
    const res = await requestUserDataResponse("POST", "login", false, {
        userName: userName,
        password: password,
      }),
      data = await res.json();
    if (res?.status === 200) {
      setToken(data?.token);
      return true;
    } else throw new Error(data.message);
  } catch (error) {
    throw new Error(`${error}.`);
  }
};

// This function checks if the user is authenticated or not.
export const isAuthenticated = () => (readToken() ? true : false);

export const registerUser = async (userName, password, password2) => {
  try {
    const res = await requestUserDataResponse("POST", "register", false, {
      userName: userName,
      password: password,
      password2: password2,
    });
    console.log(await res);
    //data = await res.json();
    // if (res.status === 200) return true;
    // else throw new Error(data?.message);
  } catch (error) {
    throw new Error(`This is the error ${error}.`);
  }
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
    const decodedToken = jwtDecode(getToken());
    return decodedToken ? decodedToken : null;
  } catch (err) {
    return null;
  }
};

// This function removes the token from the localStorage.
export const removeToken = () => localStorage.removeItem("access_token");
