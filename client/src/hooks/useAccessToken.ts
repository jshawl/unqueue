import { queryString, removeQueryString } from "../utilities";

export const LOCAL_STORAGE_KEY = "unqueue-accessToken";

const setAccessToken = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, accessToken);
};

export const useAccessToken = () => {
  const qs = queryString();
  const accessToken =
    qs.match(/accessToken=([^&]+)/)?.[1] ??
    localStorage.getItem(LOCAL_STORAGE_KEY) ??
    "";
  if (accessToken && qs.length) {
    setAccessToken(accessToken);
    removeQueryString();
  }

  return { accessToken, setAccessToken };
};
