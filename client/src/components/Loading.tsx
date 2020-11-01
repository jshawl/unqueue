import React, { useEffect, useState } from "react";
import "./Loading.css";
export const Loading = ({ text }: { text?: string }) => {
  const [time, setTime] = useState(1);
  useEffect(() => {
    const interval = setTimeout(() => {
      setTime(((time + 1) % 12) + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [time]);
  return (
    <div className="Loading">
      <i className="loading" />
      <span>{text}</span>
    </div>
  );
};
