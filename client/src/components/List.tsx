import React from "react";
import "./List.css";
import { StringIndexable } from "../utilities";
import { Tag, tagColor } from "./Tags";

export type PocketList = { [key: string]: PocketListItem };

type PocketListItem = {
  tags: { [key: string]: unknown };
  resolved_url: string;
  resolved_title: string;
  time_added: string;
  excerpt: string;
};

export type FormattedPocketListItem = {
  id: string;
  url: string;
  title: string;
  createdAt: string;
  excerpt: string;
  tags: string[];
};

type ListProps = {
  items: FormattedPocketListItem[];
  tags: StringIndexable<Tag>;
};

export const List: React.FC<ListProps> = ({ items, tags }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <strong>
            <a
              href={item.url}
              className="title-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
              <i className="em em-link" aria-label="LINK SYMBOL"></i>
            </a>
          </strong>
          <time>added on {item.createdAt}</time>
          {item.excerpt && <p>{item.excerpt}</p>}
          {item.tags.map((tag) => (
            <span
              className="tag"
              key={tag}
              style={{ background: tagColor(tag, tags) }}
            >
              {tag}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
};
