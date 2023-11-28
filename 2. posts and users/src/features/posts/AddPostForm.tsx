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
import { addNewPost } from "./postSlice";
import { User, selectAllusers } from "../users/usersSlice";
import { nanoid } from "@reduxjs/toolkit";
type AddPostFormProps = {};

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useAppSelector(selectAllusers);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPost({
            id: nanoid(),
            title,
            body: content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          })
        );
        setTitle("");
        setContent("");
        setUserId(0);
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
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
              {users.users.map((user: User) => (
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
