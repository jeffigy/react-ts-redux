import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

// Define the API URL for fetching posts
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// Define the type for a post
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

// Define the initial state type
type initialStateType = {
  posts: PostType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
};

// Initialize the state
const initialState: initialStateType = {
  posts: [],
  status: "idle",
  error: null,
};

// createAsyncThunk for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    // Perform a GET request to the POSTS_URL
    const res = await axios.get(POSTS_URL);
    return res.data as PostType[]; // Return the data as an array of PostType
  } catch (error) {
    throw new Error((error as Error).message); // Handle errors
  }
});

// Define the type for a new post
type NewPostType = {
  title: string;
  body: string;
  userId: string;
};

// createAsyncThunk for adding a new post
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: NewPostType) => {
    try {
      // Perform a POST request to the POSTS_URL with the initialPost data
      const res = await axios.post(POSTS_URL, initialPost);
      return res.data as PostType; // Return the data as PostType
    } catch (error) {
      throw new Error((error as Error).message); // Handle errors
    }
  },
);

// Create a slice of the state for posts
const postsSlice = createSlice({
  name: "posts", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Define the reducers
    // Reducer to handle adding a post
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.posts.push(action.payload); // Add the new post to the state
      },
      //the prepare() is a preprocessor function that is used to structure the payload
      // before it reaches the actual reducer function. It is particularly useful
      // when you need to add additional data or transform the action payload
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(), // Generate a unique ID
            title,
            body,
            userId,
            date: new Date().toISOString(), // Set the current date
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
    // Reducer to handle adding a reaction to a post
    reactionAdded: (
      state,
      action: PayloadAction<{
        postId: string;
        reaction: keyof PostType["reactions"];
      }>,
    ) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(
        (post: PostType) => post.id === postId,
      );

      if (existingPost) {
        existingPost.reactions[reaction]++; // Increment the reaction count
      }
    },
  },
  // extraReducers allows you to define additional reducers that respond to actions generated
  // by other parts of your application, such as thunks or other slices.
  // If you create an action using createAsyncThunk() , you can handle loading, success and failure states
  extraReducers: (builder) => {
    // Handle pending state for fetchPosts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"; // Set the status to loading
      })

      // Handle fulfilled state for fetchPosts
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostType[]>) => {
          state.status = "succeeded"; // Set the status to succeeded
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
          state.posts = loadedPosts; // Update the posts in the state
        },
      )
      // Handle rejected state for fetchPosts
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"; // Set the status to failed
        state.error = action.error.message || "Something went wrong"; // Set the error message
      })
      // Handle fulfilled state for addNewPost
      .addCase(
        addNewPost.fulfilled,
        (state, action: PayloadAction<PostType>) => {
          action.payload.date = new Date().toISOString(); // Set the current date
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          state.posts.push(action.payload); // Add the new post to the state
        },
      );
  },
});

// Selectors to get posts, status, and error from the state
export const selectAllPosts = (state: { posts: initialStateType }) =>
  state.posts.posts;
export const getPostsStatus = (state: { posts: initialStateType }) =>
  state.posts.status;
export const getPostsError = (state: { posts: initialStateType }) =>
  state.posts.error;

// Export the actions
export const { postAdded, reactionAdded } = postsSlice.actions;

// Export the reducer
export default postsSlice.reducer;
