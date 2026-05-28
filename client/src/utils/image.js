import { API_ORIGIN } from "./api";

export const getImageUrl = (imgUrl) => {
  if (!imgUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(imgUrl)) {
    return imgUrl;
  }

  return `${API_ORIGIN}/${imgUrl}`;
};
