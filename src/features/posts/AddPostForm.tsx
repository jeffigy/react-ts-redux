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
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postAdded } from "./postSlice";
import { User, selecdtAllusers } from "../users/usersSlice";
type AddPostFormProps = {};

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const users = useAppSelector(selecdtAllusers);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

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
              onChange={(e) => setUserId(e.target.value)}
            >
              {users.map((user: User) => (
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
