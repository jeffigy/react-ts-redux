import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
type SinglePostPageProps = {};

const SinglePostPage: React.FC<SinglePostPageProps> = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, Number(postId)));

  return (
    <Flex justify={"center"}>
      {!post && (
        <Text fontSize={"40px"} fontWeight={"black"}>
          post not found
        </Text>
      )}
      {post && (
        <Card m={10}>
          <CardHeader>
            <Flex align={"center"} justify={"space-between"}>
              <Text fontSize={"24px"} mb={"10px"}>
                {post.title}
              </Text>
              <IconButton
                colorScheme="blue"
                aria-label="edit"
                as={Link}
                to={`/post/edit/${post.id}`}
                icon={<EditIcon />}
              />
            </Flex>
            <Flex justify={"space-between"}>
              <Text fontSize={"14px"} color={"grey"}>
                <PostAuthor userId={post.userId} />
              </Text>
              <Text fontSize={"14px"} color={"grey"}>
                <TimeAgo timestamp={post.date} />
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <div>
              <p>{post.body}</p>
            </div>
          </CardBody>
          <CardFooter>
            <ReactionButtons post={post} />
          </CardFooter>
        </Card>
      )}
    </Flex>
  );
};
export default SinglePostPage;
