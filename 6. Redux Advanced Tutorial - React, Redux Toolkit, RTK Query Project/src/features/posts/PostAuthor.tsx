import React from "react";
import { useAppSelector } from "../../app/hooks";
import { User } from "../users/usersSlice"; // Corrected the path to the User type
import { Text } from "@chakra-ui/react";
type PostAuthorProps = {
  userId: number; // Add the userId prop
};

const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector((state) => state.users.users); // Access the users array from the state
  const author = users.find((user: User) => user.id === userId); // Remove the Number() conversion
  return <Text>by {author ? author.name : "Unknown author"}</Text>;
};
export default PostAuthor;
