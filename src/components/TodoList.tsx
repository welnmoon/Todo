import { Todo } from "./model";
import TodoItem from "./TodoItem";
import { Action } from "../App";
import "./styles.css";

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
}

const TodoList: React.FC<Props> = ({
  todos,
  dispatch,
  setCompletedTodos,
  completedTodos,
}) => {
  return (
    <div className="container">
      {/* Active Tasks */}

      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        {todos.map((todo, index) => (
          <TodoItem
            setCompletedTodos={setCompletedTodos}
            completedTodos={completedTodos}
            key={todo.id}
            index={index}
            todo={todo}
            todos={todos}
            dispatch={dispatch}
          />
        ))}
      </div>

      {/* Completed Tasks */}
      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        {completedTodos.map((todo, index) => (
          <TodoItem
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
            key={todo.id}
            index={index}
            todo={todo}
            todos={todos}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
