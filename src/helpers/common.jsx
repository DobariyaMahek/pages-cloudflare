export function convertObjectToFormData(object) {
  const formData = new FormData();
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value !== null && value !== undefined && value !== "") {
        if (Array?.isArray(value)) {
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
export const getSession = () => {
  if (typeof localStorage !== "undefined") {
    return JSON?.parse(localStorage?.getItem("authUser"));
  } else {
    return null;
  }
};
export function isEmpty(value) {
  return (
    value == null ||
    value == undefined ||
    value == 0 ||
    (typeof value === "string" && !value?.trim()) ||
    (Array?.isArray(value) && !value?.length)
  );
}

export function capitalizeWords(text) {
  return text?.split(/[\s-]+/) // Split by spaces or hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); // Join with spaces
}
