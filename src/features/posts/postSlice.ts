import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface Post {
  id: string;
  title: string;
  content: string;
}
const initialState: Array<Post> = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<Post>) {
      state.push(action.payload);
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { postAdded } = postSlice.actions;
export default postSlice.reducer;
