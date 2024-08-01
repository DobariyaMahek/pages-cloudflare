export const authHeader = () => {
  let sessionObj = getSession();
  if (sessionObj && sessionObj.access_token) {
    return {
      Authorization: "Bearer " + sessionObj.access_token,
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "ngrok-skip-browser-warning": true,
    };
  } else {
    return {
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "ngrok-skip-browser-warning": true,
    };
  }
};

export const chatAuth = () => {
  let sessionObj = getSession();
  return {
    "Content-Security-Policy": "default-src 'self',frame-src 'self'",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "ngrok-skip-browser-warning": true,
    "x-auth-token": sessionObj.access_token,
  };
};

export const authHeaderForm = () => {
  let sessionObj = getSession();
  if (sessionObj && sessionObj.access_token) {
    return {
      Authorization: "Bearer " + sessionObj.access_token,
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "multipart/form-data",
      "X-Frame-Options": "SAMEORIGIN",
      "ngrok-skip-browser-warning": true,
    };
  } else {
    return {
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "multipart/form-data",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "ngrok-skip-browser-warning": true,
    };
  }
};

export const setSession = (sessionObj, rememberMe) => {
  if (sessionObj.userInfo && sessionObj.access_token) {
    localStorage.setItem("authUser", JSON.stringify(sessionObj));
  }
};

export const getSession = () => {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(localStorage?.getItem("authUser"));
  } else {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  localStorage.removeItem("data");
};

export function convertObjectToFormData(object) {
  const formData = new FormData();

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];

      if (value !== null && value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          for (const item of value) {
            formData.append(`${key}[]`, item);
          }
        } else if (typeof value === "object" && value !== null) {
          const nestedFormData = convertObjectToFormData(value);
          for (const [nestedKey, nestedValue] of nestedFormData.entries()) {
            formData.append(`${key}[${nestedKey}]`, nestedValue);
          }
        } else {
          formData.append(key, String(value));
        }
      }
    }
  }
  if (object.hasOwnProperty("image")) {
    if (typeof object["image"] === "object") {
      formData.append("image", object["image"] || "");
    }
  }

  return formData;
}
