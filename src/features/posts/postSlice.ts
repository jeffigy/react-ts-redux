import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// create type for status
type Status = "idle" | "loading" | "succeeded" | "failed";

export type Post = {
  id: string;
  title: string;
  body: string;
  userId: number;
  date: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
};
const initialState = {
  posts: [] as Post[],
  status: "idle" as Status,
  error: null as string | null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return (error as Error).message;
  }
});

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (initialPost: Post) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      // prepare callback
      prepare(title: string, body: string, userId: number) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
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
      const existingPost = state.posts.find((post: Post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[
          reaction as keyof typeof existingPost.reactions
        ]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[] | string>) => {
        console.log(action.payload);
        state.status = "succeeded";
        //adding date and reactions
        if (Array.isArray(action.payload)) {
          let min = 1;
          const loadedPosts = action.payload.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };

            return post;
          });
          //! this lined duplicates the existing data
          // console.log((state.posts = state.posts.concat(loadedPosts)));

          //* new solution but don't if this will work later on
          const newPosts = loadedPosts.filter((newPost) => {
            return !state.posts.some(
              (existingPost) => existingPost.id === newPost.id
            );
          });

          state.posts = state.posts.concat(newPosts);
        }
      }
    );
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      console.log(action.payload);
      state.posts.push(action.payload);
    });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
