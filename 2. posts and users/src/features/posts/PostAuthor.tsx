import { selectAllusers } from "../users/usersSlice";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { User } from "../users/usersSlice"; // Corrected the path to the User type

type PostAuthorProps = {
  userId: string; // Add the userId prop
};

const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector((state) => state.users.users); // Access the users array from the state
  const author = users.find((user: User) => user.id === userId); // Specify the User type for the user parameter
  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
