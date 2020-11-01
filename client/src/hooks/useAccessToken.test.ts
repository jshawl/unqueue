jest.mock("../utilities", () => ({
  queryString: jest.fn(),
  removeQueryString: jest.fn(),
}));
import { queryString, removeQueryString } from "../utilities";

import { useAccessToken, LOCAL_STORAGE_KEY } from "./useAccessToken";
const ACCESS_TOKEN = "abc-123";

describe("useAccessToken", () => {
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });
  it("gets an accessToken from a query string", () => {
    queryString.mockImplementation(() => `?accessToken=${ACCESS_TOKEN}`);
    const { accessToken } = useAccessToken();
    expect(accessToken).toBe("abc-123");
  });
  it("removes the access token from the url and puts it in local storage", () => {
    queryString.mockImplementation(() => `?accessToken=${ACCESS_TOKEN}`);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull();
    const { accessToken } = useAccessToken();
    expect(accessToken).toBe(ACCESS_TOKEN);
    expect(removeQueryString).toHaveBeenCalled();
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(ACCESS_TOKEN);
  });
  it("does not overwrite localStorage with an empty query string", () => {
    queryString.mockImplementation(() => `?accessToken=${ACCESS_TOKEN}`);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull();
    let { accessToken } = useAccessToken();
    expect(accessToken).toBe(ACCESS_TOKEN);
    queryString.mockImplementation(() => "");
    let { accessToken: at } = useAccessToken();
    expect(at).toBe(ACCESS_TOKEN);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(ACCESS_TOKEN);
  });
  it("can update local storage (log out)", () => {
    queryString.mockImplementation(() => `?accessToken=${ACCESS_TOKEN}`);
    let { accessToken, setAccessToken } = useAccessToken();
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(ACCESS_TOKEN);
    setAccessToken("");
    queryString.mockImplementation(() => "");
    let { accessToken: at } = useAccessToken();
    expect(at).toBe("");
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).not.toBe(ACCESS_TOKEN);
  });
});
