import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";
import { logOut, setCredentials } from "features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);

  //   if (result?.error?.originalStatus === 403) {
  if (result?.error && "originalStatus" in result.error) {
    console.log("sending refresh token");
    // send refresh toke nto get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data as { accessToken: string }; // Ensure type correctness
      const user = (api.getState() as RootState).auth.user;
      if (user) {
        // Ensure user is not null
        // store the new token
        api.dispatch(setCredentials({ user, accessToken }));
        // retry the original query with new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut()); // Handle the case where user is null
      }
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (_builder) => ({}),
});
