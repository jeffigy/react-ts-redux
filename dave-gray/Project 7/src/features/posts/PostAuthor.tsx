import { useAppSelector } from "app/hooks";
import { UsersType, selectAllUsers } from "features/users/usersSlice";
import { Link } from "react-router-dom";
type PostAuthorProps = {
  userId: number;
};
const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find((user: UsersType) => user.id === userId);
  return (
    <span>
      {author ? (
        <Link to={`/user/${userId}`}> {author.name} </Link>
      ) : (
        "uknown author"
      )}
    </span>
  );
};

export default PostAuthor;
