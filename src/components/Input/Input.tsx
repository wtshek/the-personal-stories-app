import React, { ChangeEvent, FC } from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  placeholder?: string;
};

export const Input: FC<InputProps> = ({
  value,
  onChange,
  label,
  id,
  placeholder,
}) => {
  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder || label}
        className="rounded-md border-2 border-gray-400 py-2 px-4 w-full"
        id={id}
        value={value}
        onChange={onInputValueChange}
      />
    </div>
  );
};
