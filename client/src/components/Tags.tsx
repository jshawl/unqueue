import React from "react";
import "./Tags.css";
import { StringIndexable } from "../utilities";

export type Tag = { count: number; checked: boolean };

interface TagProps {
  tags: StringIndexable<Tag>;
  onSelect: (tags: StringIndexable<Tag>) => void;
}

export const tagColor = (tag: string, tags: StringIndexable<Tag>) => {
  const colors = ["#8FD5FC", "#FBCFD6", "#BCE7E5", "#FFEDD0"];
  const ids = Object.keys(tags);
  return colors[ids.findIndex((id) => id === tag)];
};

export const Tags: React.FC<TagProps> = ({ tags, onSelect }) => {
  const check = (tag: string, checked: boolean) => {
    onSelect({ ...tags, [tag]: { ...tags[tag], checked } });
  };
  const tagIds = Object.keys(tags);

  return (
    <div className="Tags">
      {[...tagIds].map((tag) => (
        <div className="tag-input" key={tag}>
          <input
            type="checkbox"
            name={tag}
            id={tag}
            onChange={(e) => check(e.target.name, e.target.checked)}
            checked={tags[tag]?.checked ?? true}
          />

          <label htmlFor={tag} style={{ borderColor: tagColor(tag, tags) }}>
            <span>{tag}</span> <strong>{tags[tag].count}</strong>
          </label>
        </div>
      ))}
    </div>
  );
};
