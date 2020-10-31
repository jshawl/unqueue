import React from "react";
import ReactDOM from "react-dom";
import { Public } from "./components/Public";
import { Private } from "./components/Private";
import { useAccessToken } from "./hooks/";

const Application = () => {
  const { accessToken } = useAccessToken();
  if (!accessToken) {
    return <Public />;
  }
  return <Private accessToken={accessToken} />;
};

ReactDOM.render(
  <React.StrictMode>
    <header>
      <h1>
        <a href="/">Unqueue</a>
      </h1>
      <h2>mark all Pocket items read</h2>
    </header>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);
