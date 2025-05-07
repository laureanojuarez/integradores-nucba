import { useState } from "react";

export const Cart = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col pl-10">
      <p>{count}</p>
      <div>
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  );
};
