import React, { ChangeEvent, FC } from "react";

type SelectInputProps = {
  label: string;
  testid?: string;
  value: string;
  onChange: (value: string) => void;
  data: { label: string; id: string }[];
  id: string;
};

export const SelectInput: FC<SelectInputProps> = ({
  label,
  testid,
  value,
  onChange,
  data,
  id,
}) => {
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        className="rounded-md py-2 px-4 w-full"
        id={id}
        value={value || ""}
        onChange={onSelectChange}
        data-testid={testid}
      >
        {data.map(({ id, label }) => (
          <option value={id} key={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
