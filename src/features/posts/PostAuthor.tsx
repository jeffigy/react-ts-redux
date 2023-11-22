import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selecdtAllusers } from "../users/usersSlice";

type PostAuthorProps = {
  userId: string; // Add the userId prop
};

const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector(selecdtAllusers);
  const author = users.find((user) => user.id === String(userId));
  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
