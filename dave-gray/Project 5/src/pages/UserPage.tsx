import { useAppSelector } from "app/hooks";
import {
  PostType,
  selectAllPosts,
  selectPostByUser,
} from "features/posts/postsSlice";
import { selectUserById } from "features/users/usersSlice";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  //* Optimization Issue #1: Re-renders
  //* Every time an action is dispatched, the selector will run.
  //* When we dispatch the increase count from the header, useAppSelector runs again.
  //* This forces the component to re-render if a new reference value is returned.

  //   const postsForUser = useAppSelector((state) => {
  //     const allPosts = selectAllPosts(state);
  //     return allPosts.filter((post) => post.userId === Number(userId));
  //   });

  //* Optimization Fix #1: Memoize the selector using createSelector()
  //* By using a memoized selector, we avoid unnecessary re-renders.
  //* The createSelector function from RTK ensures the filtering is only done if the inputs change.
  const postsForUser = useAppSelector((state) =>
    selectPostByUser(state, Number(userId)),
  );

  return (
    <div>
      <h2>{user?.name ? user?.name : "Unknown User"}</h2>
      <ul>
        {postsForUser &&
          postsForUser.map((post: PostType) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserPage;
