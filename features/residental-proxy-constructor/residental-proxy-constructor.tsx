"use client";
import React from "react";

import { useState, useCallback, useEffect, useRef } from "react";
import { Plus, X, Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useGetGeoReferences } from "@/entities/geo/hooks/queries/use-get-references.query";
import { useModifyResidentProxy } from "@/entities/residental-proxy/api/hooks/mutations/use-modify-resident-proxy.mutation";

// Update the rotationPeriodOptions array to include a custom option
const rotationPeriodOptions = [
  { label: "For each request", value: "each_request" },
  { label: "5 minutes", value: "300" },
  { label: "10 minutes", value: "600" },
  { label: "15 minutes", value: "900" },
  { label: "20 minutes", value: "1200" },
  { label: "60 minutes", value: "3600" },
  { label: "Custom", value: "custom" },
];

const rotationOptions = [
  { label: "General", value: "general" },
  { label: "Sticky", value: "sticky" },
  { label: "Rotating", value: "rotating" },
];

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

const selectOptionStyle = {
  backgroundColor: "#111111",
  color: "#f3d675",
};

export const ResidentProxyConstructor = ({
  package_key,
}: {
  package_key: string;
}) => {
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
  // Move these state declarations inside the component
  const [customRotationValue, setCustomRotationValue] = useState("300");
  const [showCustomRotationInput, setShowCustomRotationInput] = useState(false);
  const { mutate: modifyProxy, isPending } = useModifyResidentProxy();

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

  // Update the handleSubmit function to use the custom rotation value
  const handleSubmit = () => {
    setSuccessMessage(null);
    setErrorMessage(null);

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
          setErrorMessage(
            "Custom rotation period must be between 1 and 3600 seconds"
          );
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
        setSuccessMessage("Proxy settings updated successfully!");
      },
      onError: (error: any) => {
        setErrorMessage(error?.message || "An unexpected error occurred.");
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
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        backgroundColor: "#000000",
        color: "#FFFFFF",
        padding: "20px",
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
          padding: "20px",
          position: "relative",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#f3d675",
            marginBottom: "12px",
          }}
        >
          IP Whitelist:
        </h3>
        {whitelist.length === 0 ? (
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "16px" }}
          >
            You have not added any IPs yet
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
                  padding: "8px 12px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  color: "#f3d675",
                }}
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editIp}
                    onChange={(e) => setEditIp(e.target.value)}
                    style={{
                      width: "70%",
                      padding: "6px 8px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "4px",
                      color: "#f3d675",
                      fontSize: "14px",
                    }}
                  />
                ) : (
                  <span>{ip}</span>
                )}
                <div>
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() => handleUpdateIp(index)}
                        style={{
                          backgroundColor: "#f3d675",
                          color: "#000000",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500",
                          marginRight: "5px",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        style={{
                          backgroundColor: "transparent",
                          color: "#f3d675",
                          border: "1px solid rgba(243, 214, 117, 0.2)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        Cancel
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
                        }}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteIp(index)}
                        style={{
                          backgroundColor: "transparent",
                          color: "#f3d675",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        <Trash2 size={16} />
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
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onClick={() => setShowAddIpPopup(true)}
        >
          <Plus size={16} style={{ marginRight: "8px" }} />
          Add
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
                padding: "24px",
                zIndex: 1000,
                width: "90%",
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
                  top: "10px",
                  right: "12px",
                  background: "none",
                  border: "none",
                  color: "#f3d675",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: "16px",
                }}
              >
                Add Whitelisted IP
              </h4>

              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="e.g. 123.123.123.123"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "6px",
                  color: "#f3d675",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  onClick={handleAddIp}
                  style={{
                    backgroundColor: "#f3d675",
                    color: "#000000",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Add
                </button>
                <button
                  onClick={handleCancelAddIp}
                  style={{
                    backgroundColor: "transparent",
                    color: "#f3d675",
                    border: "1px solid rgba(243, 214, 117, 0.25)",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Cancel
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
          padding: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#f3d675",
            marginBottom: "12px",
          }}
        >
          Export
        </h3>

        {successMessage && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}

        {/* Name of the list */}
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="listName"
            style={{
              display: "block",
              fontSize: "14px",
              color: "#999999",
              marginBottom: "6px",
            }}
          >
            Name of the list
          </label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "6px" }}
          >
            Rotation:
          </p>
          {rotationOptions.map((option) => (
            <label
              key={option.value}
              style={{
                marginRight: "16px",
                display: "inline-flex",
                alignItems: "center",
                fontSize: "14px",
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

        {/* Rotation Period Dropdown - Only visible when Rotating is selected */}
        {rotation === "rotating" && (
          <div style={{ marginBottom: "16px" }} ref={rotationPeriodRef}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                color: "#999999",
                marginBottom: "6px",
              }}
            >
              Choose period:
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
                      padding: "8px 12px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "4px",
                      color: "#f3d675",
                      fontSize: "14px",
                    }}
                    placeholder="Enter seconds (1-3600)"
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
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <ChevronDown size={16} color="#f3d675" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsRotationPeriodOpen(!isRotationPeriodOpen)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "4px",
                    color: "#f3d675",
                    fontSize: "14px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    {rotationPeriod === "custom"
                      ? `Custom: ${customRotationValue} seconds`
                      : rotationPeriodOptions.find(
                          (option) => option.value === rotationPeriod
                        )?.label || "Select period"}
                  </span>
                  {isRotationPeriodOpen ? (
                    <ChevronUp size={16} color="#f3d675" />
                  ) : (
                    <ChevronDown size={16} color="#f3d675" />
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
                    maxHeight: "240px",
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
                        padding: "8px 12px",
                        color: "#f3d675",
                        cursor: "pointer",
                        fontSize: "14px",
                        backgroundColor:
                          option.value === rotationPeriod
                            ? "rgba(243, 214, 117, 0.1)"
                            : "transparent",
                        borderBottom: "1px solid rgba(243, 214, 117, 0.05)",
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
                style={{ fontSize: "12px", color: "#999999", marginTop: "4px" }}
              >
                Enter a value between 1 and 3600 seconds (60 minutes)
              </p>
            )}
          </div>
        )}
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "6px" }}
          >
            Filter:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {/* Country dropdown with dynamic data */}
            <div>
              <label
                htmlFor="country"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                Country:
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
                disabled={isLoadingGeo}
                className="dark-select"
              >
                <option value="">Select country</option>
                {countries.map((countryItem: any) => (
                  <option key={countryItem.code} value={countryItem.code}>
                    {countryItem.name}
                  </option>
                ))}
              </select>
              {isLoadingGeo && (
                <p
                  style={{
                    fontSize: "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  Loading countries...
                </p>
              )}
              {isErrorGeo && (
                <p style={{ fontSize: "10px", color: "red", marginTop: "4px" }}>
                  Error loading geo data
                </p>
              )}
            </div>

            {/* Region dropdown - dependent on country selection */}
            <div>
              <label
                htmlFor="region"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                Region:
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
                disabled={!country || isLoadingGeo}
                className="dark-select"
              >
                <option value="">Select region</option>
                {regions.map((regionItem: any) => (
                  <option key={regionItem.code} value={regionItem.name}>
                    {regionItem.name}
                  </option>
                ))}
              </select>
              {country && regions.length === 0 && !isLoadingGeo && (
                <p
                  style={{
                    fontSize: "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  No regions available
                </p>
              )}
            </div>

            {/* City dropdown - dependent on region selection */}
            <div>
              <label
                htmlFor="city"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                City:
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
                disabled={!region || isLoadingGeo}
                className="dark-select"
              >
                <option value="">Select city</option>
                {cities.map((cityItem: any, index: number) => (
                  <option key={index} value={cityItem.name}>
                    {cityItem.name}
                  </option>
                ))}
              </select>
              {region && cities.length === 0 && !isLoadingGeo && (
                <p
                  style={{
                    fontSize: "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  No cities available
                </p>
              )}
            </div>

            {/* ISP dropdown */}
            <div>
              <label
                htmlFor="isp"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#999999",
                  marginBottom: "4px",
                }}
              >
                ISP:
              </label>
              <select
                id="isp"
                value={isp}
                onChange={(e) => setIsp(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
                disabled={!city || availableIsps.length === 0}
                className="dark-select"
              >
                <option value="">Select ISP</option>
                {availableIsps.map((ispItem: string, index: number) => (
                  <option key={index} value={ispItem}>
                    {ispItem}
                  </option>
                ))}
              </select>
              {city && availableIsps.length === 0 && !isLoadingGeo && (
                <p
                  style={{
                    fontSize: "10px",
                    color: "#999999",
                    marginTop: "4px",
                  }}
                >
                  No ISPs available
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
              fontSize: "12px",
              color: "#999999",
              marginBottom: "4px",
            }}
          >
            Ports:
          </label>
          <input
            type="number"
            id="ports"
            value={ports}
            onChange={(e) => setPorts(e.target.value)}
            style={{
              width: "100%",
              padding: "6px 8px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
            }}
          />
          <p style={{ fontSize: "10px", color: "#999999", marginTop: "4px" }}>
            max. 1k
          </p>
        </div>
      </div>

      {/* Output Section - Placeholder */}
      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "#f3d675",
            color: "#000000",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};
