import React from "react";
import "./Button.css";
import { Loading } from "./Loading";

interface ButtonProps {
  loading?: boolean;
  text: string;
  href?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  text,
  onClick,
  href,
  disabled,
}) => {
  return (
    <a href={href} className="btn" onClick={onClick} data-disabled={disabled}>
      {disabled && (
        <i
          className="em em-white_check_mark"
          aria-label="WHITE HEAVY CHECK MARK"
          style={{ opacity: 0.75 }}
        ></i>
      )}
      {loading ? <Loading text={text} /> : <>{text}</>}
    </a>
  );
};
