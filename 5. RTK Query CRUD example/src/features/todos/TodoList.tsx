import React, { useState } from "react";
import {
  Flex,
  Input,
  useColorModeValue,
  IconButton,
  Card,
  CardBody,
  Checkbox,
} from "@chakra-ui/react";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../api/apiSlice";
type TodoListProps = {};

const TodoList: React.FC<TodoListProps> = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery(undefined, {});

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isSuccess) {
    content = todos.map((todo: any) => {
      return (
        <article key={todo.id}>
          <Card mb={2} w={"container.sm"}>
            <CardBody as={Flex} justify={"space-between"}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  updateTodo({
                    id: todo.id,
                    userId: todo.userId,
                    title: todo.title,
                    completed: e.target.checked,
                  })
                }
              />
              <span>{todo.title}</span>

              {/* <Checkbox
                checked={todo.completed}
                id={todo.id}
                onChange={() =>
                  updateTodo({ ...todo, completed: !todo.completed })
                }
              ></Checkbox> */}
              <IconButton
                onClick={() => deleteTodo({ id: todo.id })}
                aria-label="delete"
                icon={<FontAwesomeIcon icon={faTrash} />}
              />
            </CardBody>
          </Card>
        </article>
      );
    });
  }
  if (isError) {
    if (error) {
      if ("status" in error) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.data);
        return (
          <div>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </div>
        );
      } else {
        return <div>{error.message}</div>;
      }
    }
  }

  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleSubmit}>
        <Flex my={8} rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Input
            type="text"
            id="new-todo"
            placeholder="type something..."
            mr={1}
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />

          <IconButton
            type="submit"
            aria-label="submit"
            icon={<FontAwesomeIcon icon={faUpload} />}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          ></IconButton>
        </Flex>
      </form>

      {content}
    </Flex>
  );
};
export default TodoList;
