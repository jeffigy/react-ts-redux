import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

export type PostType = {
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

const initialState: PostType[] = [
  {
    id: "1",
    title: "learning redux toolkit",
    content: "I've heard good things.",
    userId: "2",
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
    title: "slices...",
    content: "The more I say slice, the more I want pizza",
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
      action: PayloadAction<{
        postId: string;
        reaction: keyof PostType["reactions"];
      }>,
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post: PostType) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

// the selectAllPosts is for if ever the shape of the state changes,
//  we dont have to change every component, we could change it once in the slice
export const selectAllPosts = (state: { posts: PostType[] }) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
