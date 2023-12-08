import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User, selectAllUsers } from "../users/usersSlice";
import {
  selectPostById,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./postSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  ModalContent,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const post = useAppSelector((state) => selectPostById(state, Number(postId)));
  const [title, settitle] = useState(post?.title || "");
  const [body, setbody] = useState(post?.body || "");
  const [userId, setuserId] = useState(post?.userId || 0);
  const users = useAppSelector(selectAllUsers);

  const canSave = [title, body, userId].every(Boolean) && !isLoading;

  const onFormSubmit = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post?.id,
          title,
          body,
          userId,
        }).unwrap();
        settitle("");
        setbody("");
        setuserId(0);
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Failed to delete the post", (error as Error).message);
      }
    }
  };

  const onDelete = async () => {
    try {
      await deletePost({ id: post?.id }).unwrap();

      settitle("");
      setbody("");
      setuserId(0);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post", (error as Error).message);
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
              onChange={(e) => setuserId(Number(e.target.value))}
            >
              {users.map((user: any) => (
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
