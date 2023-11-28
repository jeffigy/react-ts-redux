import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User, selectAllusers } from "../users/usersSlice";
import { Status, selectPostById, updatePost, deletePost } from "./postSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useAppSelector((state) => selectPostById(state, Number(postId)));
  const [title, settitle] = useState(post?.title || "");
  const [body, setbody] = useState(post?.body || "");
  const [userId, setuserId] = useState(post?.userId || 0);
  const [requestStatus, setrequestStatus] = useState("idle");
  const users = useAppSelector(selectAllusers);
  const dispatch = useAppDispatch();

  const canSave =
    [title, body, userId].every(Boolean) && requestStatus === "idle";

  const onFormSubmit = () => {
    if (canSave) {
      try {
        setrequestStatus("pending");
        dispatch(
          updatePost({
            id: post?.id || 0,
            title,
            body,
            userId,
            reactions: post?.reactions || [],
          })
        ).unwrap();
        settitle("");
        setbody("");
        setuserId(0);
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Failed to delete the post", (error as Error).message);
      } finally {
        setrequestStatus("idle");
      }
    }
  };

  const onDelete = () => {
    try {
      setrequestStatus("pending");
      dispatch(deletePost({ id: post?.id || 0 })).unwrap();
      settitle("");
      setbody("");
      setuserId(0);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post", (error as Error).message);
    } finally {
      setrequestStatus("idle");
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Card>
        <CardHeader>Edit Post</CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => settitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Textarea value={body} onChange={(e) => setbody(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>User</FormLabel>
            <Select
              placeholder="Select user"
              name="user"
              value={userId}
              onChange={(e) => setuserId(parseInt(e.target.value))}
            >
              {users.users.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </CardBody>
        <CardFooter as={Stack}>
          <Button w={"full"} type="submit" isDisabled={!canSave}>
            Submit
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Delete Post
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default EditPost;
