import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Todo } from "./model";
import { MdDone } from "react-icons/md";
import { Action } from "../App";
import { FormEvent, useState, useRef, useEffect } from "react";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  index: number;
};

const TodoItem = ({ todo, todos, dispatch, index }: Props) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    dispatch({ type: "TOGGLE_DONE", payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const handleEdit = (event: FormEvent, id: number) => {
    event.preventDefault();
    dispatch({ type: "EDIT", payload: { id, newTodo: editTodo } });
    setEdit(false);
  };

  return (
    <div className="todos__item">
      <form onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
          <input
            title="edit"
            ref={inputRef}
            type="text"
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__item--text"
          />
        ) : (
          <span className="todos__item--text">
            {todo.isDone ? <s>{todo.todo}</s> : todo.todo}
          </span>
        )}

        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            HEllo
            <AiFillEdit />
          </span>
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      </form>
    </div>
  );
};

export default TodoItem;
