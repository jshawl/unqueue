import React, { useState, useEffect } from "react";

import { Button } from "./Button";
import { List } from "./List";
import { Tags, Tag } from "./Tags";
import "./App.css";
import { StringIndexable } from "../utilities";
import { FormattedPocketListItem } from "./List";

interface AppProps {
  items: FormattedPocketListItem[];
  tags: StringIndexable<Tag>;
}

export const App: React.FC<AppProps> = ({ items, tags }) => {
  const [selectedTags, setSelectedTags] = useState(tags);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const filteredItems = items.filter((item) =>
    item.tags.some((tag) => selectedTags[tag]?.checked)
  );

  useEffect(() => {
    setSelectedTags((existing) => ({ ...tags, ...existing }));
  }, [tags]);

  const onMarkRead = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisabled(true);
    }, 1000);
  };
  return (
    <div>
      <div className="center">
        <Button
          text={`Mark${disabled ? "ed" : ""} ${
            filteredItems.length
          } items read`}
          onClick={onMarkRead}
          loading={loading}
          disabled={disabled || filteredItems.length === 0}
        />
        <p>
          Your articles will still be searchable at Pocket's{" "}
          <a href="https://app.getpocket.com/archive">archive url</a>.
        </p>
      </div>
      {disabled ? (
        <></>
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
