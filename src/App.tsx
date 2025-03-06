import { FormEvent, useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";

export type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "DELETE"; payload: number }
  | { type: "TOGGLE_DONE"; payload: number }
  | { type: "EDIT"; payload: { id: number; newTodo: string } };

const todoReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_DONE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.newTodo }
          : todo
      );
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todo.trim() === "") return;
    // setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
    dispatch({ type: "ADD", payload: { id: Date.now(), todo, isDone: false } });
    setTodo("");
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        dispatch={dispatch}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
      />
    </div>
  );
};

export default App;
