"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export const ResidentProxyConstructor = () => {
  const [listName, setListName] = useState("");
  const [rotation, setRotation] = useState("general");
  const [authMethod, setAuthMethod] = useState("username");
  const [exportFormat, setExportFormat] = useState("link");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [isp, setIsp] = useState("");
  const [ports, setPorts] = useState("1");
  const [showAddIpPopup, setShowAddIpPopup] = useState(false);
  const [newIp, setNewIp] = useState("");
  const [whitelist, setWhitelist] = useState<string[]>([]);

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
          <ul>
            {whitelist.map((ip, index) => (
              <li key={index} style={{ color: "#f3d675" }}>
                {ip}
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
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              position: "fixed",
              top: "50%",
              left: "50%",
              backgroundColor: "#111111",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "8px",
              padding: "20px",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "none",
                border: "none",
                color: "#f3d675",
                cursor: "pointer",
              }}
              onClick={handleCancelAddIp}
            >
              <X size={16} />
            </button>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#f3d675",
                marginBottom: "16px",
              }}
            >
              Add IP:
            </h4>
            <input
              type="text"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              placeholder="123.123.112.31"
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                color: "#f3d675",
                fontSize: "14px",
                marginBottom: "16px",
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
                onClick={handleAddIp}
              >
                Add
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#f3d675",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                onClick={handleCancelAddIp}
              >
                Cancel
              </button>
            </div>
          </div>
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

        {/* Rotation */}
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "6px" }}
          >
            Rotation:
          </p>
          <label style={{ marginRight: "12px" }}>
            <input
              type="radio"
              value="general"
              checked={rotation === "general"}
              onChange={() => setRotation("general")}
            />
            General
          </label>
          <label style={{ marginRight: "12px" }}>
            <input
              type="radio"
              value="sticky"
              checked={rotation === "sticky"}
              onChange={() => setRotation("sticky")}
            />
            Sticky
          </label>
          <label>
            <input
              type="radio"
              value="rotating"
              checked={rotation === "rotating"}
              onChange={() => setRotation("rotating")}
            />
            Rotating
          </label>
        </div>

        {/* Authorization method */}
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "6px" }}
          >
            Authorization method:
          </p>
          <label style={{ marginRight: "12px" }}>
            <input
              type="radio"
              value="username"
              checked={authMethod === "username"}
              onChange={() => setAuthMethod("username")}
            />
            Username & password
          </label>
          <label>
            <input
              type="radio"
              value="ip"
              checked={authMethod === "ip"}
              onChange={() => setAuthMethod("ip")}
            />
            IP addresses
          </label>
        </div>

        {/* Export format */}
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{ fontSize: "14px", color: "#999999", marginBottom: "6px" }}
          >
            Export format:
          </p>
          <label style={{ marginRight: "12px" }}>
            <input
              type="radio"
              value="file"
              checked={exportFormat === "file"}
              onChange={() => setExportFormat("file")}
            />
            File
          </label>
          <label>
            <input
              type="radio"
              value="link"
              checked={exportFormat === "link"}
              onChange={() => setExportFormat("link")}
            />
            Link
          </label>
        </div>

        {/* Filter */}
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
                {/* Add more options as needed */}
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
                {/* Add more options as needed */}
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
                {/* Add more options as needed */}
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
        >
          Change plan
        </button>
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
        >
          Create
        </button>
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
        >
          Create api tools
        </button>
      </div>
    </div>
  );
};
