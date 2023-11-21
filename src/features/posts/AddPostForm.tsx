import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postSlice";
type AddPostFormProps = {};

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && content) {
      const newPost = {
        id: nanoid(),
        title,
        content,
      };

      dispatch(postAdded(newPost));
      setTitle("");
      setContent("");
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
          <Button w={"full"} type="submit">
            Submit
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};
export default AddPostForm;
