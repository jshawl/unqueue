import React, { useEffect, useState } from "react";
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
      <i
        className={`em em-clock${time}`}
        aria-label="CLOCK FACE ONE OCLOCK"
      ></i>
      <span>{text}</span>
    </div>
  );
};
