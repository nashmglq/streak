import { useState } from "react";

export const DeleteStreak = () => {
  const [show, isShow] = useState(false);
  const showHandler = () => {
    isShow(true);
  };

  return (
    <div>
      <button onClick={showHandler}>Delete</button>
      {show ? (
        <div>
          <forms>
            <label>Are you sure you want to delete this streak?</label>
            <button> Delete</button>
            <button> Cancel</button>
          </forms>
        </div>
      ) : null}
    </div>
  );
};
