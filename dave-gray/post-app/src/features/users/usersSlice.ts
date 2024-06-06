import { createSlice } from "@reduxjs/toolkit";
export type UsersType = {
  id: string;
  name: string;
};

const initialState: UsersType[] = [
  { id: "0", name: "Ernest Steele" },
  { id: "1", name: "Annie Schneider" },
  { id: "2", name: "Stephen Becker" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state: { users: UsersType[] }) => state.users;

export default usersSlice.reducer;
