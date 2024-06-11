import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { sub } from "date-fns";

// Define the API URL for fetching posts
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// Define the type for a post
export type PostType = {
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

// Define the initial state type
type initialStateType = EntityState<PostType, string> & {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
  count: number;
};

// Define the type for a new post
type NewPostType = {
  title: string;
  body: string;
  userId: number;
};
//* Optimization Fix #2: createEntityAdapter()
//* createEntityAdapter simplifies the process of managing normalized state in a Redux store
const postAdapter = createEntityAdapter<PostType>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: initialStateType = postAdapter.getInitialState({
  status: "idle",
  error: null,
  count: 0,
});

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

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: PostType) => {
    const { id } = initialPost;

    try {
      const res = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return res.data;
    } catch (error) {
      // return (error as Error).message;
      return initialPost; // only for testing redux
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost: { id: string }) => {
    const { id } = initialPost;
    try {
      const res = await axios.delete(`${POSTS_URL}/${id}`);
      if (res.status === 200) return initialPost;
      throw new Error(`${res.status}: ${res.statusText}`);
    } catch (error) {
      throw new Error((error as Error).message);
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

    // Reducer to handle adding a reaction to a post
    reactionAdded: (
      state,
      action: PayloadAction<{
        postId: string;
        reaction: keyof PostType["reactions"];
      }>,
    ) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];

      if (existingPost) {
        existingPost.reactions[reaction]++; // Increment the reaction count
      }
    },

    increaseCount: (state) => {
      state.count += 1;
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
          // state.posts = loadedPosts; // Update the posts in the state
          postAdapter.upsertMany(state, loadedPosts);
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
          // state.posts.push(action.payload); // Add the new post to the state
          postAdapter.addOne(state, action.payload);
        },
      )
      .addCase(
        updatePost.fulfilled,
        (state, action: PayloadAction<PostType>) => {
          console.log(action);

          if (!action.payload?.id) {
            console.log("udpate could not complete");
            console.log(action.payload);
            return;
          }
          action.payload.date = new Date().toISOString();
          postAdapter.upsertOne(state, action.payload);
        },
      )
      .addCase(
        deletePost.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          if (!action.payload?.id) {
            console.log("Delete could not complete");
            console.log(action.payload);
            return;
          }
          const { id } = action.payload;
          postAdapter.removeOne(state, id);
        },
      );
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors<RootState>((state) => state.posts);

// Selectors to get posts, status, and error from the state
export const getPostsStatus = (state: { posts: initialStateType }) =>
  state.posts.status;
export const getPostsError = (state: { posts: initialStateType }) =>
  state.posts.error;
export const getCount = (state: { posts: initialStateType }) =>
  state.posts.count;

//* Optimization #1:
//* createSelector is function for creating memoized selectors
export const selectPostByUser = createSelector(
  //* Input Selectors
  // (state, userId) => userId: This is a simple selector that just
  // returns the userId passed to it. This shows that the selector expects
  // to be called with both the state and an additional argument, userId.
  [selectAllPosts, (_state, userId) => userId],
  //* Result Function
  // (posts, userId) => posts.filter((post: PostType) => post.userId === userId):
  //  This function takes the list of posts and the userId as arguments and returns
  //  a filtered list of posts where the userId of the post matches the provided userId
  (posts, userId) => posts.filter((post: PostType) => post.userId === userId),
);

// Export the actions
export const { increaseCount, reactionAdded } = postsSlice.actions;

// Export the reducer
export default postsSlice.reducer;
