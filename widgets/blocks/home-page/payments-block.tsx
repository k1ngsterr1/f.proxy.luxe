"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Bitcoin, Wallet, Shield, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export const PaymentMethodsBlock = () => {
  const t = useTranslations("paymentsBlock");

  // Define payment methods with translations
  const paymentMethods = [
    {
      id: "visa-mastercard",
      name: t("methods.visa-mastercard.name"),
      icon: "/images/payment/visa-mastercard.png",
      description: t("methods.visa-mastercard.description"),
    },
    {
      id: "payeer",
      name: t("methods.payeer.name"),
      icon: "/images/payment/payeer.png",
      description: t("methods.payeer.description"),
    },
    {
      id: "bitcoin",
      name: t("methods.bitcoin.name"),
      icon: "/images/payment/bitcoin.png",
      description: t("methods.bitcoin.description"),
    },
    {
      id: "webmoney",
      name: t("methods.webmoney.name"),
      icon: "/images/payment/webmoney.png",
      description: t("methods.webmoney.description"),
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after component mounts for animation
    setIsVisible(true);
    // Set default payment method
    setSelectedMethod("visa-mastercard");
  }, []);

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  return (
    <section className="payment-methods-section">
      <div
        className="payment-container"
        style={{
          backgroundColor: "#0A0A0A",
          borderRadius: "12px",
          border: "1px solid rgba(243, 214, 117, 0.2)",
          padding: "40px 0",
          maxWidth: "1200px",
          margin: "60px auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "3px",
            background:
              "linear-gradient(90deg, rgba(243, 214, 117, 0) 0%, rgba(243, 214, 117, 1) 50%, rgba(243, 214, 117, 0) 100%)",
          }}
        />

        <div className="container" style={{ padding: "0 20px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {t("title.first")}{" "}
            <span style={{ color: "#f3d675" }}>{t("title.second")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "16px",
              color: "#999999",
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto 40px",
            }}
          >
            {t("description")}
          </motion.p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                onClick={() => handleMethodSelect(method.id)}
                style={{
                  backgroundColor:
                    selectedMethod === method.id
                      ? "rgba(243, 214, 117, 0.15)"
                      : "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: `1px solid ${
                    selectedMethod === method.id
                      ? "rgba(243, 214, 117, 0.5)"
                      : "rgba(243, 214, 117, 0.1)"
                  }`,
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{
                  backgroundColor: "rgba(243, 214, 117, 0.15)",
                  borderColor: "rgba(243, 214, 117, 0.5)",
                  transform: "translateY(-5px)",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 10px 0 rgba(243, 214, 117, 0.1)",
                }}
              >
                {method.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#f3d675",
                      color: "#000000",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "20px",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("popular")}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "40px",
                      position: "relative",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                    }}
                  >
                    {/* Fallback icons if images aren't available */}
                    {method.id === "visa-mastercard" && (
                      <CreditCard size={24} color="#f3d675" />
                    )}
                    {method.id === "bitcoin" && (
                      <Bitcoin size={24} color="#f3d675" />
                    )}
                    {method.id === "payeer" && (
                      <Wallet size={24} color="#f3d675" />
                    )}
                    {method.id === "webmoney" && (
                      <Wallet size={24} color="#f3d675" />
                    )}

                    {/* Uncomment this when you have actual images */}
                    {/* <Image 
                      src={method.icon || "/placeholder.svg"} 
                      alt={method.name} 
                      fill 
                      style={{ objectFit: "contain", padding: "5px" }} 
                    /> */}
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "#FFFFFF",
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "4px",
                      }}
                    >
                      {method.name}
                    </h3>
                    <p
                      style={{ color: "#999999", fontSize: "12px", margin: 0 }}
                    >
                      {method.description}
                    </p>
                  </div>
                </div>

                {/* Selected indicator */}
                {selectedMethod === method.id && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#f3d675",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <CheckCircle size={16} style={{ marginRight: "6px" }} />
                    {t("selected")}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Security badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              flexWrap: "wrap",
              padding: "20px",
              backgroundColor: "rgba(243, 214, 117, 0.03)",
              borderRadius: "8px",
              border: "1px solid rgba(243, 214, 117, 0.1)",
              margin: "0 auto",
              maxWidth: "800px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield size={20} color="#f3d675" />
              <span style={{ color: "#CCCCCC", fontSize: "14px" }}>
                {t("security.secure")}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield size={20} color="#f3d675" />
              <span style={{ color: "#CCCCCC", fontSize: "14px" }}>
                {t("security.encrypted")}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield size={20} color="#f3d675" />
              <span style={{ color: "#CCCCCC", fontSize: "14px" }}>
                {t("security.support")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Gold accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: "3px",
            background:
              "linear-gradient(90deg, rgba(243, 214, 117, 0) 0%, rgba(243, 214, 117, 1) 50%, rgba(243, 214, 117, 0) 100%)",
          }}
        />
      </div>
    </section>
  );
};
