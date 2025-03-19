"use client";
import React from "react";
import { usePopupStore } from "../store/use-popup.store";

interface IPopupLayout {
  children: React.ReactNode;
  text: string;
  id: string;
}

export const PopupLayout: React.FC<IPopupLayout> = ({ children, text, id }) => {
  const { openPopups, closePopup } = usePopupStore();

  if (!openPopups[id]) return null; // Если попап закрыт, не рендерим

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Глубокий чёрный фон
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={() => closePopup(id)} // Закрытие при клике на фон
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#121212", // Глубокий тёмный цвет
          padding: "20px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)", // Лёгкий белый светящийся эффект
          border: "1px solid rgba(255, 255, 255, 0.1)", // Тонкий белый контур
          color: "#fff", // Белый текст
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()} // Чтобы клик внутри попапа не закрывал его
      >
        <h2
          style={{ fontSize: "22px", marginBottom: "10px", color: "#fade4c" }}
        >
          {text}
        </h2>
        <div
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            marginBottom: "15px",
          }}
        ></div>

        {children}
      </div>
    </div>
  );
};
