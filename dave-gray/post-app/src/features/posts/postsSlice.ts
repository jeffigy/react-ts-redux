import { createSlice } from "@reduxjs/toolkit";

export type PostType = {
  id: string;
  title: string;
  content: string;
};

const initialState: PostType[] = [
  {
    id: "1",
    title: "learning redux toolkit",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "slices...",
    content: "The more I say slice, the more I want pizza",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

//* the selectAllPosts is for if ever the shape of the state changes,
//*  we dont have to change every component, we could change it once in the slice
export const selectAllPosts = (state: { posts: PostType[] }) => state.posts;

export default postsSlice.reducer;
