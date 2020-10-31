import fetch, { FetchMock } from "jest-fetch-mock";
// const fetch = window.fetch as FetchMock;
global.fetch = fetch;
fetch.enableMocks();

import React, { useState } from "react";
//@ts-ignore
import { render, wait, fireEvent } from "@testing-library/react";
import { useGetPocketList, useMarkItemsRead } from "./usePocketApi";

const HookInspector: React.FC = () => {
  const { items } = useGetPocketList("abc");
  const { markItemsRead } = useMarkItemsRead("abc", [{ id: "1" }, { id: "2" }]);
  const [isMarked, setIsMarked] = useState<any>();
  return (
    <div>
      <div data-testid="items-count">{items.length}</div>
      <button
        data-testid="button"
        onClick={() => markItemsRead().then((d) => setIsMarked(d))}
      ></button>
      <div data-testid="mark-items-response">{JSON.stringify(isMarked)}</div>
    </div>
  );
};

describe("usePocketApi", () => {
  const items = {
    tag123: {
      id: "123",
      time_added: "100000000",
    },
    tag124: {
      id: "123",
      time_added: "100000000",
    },
  };
  it("gets a pocket list", async () => {
    fetch.mockResponseOnce(JSON.stringify(items));
    const { getByTestId } = render(<HookInspector />);
    await wait(() => {
      expect(getByTestId("items-count").innerHTML).toBe("2");
    });
  });
  it("marks items read", async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 1 }));
    const { getByTestId } = render(<HookInspector />);
    const button = getByTestId("button");
    fireEvent.click(button);
    await wait(() => {
      expect(getByTestId("mark-items-response").innerHTML).toBe(
        JSON.stringify({ status: 1 })
      );
    });
  });
});
