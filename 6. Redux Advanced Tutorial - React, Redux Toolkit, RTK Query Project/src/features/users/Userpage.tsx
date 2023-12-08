import { selectUserById } from "./usersSlice";
import { useAppSelector } from "../../app/hooks";
import { Post, useGetPostByUserIdQuery } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

const Userpage = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostByUserIdQuery(userId);

  if (!user) {
    return null; // or loading state
  }

  return (
    <Flex direction={"column"} justify={"center"} align={"center"} p={"50px"}>
      <Text fontSize={"3xl"}>{user.name}</Text>

      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          {Array.isArray(postsForUser) && (
            <div>
              {postsForUser.map((post: Post) => (
                <Card as={Link} mb={"10px"} w={"full"} to={`/post/${post.id}`}>
                  <CardBody>{post.title}</CardBody>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      {isError && <div>{error.toString()}</div>}
    </Flex>
  );
};
export default Userpage;
