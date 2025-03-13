"use client";

import { FC, useEffect, useRef } from "react";
import { Option } from "@/interfaces/option.interface";

interface SelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select: FC<SelectProps> = ({ options, value, onChange, placeholder }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    onChange(options[0].id);
  }, []);

  return (
    <select ref={selectRef} className="buy-item__select">
      {options.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
