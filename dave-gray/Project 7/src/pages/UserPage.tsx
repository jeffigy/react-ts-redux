import { useParams } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { selectUserById } from "features/users/usersSlice";
import { useGetPostsByUserIdQuery } from "features/posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(Number(userId));

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    // const { ids, entities } = postsForUser;
    // content = ids.map((id: number) => (
    //   <li key={id}>
    //     <Link to={`/post/${id}`}>{entities[id].title}</Link>
    //   </li>
    // ));
    console.log(postsForUser);
  } else if (isError) {
    content = <p>{error.toString()}</p>;
    console.log(error);
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
