import { FormEvent, useRef } from "react";
import "./styles.css";

type InputFieldProps = {
  todo: string;
  setTodo: (value: string) => void;
  handleAdd: (event: FormEvent<HTMLFormElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  handleAdd,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={todo}
        placeholder="write"
        className="input__box"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input__submit">Go</button>
    </form>
  );
};

export default InputField;
