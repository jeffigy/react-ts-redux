import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export type PostType = {
  id: string;
  title: string;
  body: string;
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

type initialStateType = {
  posts: PostType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
};

const initialState: initialStateType = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(POSTS_URL);
    return res.data as PostType[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
});

type NewPostType = {
  title: string;
  body: string;
  userId: string;
};

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: NewPostType) => {
    try {
      const res = await axios.post(POSTS_URL, initialPost);
      return res.data as PostType;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
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
      const existingPost = state.posts.find(
        (post: PostType) => post.id === postId,
      );

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostType[]>) => {
          state.status = "succeeded";
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
          state.posts = loadedPosts;
        },
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(
        addNewPost.fulfilled,
        (state, action: PayloadAction<PostType>) => {
          action.payload.date = new Date().toISOString();
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          state.posts.push(action.payload);
        },
      );
  },
});

export const selectAllPosts = (state: { posts: initialStateType }) =>
  state.posts.posts;
export const getPostsStatus = (state: { posts: initialStateType }) =>
  state.posts.status;
export const getPostsError = (state: { posts: initialStateType }) =>
  state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
