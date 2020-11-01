const response = jest.fn();

jest.mock("axios", () => ({ request: () => Promise.resolve(response()) }));

const { PocketClient } = require("./pocket");

describe("PocketClient", () => {
  const pocket = new PocketClient("consumer-key", "redirect-uri");
  it("constructs", async () => {
    expect(pocket.consumerKey).toBe("consumer-key");
  });
  it("gets request tokens", async () => {
    response.mockImplementationOnce(() => ({
      data: {
        code: "123",
      },
    }));
    const token = await pocket.getRequestToken();
    expect(token).toBe("123");
  });
  it("gets the authorization URL", () => {
    expect(pocket.getAuthorizationURL("abc")).toMatch(/request_token=abc/);
  });
  it("gets access tokens", async () => {
    response.mockImplementationOnce(() => ({
      data: {
        access_token: "123-abc",
      },
    }));
    expect(await pocket.getAccessToken("")).toBe("123-abc");
  });
});
