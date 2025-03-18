import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export const Button: React.FC<IButton> = ({ name, ...props }) => {
  return (
    <button className="btn" {...props}>
      {name}
    </button>
  );
};
