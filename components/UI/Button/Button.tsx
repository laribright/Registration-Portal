import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: "success" | "danger";
  onClick?: () => any;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, type, onClick } = props;

  const BTN_BG: string =
    type === "success"
      ? "from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br"
      : "from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br";

  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${BTN_BG} text-white bg-gradient-to-r font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
    >
      {children}
    </button>
  );
};

export default Button;
