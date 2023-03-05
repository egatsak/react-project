import React, { FC, useState } from "react";
import classes from "./Counter.module.scss";

export const Counter: FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className={classes.btn}>Counter</div>
      <h1>{count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        Increment
      </button>
    </>
  );
};
