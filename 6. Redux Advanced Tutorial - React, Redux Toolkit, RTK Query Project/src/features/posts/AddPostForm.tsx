import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { customAlphabet } from "nanoid";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { User, selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postSlice";
type AddPostFormProps = {};

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const navigate = useNavigate();
  const nanoid = customAlphabet("1234567890", 5);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const users = useAppSelector(selectAllUsers);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId(0);
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Card mb={"30px"}>
        <CardBody as={Stack} spacing={5}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Input
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>User</FormLabel>
            <Select
              placeholder="Select user"
              name="user"
              value={userId}
              onChange={(e) => setUserId(parseInt(e.target.value))}
            >
              {users.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button w={"full"} type="submit" isDisabled={!canSave}>
            Submit
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};
export default AddPostForm;
