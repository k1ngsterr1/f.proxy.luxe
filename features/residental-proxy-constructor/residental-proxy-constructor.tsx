"use client";

import { useState } from "react";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { apiClient } from "@/shared/config/apiClient";

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

export const ResidentProxyConstructor = () => {
  const [listName, setListName] = useState("");
  const [rotation, setRotation] = useState("general");
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const payload = {
        package_key: "5d6e4e4ed8e2048633b0",
        ports: Number(ports),
        whitelist: whitelist.join(";"),
        title: listName,
        rotation: rotation === "general" ? 0 : rotation === "sticky" ? 1 : 2,
      };

      const response = await apiClient.post(
        "/api/v1/products/modify-proxy/resident",
        payload
      );

      if (response.status === 200) {
        setSuccessMessage("Proxy settings updated successfully!");
      } else {
        setErrorMessage(
          `Failed to update proxy settings. Status: ${response.status}`
        );
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
        {showAddIpPopup && (
          <>
            <div
              onClick={handleCancelAddIp}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                zIndex: 999,
              }}
            />
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
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "6px" }}
          >
            Authorization method:
          </p>
          {[
            { label: "Username & password", value: "username" },
            { label: "IP addresses", value: "ip" },
          ].map((option) => (
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
                name="authMethod"
                value={option.value}
                checked={authMethod === option.value}
                onChange={() => setAuthMethod(option.value)}
                style={
                  authMethod === option.value ? radioCheckedStyle : radioStyle
                }
              />
              {option.label}
            </label>
          ))}
        </div>
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "6px" }}
          >
            Export format:
          </p>
          {[
            { label: "File", value: "file" },
            { label: "Link", value: "link" },
          ].map((option) => (
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
                name="exportFormat"
                value={option.value}
                checked={exportFormat === option.value}
                onChange={() => setExportFormat(option.value)}
                style={
                  exportFormat === option.value ? radioCheckedStyle : radioStyle
                }
              />
              {option.label}
            </label>
          ))}
        </div>
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
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
              >
                <option value="">Select country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
              </select>
            </div>
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
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
              >
                <option value="">Select region</option>
                <option value="ny">New York</option>
                <option value="on">Ontario</option>
              </select>
            </div>
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
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
              >
                <option value="">Select city</option>
                <option value="ny">New York</option>
                <option value="to">Toronto</option>
              </select>
            </div>
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
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
              >
                <option value="">Select ISP</option>
                <option value="verizon">Verizon</option>
                <option value="rogers">Rogers</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
        </div>
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
      <div style={{ textAlign: "center", marginTop: "20px" }}>
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
            marginRight: "10px",
          }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};
