import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type initialStateType = {
  count: number;
};

const initialState: initialStateType = {
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
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

// Action creators generated from reducers
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

// full reducer
export default counterSlice.reducer;
