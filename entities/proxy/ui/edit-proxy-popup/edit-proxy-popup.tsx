"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { X, Save, ChevronDown, ChevronUp } from "lucide-react";

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
  rotation?: number;
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
  const [rotationType, setRotationType] = useState<string>("general");
  const [customRotationValue, setCustomRotationValue] = useState<string>("300");
  const [showRotationOptions, setShowRotationOptions] = useState(false);
  const rotationOptionsRef = useRef<HTMLDivElement>(null);

  // Initialize form data when proxy changes
  useEffect(() => {
    if (proxy) {
      setFormData({ ...proxy });

      // Set rotation type based on proxy.rotation value
      if (proxy.rotation === -1) {
        setRotationType("sticky");
      } else if (proxy.rotation === 0 || proxy.rotation === undefined) {
        setRotationType("general");
      } else {
        setRotationType("rotating");
        setCustomRotationValue(String(proxy.rotation));
      }
    }
  }, [proxy]);

  // Close rotation options dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rotationOptionsRef.current &&
        !rotationOptionsRef.current.contains(event.target as Node)
      ) {
        setShowRotationOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleRotationTypeChange = (type: string) => {
    setRotationType(type);
    setShowRotationOptions(false);

    // Update rotation value based on type
    let rotationValue: number;
    if (type === "sticky") {
      rotationValue = -1;
    } else if (type === "general") {
      rotationValue = 0;
    } else {
      rotationValue = Number.parseInt(customRotationValue, 10);
      if (isNaN(rotationValue) || rotationValue < 1) {
        rotationValue = 300; // Default to 5 minutes
      }
    }

    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, rotation: rotationValue };
    });
  };

  const handleCustomRotationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomRotationValue(value);

    // Update rotation value if it's a valid number
    const numValue = Number.parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 3600) {
      setFormData((prev) => {
        if (!prev) return null;
        return { ...prev, rotation: numValue };
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Only validate title field
    if (!formData.title) {
      newErrors.title = "Название обязательно";
    }

    // Validate custom rotation value if rotating type is selected
    if (rotationType === "rotating") {
      const rotationValue = Number.parseInt(customRotationValue, 10);
      if (isNaN(rotationValue) || rotationValue < 1 || rotationValue > 3600) {
        newErrors.rotation = "Значение должно быть от 1 до 3600 секунд";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && formData) {
      // Set final rotation value based on type
      let finalRotation: number;
      if (rotationType === "sticky") {
        finalRotation = -1;
      } else if (rotationType === "general") {
        finalRotation = 0;
      } else {
        finalRotation = Number.parseInt(customRotationValue, 10);
      }

      const updatedProxy = {
        ...formData,
        rotation: finalRotation,
      };

      onSave(updatedProxy);
    }
  };

  // Rotation options
  const rotationOptions = [
    { label: "General", value: "general" },
    { label: "Sticky", value: "sticky" },
    { label: "Rotating", value: "rotating" },
  ];

  // Predefined rotation periods
  const predefinedPeriods = [
    { label: "5 seconds", value: "5" },
    { label: "30 seconds", value: "30" },
    { label: "1 minute", value: "60" },
    { label: "5 minutes", value: "300" },
    { label: "10 minutes", value: "600" },
    { label: "15 minutes", value: "900" },
    { label: "30 minutes", value: "1800" },
    { label: "60 minutes", value: "3600" },
    { label: "Custom", value: "custom" },
  ];

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

  const dropdownButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "6px",
    color: "#f3d675",
    fontSize: "14px",
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  };

  const dropdownMenuStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "6px",
    marginTop: "4px",
    zIndex: 10,
    maxHeight: "200px",
    overflowY: "auto",
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: "10px 14px",
    color: "#f3d675",
    cursor: "pointer",
    borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
  };

  const radioStyle: React.CSSProperties = {
    appearance: "none",
    width: "16px",
    height: "16px",
    backgroundColor: "transparent",
    border: "1px solid #f3d675",
    borderRadius: "50%",
    cursor: "pointer",
    position: "relative",
    marginRight: "8px",
  };

  const radioCheckedStyle: React.CSSProperties = {
    ...radioStyle,
    backgroundColor: "#f3d675",
    boxShadow: "inset 0 0 0 3px #1a1a1a",
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
          {/* Title */}
          <div style={formGroupStyle}>
            <label htmlFor="title" style={labelStyle}>
              Название *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              style={errors.title ? errorInputStyle : inputStyle}
              required
            />
            {errors.title && <p style={errorTextStyle}>{errors.title}</p>}
          </div>

          {/* Rotation Type */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Rotation Type</label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {rotationOptions.map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#f3d675",
                  }}
                >
                  <input
                    type="radio"
                    name="rotationType"
                    value={option.value}
                    checked={rotationType === option.value}
                    onChange={() => handleRotationTypeChange(option.value)}
                    style={
                      rotationType === option.value
                        ? radioCheckedStyle
                        : radioStyle
                    }
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Rotation Period - Only visible when Rotating is selected */}
          {rotationType === "rotating" && (
            <div style={formGroupStyle}>
              <label style={labelStyle}>Rotation Period (seconds)</label>
              <div style={{ position: "relative" }} ref={rotationOptionsRef}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="number"
                    value={customRotationValue}
                    onChange={handleCustomRotationChange}
                    min="1"
                    max="3600"
                    style={{
                      ...inputStyle,
                      flex: 1,
                      ...(errors.rotation ? { borderColor: "#ff3b30" } : {}),
                    }}
                    placeholder="Enter seconds (1-3600)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRotationOptions(!showRotationOptions)}
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "6px",
                      color: "#f3d675",
                      padding: "0 10px",
                      cursor: "pointer",
                    }}
                  >
                    {showRotationOptions ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>

                {showRotationOptions && (
                  <div style={dropdownMenuStyle}>
                    {predefinedPeriods.map((period) => (
                      <div
                        key={period.value}
                        style={{
                          ...dropdownItemStyle,
                          backgroundColor:
                            customRotationValue === period.value
                              ? "rgba(243, 214, 117, 0.1)"
                              : "transparent",
                        }}
                        onClick={() => {
                          setCustomRotationValue(period.value);
                          setFormData((prev) => {
                            if (!prev) return null;
                            return {
                              ...prev,
                              rotation: Number.parseInt(period.value, 10),
                            };
                          });
                          setShowRotationOptions(false);
                        }}
                      >
                        {period.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.rotation && (
                <p style={errorTextStyle}>{errors.rotation}</p>
              )}
              <p
                style={{ fontSize: "12px", color: "#999999", marginTop: "4px" }}
              >
                Enter a value between 1 and 3600 seconds (60 minutes)
              </p>
            </div>
          )}

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
