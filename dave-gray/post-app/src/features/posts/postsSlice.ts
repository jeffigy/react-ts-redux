import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

export type PostType = {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
};

const initialState: PostType[] = [
  {
    id: "1",
    title: "learning redux toolkit",
    content: "I've heard good things.",
    userId: "2",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: "2",
    title: "slices...",
    content: "The more I say slice, the more I want pizza",
    userId: "0",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.push(action.payload);
      },
      // The `prepare` is callback function that allows
      // pre-processing of the action's payload.
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            // nanoid generates random Id
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
          },
        };
      },
    },
  },
});

// the selectAllPosts is for if ever the shape of the state changes,
//  we dont have to change every component, we could change it once in the slice
export const selectAllPosts = (state: { posts: PostType[] }) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
