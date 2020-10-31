type StringIndexable = { [key: string]: { API_URL: string } };
const config: StringIndexable = {
  development: {
    API_URL: "http://localhost:3000",
  },
  test: {
    API_URL: "http://localhost:3000",
  },
  production: {
    API_URL: "https://unqueue.herokuapp.com",
  },
};

const { NODE_ENV } = process.env;

if (typeof NODE_ENV === "undefined") throw new Error();

export const { API_URL } = config[NODE_ENV];
