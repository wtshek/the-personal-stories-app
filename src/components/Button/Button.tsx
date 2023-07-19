import React, { FC } from "react";

type ButtonProps = {
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, type, id, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      className="w-fit border-2 border-blue-700 px-4 py-2 rounded-md text-white bg-blue-700"
    >
      {children}
    </button>
  );
};
