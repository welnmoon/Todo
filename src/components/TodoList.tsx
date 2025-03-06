import { Todo } from "./model";
import TodoItem from "./TodoItem";
import { Action } from "../App";
import "./styles.css";
import { Droppable } from "react-beautiful-dnd";

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
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                index={index}
                todo={todo}
                todos={todos}
                dispatch={dispatch}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Completed Tasks */}
      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                index={index}
                todo={todo}
                todos={todos}
                dispatch={dispatch}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
