import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "../users/usersSlice"; // Corrected the path to the User type
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type PostAuthorProps = {
  userId: number; // Add the userId prop
};

const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers); // Access the users array from the state
  const author = users.find((user: User) => user.id === userId); // Remove the Number() conversion
  return (
    <Text>
      by{" "}
      {author ? (
        <Link to={`/user/${userId}`}>author.name</Link>
      ) : (
        "Unknown author"
      )}
    </Text>
  );
};
export default PostAuthor;
