import React from "react";

interface IPopupLayout {
  children: any;
  text: string;
  id: string;
}

export const PopupLayout: React.FC<IPopupLayout> = ({ children, text, id }) => {
  return (
    <div className="auth" id={id} style={{ display: "none" }}>
      <h2 className="auth-header">{text}</h2>
      <div className="separator"></div>
      {children}
    </div>
  );
};
