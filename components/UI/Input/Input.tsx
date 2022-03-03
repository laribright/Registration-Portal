import { FC } from "react";

interface InputProps {
  label: string;
  htmlFor: string;
  type: "text" | "number" | "email" | "password";
  placeHolder: string;
  required: boolean;
  inputRef: any
}

const Input: FC<InputProps> = (props) => {
  const { label, htmlFor, type, placeHolder, inputRef } = props;

  return (
    <div>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={htmlFor}
        type={type}
        placeholder={placeHolder}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;
