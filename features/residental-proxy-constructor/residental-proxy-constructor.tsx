"use client";
import React from "react";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Plus,
  X,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
} from "lucide-react";
import { useGetGeoReferences } from "@/entities/geo/hooks/queries/use-get-references.query";
import { useModifyResidentProxy } from "@/entities/residental-proxy/api/hooks/mutations/use-modify-resident-proxy.mutation";
import { useTranslations } from "next-intl";

const radioStyle: React.CSSProperties = {
  appearance: "none",
  width: "16px",
  height: "16px",
  backgroundColor: "transparent",
  border: "1px solid #f3d675",
  borderRadius: "50%",
  cursor: "pointer",
  position: "relative",
  marginRight: "6px",
};

const radioCheckedStyle: React.CSSProperties = {
  ...radioStyle,
  backgroundColor: "#f3d675",
  boxShadow: "inset 0 0 0 3px #000000",
};

export const ResidentProxyConstructor = ({
  package_key,
}: {
  package_key: string;
}) => {
  const i18n = useTranslations("residentProxy");
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const rotationPeriodOptions = [
    { label: i18n("rotationPeriods.eachRequest"), value: "each_request" },
    { label: i18n("rotationPeriods.fiveMinutes"), value: "300" },
    { label: i18n("rotationPeriods.tenMinutes"), value: "600" },
    { label: i18n("rotationPeriods.fifteenMinutes"), value: "900" },
    { label: i18n("rotationPeriods.twentyMinutes"), value: "1200" },
    { label: i18n("rotationPeriods.sixtyMinutes"), value: "3600" },
    { label: i18n("rotationPeriods.custom"), value: "custom" },
  ];

  const rotationOptions = [
    { label: i18n("rotationOptions.general"), value: "general" },
    { label: i18n("rotationOptions.sticky"), value: "sticky" },
    { label: i18n("rotationOptions.rotating"), value: "rotating" },
  ];

  const [listName, setListName] = useState("");
  const [rotation, setRotation] = useState("general");
  const [rotationPeriod, setRotationPeriod] = useState("10_min");
  const [isRotationPeriodOpen, setIsRotationPeriodOpen] = useState(false);
  const rotationPeriodRef = useRef<HTMLDivElement>(null);
  const [authMethod, setAuthMethod] = useState("username");
  const [exportFormat, setExportFormat] = useState("link");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [isp, setIsp] = useState("");
  const [ports, setPorts] = useState("2");
  const [showAddIpPopup, setShowAddIpPopup] = useState(false);
  const [newIp, setNewIp] = useState("");
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editIp, setEditIp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [availableIsps, setAvailableIsps] = useState<string[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [customRotationValue, setCustomRotationValue] = useState("300");
  const [showCustomRotationInput, setShowCustomRotationInput] = useState(false);
  const { mutate: modifyProxy, isPending } = useModifyResidentProxy();

  // Country dropdown states
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Get geo references data
  const {
    data: geoReferences,
    isLoading: isLoadingGeo,
    isError: isErrorGeo,
    error: errorGeo,
  } = useGetGeoReferences();

  // Close rotation period dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rotationPeriodRef.current &&
        !rotationPeriodRef.current.contains(event.target as Node)
      ) {
        setIsRotationPeriodOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset dependent fields when parent field changes
  const updateAvailableIsps = useCallback(() => {
    if (city) {
      const selectedCity = cities.find((c: any) => c.name === city);
      setAvailableIsps(selectedCity?.isps || []);
      setIsp(""); // Reset ISP when city changes
    } else {
      setAvailableIsps([]);
      setIsp("");
    }
  }, [city, cities]);

  // Get available countries, regions, and cities based on selections
  const countries = geoReferences || [];

  // Combine continents and countries for the dropdown
  const countryOptions = [...countries];

  // Filter countries based on search
  const filteredCountries = countrySearch
    ? countryOptions.filter((c: any) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : countryOptions;

  const selectedCountry = countries.find((c: any) => c.code === country);
  const regions = selectedCountry?.regions || [];

  // Add a useEffect to update cities when region changes
  React.useEffect(() => {
    if (region && selectedCountry) {
      const selectedRegion = selectedCountry.regions.find(
        (r: any) => r.name === region
      );
      if (selectedRegion && selectedRegion.cities) {
        setCities(selectedRegion.cities);
      } else {
        setCities([]);
      }
      // Reset city and ISP when region changes
      setCity("");
      setIsp("");
    } else {
      setCities([]);
    }
  }, [region, selectedCountry]);

  // Add useEffect to call updateAvailableIsps when city changes
  React.useEffect(() => {
    updateAvailableIsps();
  }, [city, updateAvailableIsps]);

  const handleAddIp = () => {
    if (newIp.trim() !== "") {
      setWhitelist([...whitelist, newIp.trim()]);
      setNewIp("");
      setShowAddIpPopup(false);
    }
  };

  const handleCancelAddIp = () => {
    setNewIp("");
    setShowAddIpPopup(false);
  };

  const handleEditIp = (index: number) => {
    setEditIndex(index);
    setEditIp(whitelist[index]);
  };

  const handleUpdateIp = (index: number) => {
    const updatedWhitelist = [...whitelist];
    updatedWhitelist[index] = editIp;
    setWhitelist(updatedWhitelist);
    setEditIndex(null);
    setEditIp("");
  };

  const handleDeleteIp = (index: number) => {
    const updatedWhitelist = [...whitelist];
    updatedWhitelist.splice(index, 1);
    setWhitelist(updatedWhitelist);
  };

  // Add a validation function before the handleSubmit function
  const validateForm = () => {
    // If country is selected but region, city or ISP is missing, show alert
    if (country && (!region || !city || !isp)) {
      setErrorMessage(i18n("errors.incompleteGeoSelection"));
      return false;
    }

    // Clear any previous error messages
    setErrorMessage(null);
    return true;
  };

  // Modify the handleSubmit function to use the validation
  const handleSubmit = () => {
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validate the form before proceeding
    if (!validateForm()) {
      return;
    }

    // Calculate rotation period in seconds
    let rotationPeriodSeconds = 0;
    if (rotation === "rotating") {
      if (rotationPeriod === "custom") {
        rotationPeriodSeconds = Number.parseInt(customRotationValue, 10);
        if (
          isNaN(rotationPeriodSeconds) ||
          rotationPeriodSeconds < 1 ||
          rotationPeriodSeconds > 3600
        ) {
          setErrorMessage(i18n("errors.customRotationPeriod"));
          return;
        }
      } else {
        rotationPeriodSeconds = Number.parseInt(rotationPeriod, 10);
      }
    }

    // Include rotation period in the payload when rotation is "rotating"
    const payload = {
      package_key,
      ports: Number(ports),
      whitelist: whitelist.join(";"),
      title: listName,
      rotation:
        rotation === "general"
          ? 0
          : rotation === "sticky"
          ? -1
          : rotationPeriodSeconds,
      geo: { country, region, city, isp },
    };

    modifyProxy(payload, {
      onSuccess: () => {
        setSuccessMessage(i18n("messages.success"));
      },
      onError: (error: any) => {
        setErrorMessage(i18n("errors.general"));
      },
    });
  };

  // Add global style for select options
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .dark-select option {
      background-color: #111111;
      color: #f3d675;
    }
  `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "16px" : "20px",
        backgroundColor: "#000000",
        color: "#FFFFFF",
        padding: isMobile ? "16px" : "20px",
        borderRadius: "8px",
        border: "1px solid rgba(243, 214, 117, 0.2)",
      }}
    >
      {/* IP Whitelist Section */}
      <div
        style={{
          backgroundColor: "rgba(243, 214, 117, 0.05)",
          border: "1px solid rgba(243, 214, 117, 0.2)",
          borderRadius: "8px",
          padding: isMobile ? "16px" : "20px",
          position: "relative",
        }}
      >
        <h3
          style={{
            fontSize: isMobile ? "15px" : "16px",
            fontWeight: "bold",
            color: "#f3d675",
            marginBottom: "12px",
          }}
        >
          {i18n("ipWhitelist.title")}
        </h3>
        {whitelist.length === 0 ? (
          <p
            style={{
              fontSize: isMobile ? "13px" : "14px",
              color: "#999999",
              marginBottom: "16px",
            }}
          >
            {i18n("ipWhitelist.noIps")}
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {whitelist.map((ip, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: isMobile ? "10px" : "8px 12px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  color: "#f3d675",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editIp}
                    onChange={(e) => setEditIp(e.target.value)}
                    style={{
                      width: isMobile ? "100%" : "70%",
                      padding: "6px 8px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "4px",
                      color: "#f3d675",
                      fontSize: isMobile ? "13px" : "14px",
                      marginBottom: isMobile ? "8px" : "0",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      width: isMobile ? "100%" : "auto",
                      marginBottom: isMobile ? "8px" : "0",
                    }}
                  >
                    {ip}
                  </span>
                )}
                <div
                  style={{
                    width: isMobile ? "100%" : "auto",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() => handleUpdateIp(index)}
                        style={{
                          backgroundColor: "#f3d675",
                          color: "#000000",
                          border: "none",
                          padding: isMobile ? "6px 12px" : "4px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: isMobile ? "13px" : "12px",
                          fontWeight: "500",
                          marginRight: "5px",
                        }}
                      >
                        {i18n("ipWhitelist.saveButton")}
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        style={{
                          backgroundColor: "transparent",
                          color: "#f3d675",
                          border: "1px solid rgba(243, 214, 117, 0.2)",
                          padding: isMobile ? "6px 12px" : "4px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: isMobile ? "13px" : "12px",
                          fontWeight: "500",
                        }}
                      >
                        {i18n("ipWhitelist.cancelButton")}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditIp(index)}
                        style={{
                          backgroundColor: "transparent",
                          color: "#f3d675",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                          marginRight: "5px",
                          padding: isMobile ? "8px" : "4px",
                        }}
                      >
                        <Edit size={isMobile ? 18 : 16} />
                      </button>
                      <button
                        onClick={() => handleDeleteIp(index)}
                        style={{
                          backgroundColor: "transparent",
                          color: "#f3d675",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                          padding: isMobile ? "8px" : "4px",
                        }}
                      >
                        <Trash2 size={isMobile ? 18 : 16} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          style={{
            backgroundColor: "#f3d675",
            color: "#000000",
            border: "none",
            padding: isMobile ? "10px 16px" : "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: isMobile ? "14px" : "14px",
            fontWeight: "500",
            width: isMobile ? "100%" : "auto",
          }}
          onClick={() => setShowAddIpPopup(true)}
        >
          <Plus size={16} style={{ marginRight: "8px" }} />
          {i18n("ipWhitelist.addButton")}
        </button>

        {/* Add IP Popup */}
        {showAddIpPopup && (
          <>
            {/* Backdrop */}
            <div
              onClick={handleCancelAddIp}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                zIndex: 999,
              }}
            />

            {/* Popup Card */}
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                backgroundColor: "#111111",
                border: "1px solid rgba(243, 214, 117, 0.25)",
                borderRadius: "12px",
                padding: isMobile ? "20px" : "24px",
                zIndex: 1000,
                width: isMobile ? "90%" : "90%",
                maxWidth: "400px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                animation: "fadeIn 0.25s ease-out",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleCancelAddIp}
                style={{
                  position: "absolute",
                  top: isMobile ? "12px" : "10px",
                  right: isMobile ? "12px" : "12px",
                  background: "none",
                  border: "none",
                  color: "#f3d675",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: isMobile ? "8px" : "4px",
                }}
                aria-label="Close"
              >
                <X size={isMobile ? 20 : 18} />
              </button>

              <h4
                style={{
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: "16px",
                }}
              >
                {i18n("ipWhitelist.addPopupTitle")}
              </h4>

              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder={i18n("ipWhitelist.ipPlaceholder")}
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 14px" : "10px 14px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "6px",
                  color: "#f3d675",
                  fontSize: isMobile ? "14px" : "14px",
                  marginBottom: "20px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <button
                  onClick={handleCancelAddIp}
                  style={{
                    backgroundColor: "transparent",
                    color: "#f3d675",
                    border: "1px solid rgba(243, 214, 117, 0.25)",
                    padding: isMobile ? "12px 16px" : "8px 16px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: isMobile ? "14px" : "14px",
                    order: isMobile ? 2 : 1,
                  }}
                >
                  {i18n("ipWhitelist.cancelButton")}
                </button>
                <button
                  onClick={handleAddIp}
                  style={{
                    backgroundColor: "#f3d675",
                    color: "#000000",
                    border: "none",
                    padding: isMobile ? "12px 16px" : "8px 16px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: isMobile ? "14px" : "14px",
                    order: isMobile ? 1 : 2,
                  }}
                >
                  {i18n("ipWhitelist.addButton")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Export Section */}
      <div
        style={{
          backgroundColor: "rgba(243, 214, 117, 0.05)",
          border: "1px solid rgba(243, 214, 117, 0.2)",
          borderRadius: "8px",
          padding: isMobile ? "16px" : "20px",
        }}
      >
        <h3
          style={{
            fontSize: isMobile ? "15px" : "16px",
            fontWeight: "bold",
            color: "#f3d675",
            marginBottom: "12px",
          }}
        >
          {i18n("export.title")}
        </h3>

        {successMessage && (
          <div
            style={{
              color: "green",
              marginBottom: "10px",
              padding: "8px",
              backgroundColor: "rgba(0, 128, 0, 0.1)",
              borderRadius: "4px",
              fontSize: isMobile ? "13px" : "14px",
            }}
          >
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div
            style={{
              color: "red",
              marginBottom: "10px",
              padding: "8px",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              borderRadius: "4px",
              fontSize: isMobile ? "13px" : "14px",
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Name of the list */}
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="listName"
            style={{
              display: "block",
              fontSize: isMobile ? "13px" : "14px",
              color: "#999999",
              marginBottom: "6px",
            }}
          >
            {i18n("export.listName")}
          </label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            style={{
              width: "100%",
              padding: isMobile ? "10px 12px" : "8px 12px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: isMobile ? "14px" : "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{
              fontSize: isMobile ? "13px" : "14px",
              color: "#999999",
              marginBottom: "6px",
            }}
          >
            {i18n("export.rotation")}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "10px" : "0",
            }}
          >
            {rotationOptions.map((option) => (
              <label
                key={option.value}
                style={{
                  marginRight: isMobile ? "0" : "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: isMobile ? "14px" : "14px",
                  color: "#f3d675",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="rotation"
                  value={option.value}
                  checked={rotation === option.value}
                  onChange={() => setRotation(option.value)}
                  style={
                    rotation === option.value ? radioCheckedStyle : radioStyle
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Rotation Period Dropdown - Only visible when Rotating is selected */}
        {rotation === "rotating" && (
          <div style={{ marginBottom: "16px" }} ref={rotationPeriodRef}>
            <label
              style={{
                display: "block",
                fontSize: isMobile ? "13px" : "14px",
                color: "#999999",
                marginBottom: "6px",
              }}
            >
              {i18n("export.choosePeriod")}
            </label>
            <div style={{ position: "relative" }}>
              {showCustomRotationInput ? (
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <input
                    type="number"
                    value={customRotationValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = Number.parseInt(value, 10);
                      if (
                        !isNaN(numValue) &&
                        numValue >= 1 &&
                        numValue <= 3600
                      ) {
                        setCustomRotationValue(value);
                        setRotationPeriod("custom");
                      } else if (value === "") {
                        setCustomRotationValue(value);
                      }
                    }}
                    min="1"
                    max="3600"
                    style={{
                      flex: 1,
                      padding: isMobile ? "10px 12px" : "8px 12px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "4px",
                      color: "#f3d675",
                      fontSize: isMobile ? "14px" : "14px",
                    }}
                    placeholder={i18n("export.customPeriodPlaceholder")}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomRotationInput(false);
                      setIsRotationPeriodOpen(true);
                    }}
                    style={{
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "4px",
                      color: "#f3d675",
                      padding: isMobile ? "10px" : "8px",
                      cursor: "pointer",
                      minWidth: isMobile ? "44px" : "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ChevronDown size={isMobile ? 20 : 16} color="#f3d675" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsRotationPeriodOpen(!isRotationPeriodOpen)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "10px 12px" : "8px 12px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "4px",
                    color: "#f3d675",
                    fontSize: isMobile ? "14px" : "14px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    minHeight: isMobile ? "44px" : "auto",
                  }}
                >
                  <span>
                    {rotationPeriod === "custom"
                      ? `${i18n(
                          "rotationPeriodOptions.custom"
                        )}: ${customRotationValue} seconds`
                      : rotationPeriodOptions.find(
                          (option) => option.value === rotationPeriod
                        )?.label || "Select period"}
                  </span>
                  {isRotationPeriodOpen ? (
                    <ChevronUp size={isMobile ? 20 : 16} color="#f3d675" />
                  ) : (
                    <ChevronDown size={isMobile ? 20 : 16} color="#f3d675" />
                  )}
                </button>
              )}

              {isRotationPeriodOpen && !showCustomRotationInput && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    backgroundColor: "#111111",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "4px",
                    marginTop: "4px",
                    zIndex: 10,
                    maxHeight: isMobile ? "200px" : "240px",
                    overflowY: "auto",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {rotationPeriodOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        if (option.value === "custom") {
                          setShowCustomRotationInput(true);
                          setIsRotationPeriodOpen(false);
                        } else {
                          setRotationPeriod(option.value);
                          setIsRotationPeriodOpen(false);
                        }
                      }}
                      style={{
                        padding: isMobile ? "12px" : "8px 12px",
                        color: "#f3d675",
                        cursor: "pointer",
                        fontSize: isMobile ? "14px" : "14px",
                        backgroundColor:
                          option.value === rotationPeriod
                            ? "rgba(243, 214, 117, 0.1)"
                            : "transparent",
                        borderBottom:
                          '1px solid rgba(243, 214214,117,0.1)" : "transparent',
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.15)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor =
                          option.value === rotationPeriod
                            ? "rgba(243, 214, 117, 0.1)"
                            : "transparent";
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {rotationPeriod === "custom" && (
              <p
                style={{
                  fontSize: isMobile ? "11px" : "12px",
                  color: "#999999",
                  marginTop: "4px",
                }}
              >
                {i18n("export.customPeriodHelp")}
              </p>
            )}
          </div>
        )}
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{
              fontSize: isMobile ? "13px" : "14px",
              color: "#999999",
              marginBottom: "6px",
            }}
          >
            {i18n("export.filter")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "12px" : "10px",
            }}
          >
            {/* Country dropdown with search */}
            <div>
              <label
                htmlFor="country"
                style={{
                  display: "block",
                  fontSize: isMobile ? "12px" : "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                {i18n("export.country")}
              </label>
              <div ref={countryDropdownRef} style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                  style={{
                    width: "100%",
                    padding: isMobile ? "10px 12px" : "8px 12px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "4px",
                    color: "#f3d675",
                    fontSize: isMobile ? "14px" : "14px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    minHeight: isMobile ? "44px" : "auto",
                  }}
                >
                  <span>
                    {country
                      ? countryOptions.find((c: any) => c.code === country)
                          ?.name || country
                      : i18n("selectOptions.selectCountry")}
                  </span>
                  {isCountryDropdownOpen ? (
                    <ChevronUp size={isMobile ? 20 : 16} color="#f3d675" />
                  ) : (
                    <ChevronDown size={isMobile ? 20 : 16} color="#f3d675" />
                  )}
                </button>

                {isCountryDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      backgroundColor: "#000000",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "4px",
                      marginTop: "4px",
                      zIndex: 10,
                      maxHeight: isMobile ? "250px" : "300px",
                      overflowY: "auto",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#000000",
                        zIndex: 1,
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          placeholder="Search..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          style={{
                            width: "100%",
                            padding: isMobile
                              ? "10px 12px 10px 32px"
                              : "8px 12px 8px 32px",
                            backgroundColor: "#111111",
                            border: "1px solid rgba(243, 214, 117, 0.2)",
                            borderRadius: "4px",
                            fontSize: isMobile ? "14px" : "14px",
                            color: "#f3d675",
                          }}
                        />
                        <Search
                          size={isMobile ? 18 : 16}
                          style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#f3d675",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      {filteredCountries.map((countryItem: any) => (
                        <div
                          key={countryItem.code}
                          onClick={() => {
                            setCountry(countryItem.code);
                            setIsCountryDropdownOpen(false);
                            setCountrySearch("");
                            // Reset dependent fields
                            setRegion("");
                            setCity("");
                            setIsp("");
                          }}
                          style={{
                            padding: isMobile ? "12px" : "10px 12px",
                            cursor: "pointer",
                            color: "#f3d675",
                            borderBottom: "1px solid rgba(243, 214, 117, 0.05)",
                            backgroundColor:
                              country === countryItem.code
                                ? "rgba(243, 214, 117, 0.1)"
                                : "transparent",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "rgba(243, 214, 117, 0.15)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor =
                              country === countryItem.code
                                ? "rgba(243, 214, 117, 0.1)"
                                : "transparent";
                          }}
                        >
                          {countryItem.name}
                        </div>
                      ))}
                      {filteredCountries.length === 0 && (
                        <div
                          style={{
                            padding: "10px 12px",
                            color: "#999999",
                            textAlign: "center",
                          }}
                        >
                          No results found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {isLoadingGeo && (
                <p
                  style={{
                    fontSize: isMobile ? "10px" : "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  {i18n("selectOptions.loadingCountries")}
                </p>
              )}
              {isErrorGeo && (
                <p
                  style={{
                    fontSize: isMobile ? "10px" : "10px",
                    color: "red",
                    marginTop: "4px",
                  }}
                >
                  {i18n("errors.geoDataError")}
                </p>
              )}
            </div>

            {/* Region dropdown - dependent on country selection */}
            <div>
              <label
                htmlFor="region"
                style={{
                  display: "block",
                  fontSize: isMobile ? "12px" : "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                {i18n("export.region")}
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  width: "100%",
                  padding: isMobile ? "10px 12px" : "6px 8px",
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: isMobile ? "14px" : "14px",
                  minHeight: isMobile ? "44px" : "auto",
                  appearance: isMobile ? "none" : "auto",
                  backgroundImage: isMobile
                    ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f3d675' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")"
                    : "none",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 8px center",
                  backgroundSize: "16px",
                }}
                disabled={!country || isLoadingGeo}
                className="dark-select"
              >
                <option value="">{i18n("selectOptions.selectRegion")}</option>
                {regions.map((regionItem: any) => (
                  <option key={regionItem.code} value={regionItem.name}>
                    {regionItem.name}
                  </option>
                ))}
              </select>
              {country && regions.length === 0 && !isLoadingGeo && (
                <p
                  style={{
                    fontSize: isMobile ? "10px" : "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  {i18n("selectOptions.noRegions")}
                </p>
              )}
            </div>

            {/* City dropdown - dependent on region selection */}
            <div>
              <label
                htmlFor="city"
                style={{
                  display: "block",
                  fontSize: isMobile ? "12px" : "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                {i18n("export.city")}
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: "100%",
                  padding: isMobile ? "10px 12px" : "6px 8px",
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: isMobile ? "14px" : "14px",
                  minHeight: isMobile ? "44px" : "auto",
                  appearance: isMobile ? "none" : "auto",
                  backgroundImage: isMobile
                    ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f3d675' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")"
                    : "none",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 8px center",
                  backgroundSize: "16px",
                }}
                disabled={!region || isLoadingGeo}
                className="dark-select"
              >
                <option value="">{i18n("selectOptions.selectCity")}</option>
                {cities.map((cityItem: any, index: number) => (
                  <option key={index} value={cityItem.name}>
                    {cityItem.name}
                  </option>
                ))}
              </select>
              {region && cities.length === 0 && !isLoadingGeo && (
                <p
                  style={{
                    fontSize: isMobile ? "10px" : "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  {i18n("selectOptions.noCities")}
                </p>
              )}
            </div>

            {/* ISP dropdown */}
            <div>
              <label
                htmlFor="isp"
                style={{
                  display: "block",
                  fontSize: isMobile ? "12px" : "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                {i18n("export.isp")}
              </label>
              <select
                id="isp"
                value={isp}
                onChange={(e) => setIsp(e.target.value)}
                style={{
                  width: "100%",
                  padding: isMobile ? "10px 12px" : "6px 8px",
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: isMobile ? "14px" : "14px",
                  minHeight: isMobile ? "44px" : "auto",
                  appearance: isMobile ? "none" : "auto",
                  backgroundImage: isMobile
                    ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f3d675' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")"
                    : "none",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 8px center",
                  backgroundSize: "16px",
                }}
                disabled={!city || availableIsps.length === 0}
                className="dark-select"
              >
                <option value="">{i18n("selectOptions.selectIsp")}</option>
                {availableIsps.map((ispItem: string, index: number) => (
                  <option key={index} value={ispItem}>
                    {ispItem}
                  </option>
                ))}
              </select>
              {city && availableIsps.length === 0 && !isLoadingGeo && (
                <p
                  style={{
                    fontSize: isMobile ? "10px" : "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  {i18n("selectOptions.noIsps")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Ports */}
        <div>
          <label
            htmlFor="ports"
            style={{
              display: "block",
              fontSize: isMobile ? "12px" : "12px",
              color: "#999999",
              marginBottom: "4px",
            }}
          >
            {i18n("export.ports")}
          </label>
          <input
            type="number"
            id="ports"
            value={ports}
            onChange={(e) => setPorts(e.target.value)}
            style={{
              width: "100%",
              padding: isMobile ? "10px 12px" : "6px 8px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: isMobile ? "14px" : "14px",
              minHeight: isMobile ? "44px" : "auto",
            }}
          />
          <p
            style={{
              fontSize: isMobile ? "10px" : "10px",
              color: "#999999",
              marginTop: "4px",
            }}
          >
            {i18n("export.portsMax")}
          </p>
        </div>
      </div>

      {/* Output Section - Placeholder */}
      <div
        style={{
          textAlign: "left",
          marginTop: isMobile ? "16px" : "20px",
          gridColumn: isMobile ? "1" : "1 / span 2",
        }}
      >
        <button
          style={{
            backgroundColor: "#f3d675",
            color: "#000000",
            border: "none",
            padding: isMobile ? "12px 16px" : "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: isMobile ? "14px" : "14px",
            fontWeight: "500",
            width: isMobile ? "100%" : "auto",
          }}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending
            ? i18n("export.creatingButton")
            : i18n("export.createButton")}
        </button>
      </div>
    </div>
  );
};
