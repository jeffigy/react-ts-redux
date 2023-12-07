import React from "react";
import { selectUserById } from "./usersSlice";
import { useAppSelector } from "../../app/hooks";
import { selectPostsByUser } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

type UserpageProps = {};

const Userpage: React.FC<UserpageProps> = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  if (!user) {
    return null; // or loading state
  }

  return (
    <Flex direction={"column"} justify={"center"} align={"center"} p={"50px"}>
      <Text fontSize={"3xl"}>{user.name}</Text>

      {postsForUser.map((post) => (
        <Card as={Link} mb={"10px"} w={"full"} to={`/post/${post.id}`}>
          <CardBody>{post.title}</CardBody>
        </Card>
      ))}
    </Flex>
  );
};
export default Userpage;
