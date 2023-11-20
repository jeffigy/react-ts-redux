import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface postState {
  id: number;
  title: string;
  content: string;
}
const initialState: postState[] = [
  { id: 1, title: "First Post!", content: "Hello!" },
  { id: 2, title: "Second Post", content: "More text" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const selectAllPosts = (state: RootState) => state.posts;
export default postSlice.reducer;
