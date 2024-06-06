import { useAppSelector } from "app/hooks";
import { UsersType, selectAllUsers } from "features/users/usersSlice";
type PostAuthorProps = {
  userId: string;
};
const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find((user: UsersType) => user.id === userId);
  return <span>{author ? author.name : "uknown author"}</span>;
};

export default PostAuthor;
