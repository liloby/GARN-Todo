import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      description
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String!
    $completed: Boolean!
  ) {
    createTodo(
      input: { title: $title, description: $description, completed: $completed }
    ) {
      id
      title
      description
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: Float!
    $title: String!
    $description: String!
    $completed: Boolean!
  ) {
    updateTodo(
      id: $id
      title: $title
      description: $description
      completed: $completed
    ) {
      id
      title
      description
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Float!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export default function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  console.log(data);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTodo = async (e: any) => {
    e.preventDefault();
    await createTodo({
      variables: {
        title,
        description,
        completed: false,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
    setTitle("");
    setDescription("");
  };

  const handleToggleComplete = async (todo: any) => {
    const { id, title, description, completed } = todo;
    await updateTodo({
      variables: {
        id: Number(id),
        title,
        description,
        completed: !completed,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {data.todos.map((todo: any) => (
          <li key={todo.id}>
            <span onClick={() => handleToggleComplete(todo)}>
              {todo.title} - {todo.description} -{" "}
              {todo.completed ? "Completed" : "Incomplete"}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
