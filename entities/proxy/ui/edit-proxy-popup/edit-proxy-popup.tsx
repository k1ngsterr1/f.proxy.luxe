"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

interface ProxyListItem {
  export: { ports: number; ext: string };
  login: string;
  password: string;
}

interface Proxy {
  id: string;
  ip: string;
  type: string;
  ports?: number[] | string;
  protocol: string;
  port_http?: number | string;
  port_socks?: number | string;
  country: string;
  login: string;
  password: string;
  title?: string;
  package_list: ProxyListItem[];
  order_number?: string;
  order_id?: string;
}

interface EditProxyPopupProps {
  proxy: Proxy | null;
  onClose: () => void;
  onSave: (updatedProxy: Proxy) => void;
  availableCountries?: { code: string; name: string }[];
}

export const EditProxyPopup = ({
  proxy,
  onClose,
  onSave,
  availableCountries = [],
}: EditProxyPopupProps) => {
  const [formData, setFormData] = useState<Proxy | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when proxy changes
  useEffect(() => {
    if (proxy) {
      setFormData({ ...proxy });
    }
  }, [proxy]);

  if (!proxy || !formData) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.ip) newErrors.ip = "IP адрес обязателен";
    if (!formData.protocol) newErrors.protocol = "Протокол обязателен";
    if (!formData.country) newErrors.country = "Страна обязательна";

    // IP validation
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (formData.ip && !ipPattern.test(formData.ip)) {
      newErrors.ip = "Неверный формат IP адреса";
    }

    // Port validation
    if (
      formData.port_http &&
      (isNaN(Number(formData.port_http)) ||
        Number(formData.port_http) < 1 ||
        Number(formData.port_http) > 65535)
    ) {
      newErrors.port_http = "Порт должен быть числом от 1 до 65535";
    }

    if (
      formData.port_socks &&
      (isNaN(Number(formData.port_socks)) ||
        Number(formData.port_socks) < 1 ||
        Number(formData.port_socks) > 65535)
    ) {
      newErrors.port_socks = "Порт должен быть числом от 1 до 65535";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && formData) {
      onSave(formData);
    }
  };

  // Styles
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(3px)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const popupStyle: React.CSSProperties = {
    backgroundColor: "#111111",
    border: "1px solid rgba(243, 214, 117, 0.25)",
    borderRadius: "12px",
    padding: "24px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    animation: "fadeIn 0.25s ease-out",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
    paddingBottom: "12px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#f3d675",
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#f3d675",
    cursor: "pointer",
    padding: "4px",
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: "16px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    color: "#999999",
    marginBottom: "6px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "6px",
    color: "#f3d675",
    fontSize: "14px",
  };

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: "#ff3b30",
  };

  const errorTextStyle: React.CSSProperties = {
    color: "#ff3b30",
    fontSize: "12px",
    marginTop: "4px",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "auto",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "24px",
  };

  const saveButtonStyle: React.CSSProperties = {
    backgroundColor: "#f3d675",
    color: "#000000",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontWeight: 500,
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const cancelButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    color: "#f3d675",
    border: "1px solid rgba(243, 214, 117, 0.25)",
    padding: "10px 16px",
    borderRadius: "6px",
    fontWeight: 500,
    cursor: "pointer",
    fontSize: "14px",
  };

  const formGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  };

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Редактирование прокси</h2>
          <button style={closeButtonStyle} onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={formGridStyle}>
            {/* Left column */}
            <div>
              {/* Title */}
              <div style={formGroupStyle}>
                <label htmlFor="title" style={labelStyle}>
                  Название
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  style={errors.title ? errorInputStyle : inputStyle}
                />
                {errors.title && <p style={errorTextStyle}>{errors.title}</p>}
              </div>

              {/* IP Address */}
              <div style={formGroupStyle}>
                <label htmlFor="ip" style={labelStyle}>
                  IP-адрес *
                </label>
                <input
                  type="text"
                  id="ip"
                  name="ip"
                  value={formData.ip}
                  onChange={handleChange}
                  style={errors.ip ? errorInputStyle : inputStyle}
                  required
                />
                {errors.ip && <p style={errorTextStyle}>{errors.ip}</p>}
              </div>

              {/* Protocol */}
              <div style={formGroupStyle}>
                <label htmlFor="protocol" style={labelStyle}>
                  Протокол *
                </label>
                <select
                  id="protocol"
                  name="protocol"
                  value={formData.protocol}
                  onChange={handleChange}
                  style={errors.protocol ? errorInputStyle : selectStyle}
                  required
                >
                  <option value="">Выберите протокол</option>
                  <option value="http">HTTP</option>
                  <option value="https">HTTPS</option>
                  <option value="socks5">SOCKS5</option>
                </select>
                {errors.protocol && (
                  <p style={errorTextStyle}>{errors.protocol}</p>
                )}
              </div>

              {/* HTTP Port */}
              <div style={formGroupStyle}>
                <label htmlFor="port_http" style={labelStyle}>
                  Порт HTTP
                </label>
                <input
                  type="number"
                  id="port_http"
                  name="port_http"
                  value={formData.port_http || ""}
                  onChange={handleChange}
                  style={errors.port_http ? errorInputStyle : inputStyle}
                  min="1"
                  max="65535"
                />
                {errors.port_http && (
                  <p style={errorTextStyle}>{errors.port_http}</p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div>
              {/* SOCKS Port */}
              <div style={formGroupStyle}>
                <label htmlFor="port_socks" style={labelStyle}>
                  Порт SOCKS
                </label>
                <input
                  type="number"
                  id="port_socks"
                  name="port_socks"
                  value={formData.port_socks || ""}
                  onChange={handleChange}
                  style={errors.port_socks ? errorInputStyle : inputStyle}
                  min="1"
                  max="65535"
                />
                {errors.port_socks && (
                  <p style={errorTextStyle}>{errors.port_socks}</p>
                )}
              </div>

              {/* Country */}
              <div style={formGroupStyle}>
                <label htmlFor="country" style={labelStyle}>
                  Страна *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  style={errors.country ? errorInputStyle : selectStyle}
                  required
                >
                  <option value="">Выберите страну</option>
                  {availableCountries.length > 0 ? (
                    availableCountries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="US">США</option>
                      <option value="GB">Великобритания</option>
                      <option value="DE">Германия</option>
                      <option value="FR">Франция</option>
                      <option value="RU">Россия</option>
                      <option value="JP">Япония</option>
                      <option value="CN">Китай</option>
                    </>
                  )}
                </select>
                {errors.country && (
                  <p style={errorTextStyle}>{errors.country}</p>
                )}
              </div>

              {/* Login */}
              <div style={formGroupStyle}>
                <label htmlFor="login" style={labelStyle}>
                  Логин
                </label>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  style={errors.login ? errorInputStyle : inputStyle}
                />
                {errors.login && <p style={errorTextStyle}>{errors.login}</p>}
              </div>

              {/* Password */}
              <div style={formGroupStyle}>
                <label htmlFor="password" style={labelStyle}>
                  Пароль
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={errors.password ? errorInputStyle : inputStyle}
                />
                {errors.password && (
                  <p style={errorTextStyle}>{errors.password}</p>
                )}
              </div>
            </div>
          </div>

          <div style={buttonContainerStyle}>
            <button type="button" style={cancelButtonStyle} onClick={onClose}>
              Отмена
            </button>
            <button type="submit" style={saveButtonStyle}>
              <Save size={16} />
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProxyPopup;
