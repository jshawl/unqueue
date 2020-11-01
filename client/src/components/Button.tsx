import React from "react";
import "./Button.css";
import { Loading } from "./Loading";

interface ButtonProps extends Partial<Omit<HTMLButtonElement, "disabled">> {
  loading?: boolean;
  alternate?: boolean;
  text: string;
  href?: string;
  emoji?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  text,
  alternate,
  onClick = () => undefined,
  href,
  emoji,
  disabled,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
    } else {
      if (href) {
        window.location.assign(href);
      } else {
        onClick(e);
      }
    }
  };
  return (
    <button
      // href={href}
      className={`btn ${alternate && "alternate"}`}
      onClick={handleClick}
      data-disabled={disabled}
    >
      {/* {disabled && (
        <i
          className="em em-white_check_mark"
          aria-label="WHITE HEAVY CHECK MARK"
          style={{ opacity: 0.75 }}
        ></i>
      )} */}
      {loading ? <Loading text={text} /> : <>{text}</>}
      {/* {emoji && (
        <i className={`em em-${emoji}`} aria-label={`${emoji} emoji`}></i>
      )} */}
    </button>
  );
};
