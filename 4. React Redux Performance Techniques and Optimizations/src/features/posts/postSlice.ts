import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { RootState } from "../../app/store";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// create type for status
export type Status = "idle" | "loading" | "succeeded" | "failed";

export type Post = {
  id: number;
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
  count: 0,
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

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: {
    id: number;
    title: string;
    body: string;
    userId: number;
    reactions: unknown;
  }) => {
    const { id } = initialPost;
    try {
      const res = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return res.data;
    } catch (error) {
      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (initialPost: { id: number }) => {
    const { id } = initialPost;
    try {
      const res = await axios.delete(`${POSTS_URL}/${id}`);
      if (res.status === 200) return initialPost;
      return `${res.status}: ${res.statusText}`;
    } catch (error) {
      return (error as Error).message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(
      state,
      action: PayloadAction<{ postId: number; reaction: string }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post: Post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[
          reaction as keyof typeof existingPost.reactions
        ]++;
      }
    },
    increaseCount(state) {
      state.count = state.count + 1;
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
    builder.addCase(
      updatePost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      }
    );
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const payload = action.payload;
      if (!payload || typeof payload === "string") {
        console.log("Delete could not complete");
        console.log(payload);
        return;
      }
      const { id } = payload;
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = posts;
    });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const getCount = (state: RootState) => state.posts.count;
export const selectPostById = (state: RootState, postId: number) =>
  state.posts.posts.find((post) => post.id === postId);
//  selectPostsByUser is a selector that accepts two arguments: the Redux state and the user ID.
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
export const { increaseCount, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
