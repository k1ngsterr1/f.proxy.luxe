import React from "react";

export const ISPBuyCard = () => {
  return (
    <div className="buy-col">
      <div
        className="buy-item"
        style={{
          height: 800,
        }}
      >
        <h3 className="buy-item__header">
          ISP IPv4 ПРОКСИ <br />
          СТАТИЧЕСКИЕ
        </h3>
        <div className="separator"></div>
        <p className="buy-item__about">
          Подходят для всех сайтов. Кроме платёжных систем. Выдаются в одни руки
        </p>
        <a href="#" className="buy-item__btn">
          Выдаются в одни руки
        </a>
        <h4 className="buy-item__subheader">СТРАНА</h4>
        <select
          className="buy-item__select"
          style={{
            backgroundColor: "#1E1E1E", // Dark background
            color: "#fff", // White text
            border: "1px solid #3E3E3E", // Border color
            padding: "10px", // Padding inside the select
            width: "100%", // Full width
            borderRadius: "5px", // Rounded corners
            appearance: "none", // Removes default styles
            cursor: "pointer", // Pointer cursor
          }}
        >
          <option value="1">Россия</option>
          <option value="2">Россия</option>
        </select>
        <h4
          className="buy-item__subheader"
          style={{
            marginTop: 16,
          }}
        >
          КОЛ-ВО
        </h4>
        <select
          className="buy-item__select"
          style={{
            backgroundColor: "#1E1E1E", // Dark background
            color: "#fff", // White text
            border: "1px solid #3E3E3E", // Border color
            padding: "10px", // Padding inside the select
            width: "100%", // Full width
            borderRadius: "5px", // Rounded corners
            appearance: "none", // Removes default styles
            cursor: "pointer", // Pointer cursor
          }}
        >
          <option value="1">100</option>
          <option value="2">100</option>
        </select>
        <h4
          className="buy-item__subheader"
          style={{
            marginTop: 16,
          }}
        >
          ПЕРИОД
        </h4>
        <select
          className="buy-item__select"
          style={{
            backgroundColor: "#1E1E1E", // Dark background
            color: "#fff", // White text
            border: "1px solid #3E3E3E", // Border color
            padding: "10px", // Padding inside the select
            width: "100%", // Full width
            borderRadius: "5px", // Rounded corners
            appearance: "none", // Removes default styles
            cursor: "pointer", // Pointer cursor
          }}
        >
          <option value="1">1 дня</option>
          <option value="2">1 дня</option>
        </select>
        <div className="buy-item__price">
          ЦЕНА
          <span>2.4$ / IP</span>
        </div>
        <a href="#" className="btn">
          купить
        </a>
      </div>
    </div>
  );
};
