import React from "react";
import { Button } from "./Button";

export const Complete = () => {
  return (
    <div>
      <h2>
        <i
          className="em em-partying_face"
          aria-label="FACE WITH PARTY HORN AND PARTY HAT"
        ></i>
        You did it!
      </h2>
      <p>
        Peace of mind is finally here. <strong>Doesn't it feel great?</strong>{" "}
        You deserved it.
      </p>
      <h2>
        <i
          className="em em-man-tipping-hand"
          aria-label="tipping hand emoji"
        ></i>
        How about a tip?
      </h2>
      <p>
        It costs me about $7 USD per month to keep this project running, but the
        biggest investment for me is my time. I care about providing something
        useful for everyone, and leaving a tip encourages me to continue doing
        this kind of work.
      </p>
      <p>
        If you can't leave a tip or can but don't want to, that is totally ok;
        consider it my treat :)
      </p>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="9NPACKUM9FBMC" />
        <img
          alt=""
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
        <Button text="Leave a tip" type="submit" emoji="pray" />
      </form>
    </div>
  );
};
