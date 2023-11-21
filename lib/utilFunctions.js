import { getToken } from "./authenticate";

// This function requires the user to pass, request type, route of the userAPI, if there is any authorization to be passed, and the array of body properties if it is to be passed along the request.
export const requestUserDataResponse = async (
  httpReqType,
  route,
  authorization = false,
  bodyProperties = {}
) => {
  // This is a default request header which contains the content type property.
  let requestHeader = { "content-type": "application/json" };

  // If there is any authorization required to be sent along with the request, it is added to the header object.
  if (authorization) requestHeader["Authorization"] = `JWT ${getToken()}`;

  // This is the default http configuration object which contains the fetch method along with the header object.
  let httpConfigurationObject = {
    method: httpReqType,
    headers: requestHeader,
  };

  // If there is a body object to be sent along with the request, it is added to the http configuration object.
  if (Object.keys(bodyProperties).length > 0)
    httpConfigurationObject["body"] = JSON.stringify(bodyProperties);

  // This sents a fetch request along with the route and http configuration object and returns the response.
  return await fetch(
    `${process.env.NEXT_PUBLIC_USER_API}/${route}`,
    httpConfigurationObject
  );
};

// This function uses the passed parameters to fetch the response from the requested route of the url, and retunrs the response in a json format if the response status is success, otherwise returns an empty array.
export const requestUserData = async (
  httpReqType,
  route,
  authorization = false,
  bodyProperties = {}
) => {
  let response = requestUserDataResponse(
    httpReqType,
    route,
    authorization,
    bodyProperties
  );
  if (response.status === 200) return response.json();
  else return [];
};
