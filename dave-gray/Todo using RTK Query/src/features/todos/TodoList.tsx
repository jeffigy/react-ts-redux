import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "features/api/apiSlice";
import React, { useState } from "react";
export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};
const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newTodoForm = (
    <form onSubmit={onSubmit} className="card mb-5 border border-slate-700">
      <div className="card-body space-y-2">
        <input
          type="text"
          value={newTodo}
          onChange={({ target }) => setNewTodo(target.value)}
          className="input input-bordered"
          placeholder="e.g. Do the laundry"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          add
        </button>
      </div>
    </form>
  );

  let content;
  if (isLoading) {
    content = <span className="loading loading-ring loading-lg"></span>;
  } else if (isSuccess) {
    if (todos.length === 0) {
      content = <p>No todos found</p>;
    }
    content = todos.map((todo: TodoType) => {
      return (
        <article
          key={todo.id}
          className="card mb-2 rounded-md bg-neutral px-5 py-2"
        >
          <div className="flex items-center justify-between">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id.toString()}
              onChange={() => updateTodo({ ...todo, completed: true })}
            />
            <label htmlFor={todo.id.toString()} className="card-title">
              {todo.title}
            </label>
            <button
              onClick={() => deleteTodo({ id: Number(todo.id) })}
              className="btn btn-square btn-error btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </article>
      );
    });
  } else if (isError) {
    let errorMessage;
    if ("status" in error) {
      // error is FetchBaseQueryError
      errorMessage = JSON.stringify(error.data);
    } else {
      // error is SerializedError
      errorMessage = error.message;
    }
    content = (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{errorMessage}</span>
      </div>
    );
  }

  return (
    <main>
      <div className="mb-5 flex justify-center">
        <h1 className="text-4xl font-bold">Todo List</h1>
      </div>
      {newTodoForm}
      {content}
    </main>
  );
};

export default TodoList;
