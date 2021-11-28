import http from "axios";

export type Params = { [key: string]: string };

type Action = {
  action: string;
  item_id: string;
  time: string;
};

export class PocketClient {
  consumerKey: string;
  redirectURI: string;
  constructor(consumerKey: string, redirectURI: string) {
    this.consumerKey = consumerKey;
    this.redirectURI = redirectURI;
  }
  async getRequestToken() {
    const result = await http.request({
      headers: {
        "Content-Type": "application/json",
        "X-Accept": "application/json",
      },
      method: "POST",
      url: "https://getpocket.com/v3/oauth/request",
      data: {
        consumer_key: this.consumerKey,
        redirect_uri: this.redirectURI,
      },
    });
    return result.data.code;
  }
  getAuthorizationURL(requestToken: string) {
    return `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${this.redirectURI}?requestToken=${requestToken}`;
  }
  async getAccessToken(requestToken: string) {
    try {
      const result = await http.request({
        headers: {
          "Content-Type": "application/json",
          "X-Accept": "application/json",
        },
        method: "POST",
        url: "https://getpocket.com/v3/oauth/authorize",
        data: {
          consumer_key: this.consumerKey,
          code: requestToken,
        },
      });
      return result.data.access_token;
    } catch (e) {
      return e;
    }
  }
  async list(accessToken: string, params: Params) {
    const queryString = Object.keys(params).map(
      (key) => `&${key}=${params[key]}`
    );
    const result = await http.request({
      headers: {
        "Content-Type": "application/json",
        "X-Accept": "application/json",
      },
      url: `https://getpocket.com/v3/get?consumer_key=${this.consumerKey}&access_token=${accessToken}${queryString}`,
    });
    return result.data.list;
  }
  async modify(accessToken: string, payload: { actions: Action[] }) {
    const data = {
      consumer_key: this.consumerKey,
      access_token: accessToken,
      actions: payload?.actions,
    };
    const result = await http.request({
      headers: {
        "Content-Type": "application/json",
        "X-Accept": "application/json",
      },
      method: "POST",
      data,
      url: `https://getpocket.com/v3/send`,
    });
    return result.data;
  }
}
