import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  // Action type prefix
  name: "counter",
  // initial state
  initialState,
  // reducers
  reducers: {
    // Reducer functions (which will generate action creators)
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// Action creators generated from reducers
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

// full reducer
export default counterSlice.reducer;
