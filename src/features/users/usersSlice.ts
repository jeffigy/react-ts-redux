import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface User {
  id: string;
  name: string;
}

const initialState: Array<User> = [
  { id: "0", name: "Tiago" },
  { id: "1", name: "João" },
  { id: "2", name: "Maria" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selecdtAllusers = (state: RootState) => state.users;
export default userSlice.reducer;
