import React, { useState, useEffect } from "react";

import { Button } from "./Button";
import { List } from "./List";
import { Tags, Tag } from "./Tags";
import "./App.css";
import { StringIndexable } from "../utilities";
import { FormattedPocketListItem } from "./List";
import { useAccessToken, useMarkItemsRead } from "../hooks";

interface AppProps {
  items: FormattedPocketListItem[];
  tags: StringIndexable<Tag>;
}

export const App: React.FC<AppProps> = ({ items, tags }) => {
  const [selectedTags, setSelectedTags] = useState(tags);
  const { accessToken } = useAccessToken();
  const { markItemsRead } = useMarkItemsRead(accessToken, items);

  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const filteredItems = items.filter((item) =>
    item.tags.some((tag) => selectedTags[tag]?.checked)
  );

  useEffect(() => {
    setSelectedTags((existing) => ({ ...tags, ...existing }));
  }, [tags]);

  const onMarkRead = (e: React.MouseEvent) => {
    e.preventDefault();
    if (complete) return;
    setLoading(true);
    markItemsRead().then((res) => {
      setLoading(false);
      setComplete(true);
      console.log(res);
    });
  };
  return (
    <div>
      <div className="center">
        <Button
          text={`Mark${complete ? "ed" : ""} ${
            filteredItems.length
          } items read`}
          onClick={onMarkRead}
          loading={loading}
          disabled={complete || filteredItems.length === 0}
        />
        <p>
          Your articles will still be searchable at Pocket's{" "}
          <a href="https://app.getpocket.com/archive">archive url</a>.
        </p>
      </div>
      {complete ? (
        <>all done</>
      ) : (
        <>
          <h2>
            {filteredItems.length ? (
              <>
                <i className="em em-warning" aria-label="WARNING SIGN"></i>
                The following {filteredItems.length} items will be archived:
              </>
            ) : (
              <>
                <i
                  className="em em-sweat_smile"
                  aria-label="SMILING FACE WITH OPEN MOUTH AND COLD SWEAT"
                ></i>{" "}
                No items will be archived.
              </>
            )}
          </h2>
          <Tags tags={selectedTags} onSelect={setSelectedTags} />
          <List items={filteredItems} tags={selectedTags} />
        </>
      )}
    </div>
  );
};
