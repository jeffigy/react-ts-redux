import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";
export type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
};
const initialState: Array<Post> = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    userId: "0",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    userId: "0",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      // prepare callback
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: string }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post: Post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[
          reaction as keyof typeof existingPost.reactions
        ]++;
      }
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
