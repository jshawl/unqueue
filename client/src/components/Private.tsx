import React from "react";
import { useGetPocketList } from "../hooks/usePocketApi";
import { Loading } from "./Loading";
import { App } from "./App";

export const Private = ({ accessToken }: { accessToken: string }) => {
  const { loading, items, tags } = useGetPocketList(accessToken);
  const filteredItems = items.filter((item) =>
    item.tags.every((tag) => Object.keys(tags).includes(tag))
  );
  if (loading) return <Loading text="Retrieving Pocket List" />;

  return <App items={filteredItems} tags={tags} />;
};
