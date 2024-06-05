import { createSlice } from "@reduxjs/toolkit";

export type postType = {
  id: string;
  title: string;
  content: string;
};

const initialState: postType[] = [
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

export default postsSlice.reducer;
