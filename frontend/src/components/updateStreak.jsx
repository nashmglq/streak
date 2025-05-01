import { useState } from "react";

export const UpdateStreak = () => {
  const [show, isShow] = useState(false);
  const showHandler = () => {
    isShow(true);
  };
  return (
    <div>
      <button onClick={showHandler}>Update</button>
      {show ? (
        <div>
          <forms>
            <label>Name</label>
            <input></input>
            <label>Goal</label>
            <input></input>
          </forms>
        </div>
      ) : null}
    </div>
  );
};
