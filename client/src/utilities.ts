export const secondsToDate = (string: string) =>
  new Date(Number(string) * 1000);

export const queryString = () => window.location.search;

export const removeQueryString = () => (window.location.search = "");

export type StringIndexable<T> = { [key: string]: T };
