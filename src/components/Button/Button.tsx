import React, { FC } from "react";

import clsx from "clsx";

type ButtonProps = {
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
};

export const Button: FC<ButtonProps> = ({
  children,
  type,
  id,
  onClick,
  className,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      className={clsx(
        "w-fit border-2 border-blue-700 px-4 py-2 rounded-md text-white bg-blue-700",
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};
