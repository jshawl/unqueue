import React from "react";
import useFetch from "use-http";
import { API_URL } from "../config";
import { Button } from "./Button";

export interface PublicProps {
  loading?: boolean;
}

export const Public: React.FC<PublicProps> = ({ loading }) => {
  const { data } = useFetch(API_URL + "/auth", []);
  return (
    <div>
      <div style={{ transform: "scale(0)", height: 0 }}>
        {/* preload images */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
          <i
            className={`em em-clock${time}`}
            aria-label="CLOCK FACE ONE OCLOCK"
          />
        ))}
      </div>
      <Button text={`Log in with Pocket`} href={data?.url} />
      <h2>
        <i
          className="em em-incoming_envelope"
          aria-label="INCOMING ENVELOPE"
        ></i>
        Apply Inbox Zero to your pocket queue
      </h2>
      <p>In a single click, you can archive all your unread items.</p>
      <h2>
        <i className="em em-see_no_evil" aria-label="SEE-NO-EVIL MONKEY"></i>
        Stop feeling bad for not reading every article
      </h2>
      <p>Seriously, who's got time to read all those articles?</p>
      <h2>
        <i className="em em-sparkles" aria-label="HUNDRED POINTS SYMBOL"></i>
        Start with a clean slate
      </h2>
      <p>
        Your articles will still be searchable at Pocket's{" "}
        <a href="https://getpocket.com/saves/archive">archive url</a>.
      </p>
    </div>
  );
};
