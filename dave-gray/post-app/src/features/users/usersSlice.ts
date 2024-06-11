import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export type UsersType = {
  id: number;
  name: string;
};

const initialState: UsersType[] = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await axios.get(USERS_URL);
    return res.data as UsersType[];
  } catch (error) {
    return (error as Error).message;
  }
});

const isUsersArray = (payload: any): payload is UsersType[] => {
  return (
    Array.isArray(payload) &&
    payload.every(
      (item) => typeof item === "object" && "id" in item && "name" in item,
    )
  );
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<string | UsersType[]>) => {
        if (isUsersArray(action.payload)) {
          return action.payload;
        } else {
          console.error("Failed to load users:", action.payload);
          return state; // maintain previous state on error
        }
      },
    );
  },
});

export const selectAllUsers = (state: { users: UsersType[] }) => state.users;

export default usersSlice.reducer;
