import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoType } from "features/todos/TodoList";

// Define the API slice using createApi
export const apiSlice = createApi({
  // Set the reducer path where the API slice reducer will be mounted in the Redux store
  reducerPath: "api",
  // Configure the base query function with the base URL for API requests
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  // Define the types of tags used for cache invalidation and refetching
  tagTypes: ["Todos"],
  // Define the endpoints for the API slice
  endpoints: (builder) => ({
    // Define the getTodos query endpoint
    getTodos: builder.query<void, void>({
      // Configure the query function to fetch the list of todos from the server
      query: () => "/todos",
      // Transform the response to sort the todos by their ID in descending order
      transformResponse: (res: any) =>
        res.sort((a: TodoType, b: TodoType) => b.id - a.id),
      // Provide the "Todos" tag to indicate the data returned by this query
      providesTags: ["Todos"],
    }),
    // Define the addTodo mutation endpoint
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      // Invalidate the "Todos" tag to trigger refetching of the todos list
      invalidatesTags: ["Todos"],
    }),
    // Define the updateTodo mutation endpoint
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    // Define the deleteTodo mutation endpoint
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery, // Hook for the getTodos query
  useAddTodoMutation, // Hook for the addTodo mutation
  useUpdateTodoMutation, // Hook for the updateTodo mutation
  useDeleteTodoMutation, // Hook for the deleteTodo mutation
} = apiSlice;
