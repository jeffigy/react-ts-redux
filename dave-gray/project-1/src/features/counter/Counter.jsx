import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const [amount, setAmount] = useState(0);
  // useSelector is used to access the Redux state.
  // It extracts the `count` value from the `counter` slice of the Redux state.
  const count = useSelector((state) => state.counter.count);

  // useDispatch is used to get the dispatch function from the Redux store.
  // This function allows you to dispatch actions.
  const dispatch = useDispatch();

  const addValue = Number(amount) || 0;

  const resetAll = () => {
    setAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        {/* Dispatch the increment action when the button is clicked */}
        <button onClick={() => dispatch(increment())}>+</button>
        {/* Dispatch the decrement action when the button is clicked */}
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Add Amount
        </button>

        <button onClick={resetAll}>Reset All</button>
      </div>
    </section>
  );
};

export default Counter;
