import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrement, increment, incrementByAmount, reset } from "./counterSlice";

const Counter = () => {
  const [amount, setAmount] = useState<number>(0);
  // useSelector is used to access the Redux state.
  // It extracts the `count` value from the `counter` slice of the Redux state.
  const count = useAppSelector((state) => state.counter.count);

  // useDispatch is used to get the dispatch function from the Redux store.
  // This function allows you to dispatch actions.
  const dispatch = useAppDispatch();

  const resetAll = () => {
    setAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>

      <div>
        {" "}
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          Add Amount
        </button>
        <button onClick={resetAll}>Reset All</button>
      </div>
    </section>
  );
};

export default Counter;
