import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  variant?: "small" | "medium" | "default" | "big";
}

export const Button: React.FC<IButton> = ({
  name,
  variant = "default",
  ...props
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    small: {
      marginRight: "8px",
      marginTop: "12px",
      padding: "8px 16px",
      backgroundColor: "#f3d675",
      border: "none",
      borderRadius: "4px",
      color: "#000000",
      fontSize: "12px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background-color 0.2s",
    },

    medium: {
      padding: "10px 24px",
      backgroundColor: "#f3d675",
      border: "none",
      borderRadius: "4px",
      color: "#000000",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
    },
    default: {
      padding: "8px 16px",
      backgroundColor: "#f3d675",
      border: "none",
      borderRadius: "4px",
      color: "#000000",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "500",
    },
    big: {
      width: "100%",
      height: "45px",
      padding: "8px 16px",
      backgroundColor: "#f3d675",
      border: "none",
      borderRadius: "32px",
      color: "#000000",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "500",
    },
  };

  return (
    <button className="btn" style={variantStyles[variant]} {...props}>
      {name}
    </button>
  );
};
