import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import { FormattedPocketListItem, PocketList } from "../components/List";
import { secondsToDate, StringIndexable } from "../utilities";
import { Tag } from "../components/Tags";
import { API_URL } from "../config";

const tagReducer = (data: PocketList) => (
  tags: StringIndexable<Tag>,
  item: string
) => {
  Object.keys(data[item].tags ?? { untagged: true }).forEach((it) => {
    tags[it] = tags[it] ?? { count: 0 };
    tags[it].count++;
  });
  return tags;
};

const getTags = (data: PocketList): StringIndexable<Tag> => {
  const items = Object.keys(data);
  const tags = items.reduce(tagReducer(data), {} as StringIndexable<Tag>);
  const ids = Object.keys(tags);
  return ids.reduce(
    (acc, el) => ({
      ...acc,
      [el]: {
        ...acc[el],
        checked: true,
      },
    }),
    tags
  );
};

export const formattedItems = (data?: PocketList) => {
  if (!data) return [];
  return Object.keys(data ?? {}).map((id) => {
    const item = data[id];
    return {
      id,
      url: item.resolved_url,
      title: item.resolved_title || item.resolved_url,
      createdAt: secondsToDate(item.time_added).toISOString(),
      excerpt: item.excerpt,
      tags: Object.keys(item.tags ?? { untagged: true }),
    };
  });
};

export const useGetPocketList = (accessToken: string) => {
  const [data, setData] = useState<PocketList>({});
  const { get, loading, error } = useFetch<PocketList>(
    `${API_URL}/api/list?count=10&detailType=complete`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  useEffect(() => {
    // console.log("requesting");
    get().then((d) => {
      // console.log("got", d);
      setData(d);
    });
  }, [get]);

  return {
    loading,
    tags: getTags(data),
    items: formattedItems(data),
    error,
  };
};

export const useMarkItemsRead = (
  accessToken: string,
  items: FormattedPocketListItem[]
) => {
  // const [data, setData] = useState<PocketList>({});
  // const { post, loading, error } = useFetch<{ ids: [] }>(
  //   `${API_URL}/api/update`,
  //   {
  //     body: {
  //       ids: Object.keys(items),
  //     },
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // );
  // return {
  //   markItemsRead: post as () => Promise<unknown>,
  // };
};

// export const usePocketApi = (accessToken: string) => {
//   return {
//     useGetPocketList(accessToken),
//   };
// };
