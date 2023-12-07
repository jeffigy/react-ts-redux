import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return [...response.data];
  } catch (error) {
    return (error as Error).message;
  }
});
const initialState = {
  users: [] as User[],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<string | any[]>) => {
        state.users = action.payload as User[];
      }
    );
    builder.addCase(fetchUsers.rejected, (state) => {
      state.users = []; // Reset users array on error
    });
  },
});

export const selectAllusers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId);
export default userSlice.reducer;
