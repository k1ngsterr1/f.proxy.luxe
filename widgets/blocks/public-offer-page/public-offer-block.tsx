"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronUp, Copy, Check, FileText, Menu, X } from "lucide-react";
import Link from "next/link";

export default function PublicOfferPage() {
  const locale = useLocale();
  const i18n = useTranslations("publicOffer");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      // Close sidebar on mobile after clicking a section
      setSidebarOpen(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if the screen is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <main
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        minHeight: "100vh",
        paddingTop: isMobile ? "30px" : "50px",
        paddingBottom: isMobile ? "30px" : "50px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: isMobile ? "30px" : "40px",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: "bold",
              color: "#f3d675",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <FileText size={isMobile ? 22 : 28} />
            {i18n("header")}
          </h1>
          <p
            style={{
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: "1.6",
              color: "#CCCCCC",
              marginBottom: isMobile ? "24px" : "32px",
              maxWidth: "800px",
            }}
          >
            {i18n("introduction")}
          </p>
        </div>

        {/* Mobile Sidebar Toggle */}
        {isMobile && (
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(243, 214, 117, 0.1)",
                border: "none",
                color: "#f3d675",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              <span>{i18n("tableOfContents")}</span>
            </button>
          </div>
        )}

        {/* Content layout */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "24px" : "40px",
          }}
        >
          {/* Mobile Sidebar Overlay */}
          {isMobile && sidebarOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                zIndex: 1000,
                padding: "20px",
                paddingTop: "60px",
                overflowY: "auto",
              }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  color: "#f3d675",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={24} />
              </button>

              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  padding: "20px",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#f3d675",
                    marginBottom: "16px",
                  }}
                >
                  {i18n("tableOfContents")}
                </h2>
                <nav>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[...Array(11)].map((_, index) => (
                      <li
                        key={`mobile-section${index + 1}`}
                        style={{
                          marginBottom: "12px",
                          borderBottom:
                            index < 10
                              ? "1px solid rgba(243, 214, 117, 0.1)"
                              : "none",
                          paddingBottom: "12px",
                        }}
                      >
                        <button
                          onClick={() => scrollToSection(`section${index + 1}`)}
                          style={{
                            background: "none",
                            border: "none",
                            color:
                              activeSection === `section${index + 1}`
                                ? "#f3d675"
                                : "#FFFFFF",
                            fontSize: "14px",
                            textAlign: "left",
                            cursor: "pointer",
                            padding: "0",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "color 0.2s",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              backgroundColor:
                                activeSection === `section${index + 1}`
                                  ? "rgba(243, 214, 117, 0.2)"
                                  : "rgba(255, 255, 255, 0.1)",
                              color:
                                activeSection === `section${index + 1}`
                                  ? "#f3d675"
                                  : "#FFFFFF",
                              fontSize: "12px",
                              fontWeight: "bold",
                              flexShrink: 0,
                            }}
                          >
                            {index + 1}
                          </span>
                          {i18n(`section${index + 1}.title`)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div
                  style={{
                    marginTop: "24px",
                    padding: "16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#CCCCCC",
                  }}
                >
                  <p style={{ marginBottom: "12px" }}>
                    {i18n("needHelp.question")}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Link
                      href="/contacts"
                      style={{
                        color: "#f3d675",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {i18n("needHelp.contactUs")}
                    </Link>
                    <Link
                      href="/faq"
                      style={{
                        color: "#f3d675",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {i18n("needHelp.faq")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          {!isMobile && (
            <aside
              style={{
                position: "sticky",
                top: "100px",
                height: "fit-content",
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                borderRadius: "8px",
                padding: "24px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                width: "280px",
                flexShrink: 0,
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: "16px",
                }}
              >
                {i18n("tableOfContents")}
              </h2>
              <nav>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[...Array(11)].map((_, index) => (
                    <li
                      key={`section${index + 1}`}
                      style={{
                        marginBottom: "12px",
                        borderBottom:
                          index < 10
                            ? "1px solid rgba(243, 214, 117, 0.1)"
                            : "none",
                        paddingBottom: "12px",
                      }}
                    >
                      <button
                        onClick={() => scrollToSection(`section${index + 1}`)}
                        style={{
                          background: "none",
                          border: "none",
                          color:
                            activeSection === `section${index + 1}`
                              ? "#f3d675"
                              : "#FFFFFF",
                          fontSize: "14px",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: "0",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "color 0.2s",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor:
                              activeSection === `section${index + 1}`
                                ? "rgba(243, 214, 117, 0.2)"
                                : "rgba(255, 255, 255, 0.1)",
                            color:
                              activeSection === `section${index + 1}`
                                ? "#f3d675"
                                : "#FFFFFF",
                            fontSize: "12px",
                            fontWeight: "bold",
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </span>
                        {i18n(`section${index + 1}.title`)}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                style={{
                  marginTop: "24px",
                  padding: "16px",
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#CCCCCC",
                }}
              >
                <p style={{ marginBottom: "12px" }}>
                  {i18n("needHelp.question")}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Link
                    href="/contacts"
                    style={{
                      color: "#f3d675",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {i18n("needHelp.contactUs")}
                  </Link>
                  <Link
                    href="/faq"
                    style={{
                      color: "#f3d675",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {i18n("needHelp.faq")}
                  </Link>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {/* Section 1 */}
            <section
              ref={(el: any) => (sectionRefs.current.section1 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  I
                </span>
                {i18n("section1.title")}
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? "14px" : "16px",
                    lineHeight: "1.6",
                    color: "#FFFFFF",
                    paddingRight: isMobile ? "30px" : "0",
                  }}
                >
                  {i18n("section1.point1")}
                </p>
                <button
                  onClick={() => copyToClipboard(i18n("section1.point1"))}
                  style={{
                    background: "none",
                    border: "none",
                    color: copied ? "#4CAF50" : "#f3d675",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    flexShrink: 0,
                  }}
                  title={i18n("copyText")}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  borderRadius: "8px",
                  padding: isMobile ? "12px" : "16px",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? "12px" : "14px",
                    lineHeight: "1.6",
                    color: "#CCCCCC",
                    marginBottom: "12px",
                  }}
                >
                  {i18n("section1.point2")}
                </p>
                <p
                  style={{
                    fontSize: isMobile ? "12px" : "14px",
                    lineHeight: "1.6",
                    color: "#CCCCCC",
                    marginBottom: "12px",
                  }}
                >
                  {i18n("section1.point3")}
                </p>
                <p
                  style={{
                    fontSize: isMobile ? "12px" : "14px",
                    lineHeight: "1.6",
                    color: "#CCCCCC",
                    marginBottom: "12px",
                  }}
                >
                  {i18n("section1.point4")}
                </p>
                <p
                  style={{
                    fontSize: isMobile ? "12px" : "14px",
                    lineHeight: "1.6",
                    color: "#CCCCCC",
                  }}
                >
                  {i18n("section1.point5")}
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section
              ref={(el: any) => (sectionRefs.current.section2 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  II
                </span>
                {i18n("section2.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section2.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section2.point2")}
              </p>

              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  padding: isMobile ? "12px" : "16px",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: isMobile ? "14px" : "16px",
                    fontWeight: "600",
                    color: "#f3d675",
                    marginBottom: "12px",
                  }}
                >
                  {i18n("section2.listTitle")}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section2.list.item1")}
                  </li>
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section2.list.item2")}
                  </li>
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section2.list.item3")}
                  </li>
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section2.list.item4")}
                  </li>
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section2.list.item5")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section
              ref={(el: any) => (sectionRefs.current.section3 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  III
                </span>
                {i18n("section3.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section3.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section3.point2")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section3.point3")}
              </p>
            </section>

            {/* Section 4 */}
            <section
              ref={(el: any) => (sectionRefs.current.section4 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  IV
                </span>
                {i18n("section4.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section4.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section4.point2")}
              </p>

              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  padding: isMobile ? "12px" : "16px",
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section4.list.item1")}
                  </li>
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section4.list.item2")}
                  </li>
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section4.list.item3")}
                  </li>
                  <li
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#f3d675",
                        display: "inline-block",
                      }}
                    ></span>
                    {i18n("section4.list.item4")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section
              ref={(el: any) => (sectionRefs.current.section5 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  V
                </span>
                {i18n("section5.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section5.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section5.point2")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                }}
              >
                {i18n("section5.point3")}
              </p>
            </section>

            {/* Section 6 */}
            <section
              ref={(el: any) => (sectionRefs.current.section6 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  VI
                </span>
                {i18n("section6.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section6.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                }}
              >
                {i18n("section6.point2")}
              </p>
            </section>

            {/* Section 7 */}
            <section
              ref={(el: any) => (sectionRefs.current.section7 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  VII
                </span>
                {i18n("section7.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                }}
              >
                {i18n("section7.point1")}
              </p>
            </section>

            {/* Section 8 */}
            <section
              ref={(el: any) => (sectionRefs.current.section8 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  VIII
                </span>
                {i18n("section8.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section8.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section8.point2")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                }}
              >
                {i18n("section8.point3")}
              </p>
            </section>

            {/* Section 9 */}
            <section
              ref={(el: any) => (sectionRefs.current.section9 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  IX
                </span>
                {i18n("section9.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section9.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section9.point2")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                }}
              >
                {i18n("section9.point3")}
              </p>
            </section>

            {/* Section 10 */}
            <section
              ref={(el: any) => (sectionRefs.current.section10 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.03)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  X
                </span>
                {i18n("section10.title")}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section10.point1")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                {i18n("section10.point2")}
              </p>

              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                }}
              >
                {i18n("section10.point3")}
              </p>
            </section>

            {/* Section 11 - Company Details */}
            <section
              ref={(el: any) => (sectionRefs.current.section11 = el)}
              style={{
                marginBottom: isMobile ? "30px" : "40px",
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                borderRadius: "8px",
                padding: isMobile ? "20px" : "24px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: isMobile ? "20px" : "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "28px" : "32px",
                    height: isMobile ? "28px" : "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(243, 214, 117, 0.2)",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  XI
                </span>
                {i18n("section11.title")}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "8px",
                    padding: isMobile ? "12px" : "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#CCCCCC",
                      marginBottom: "8px",
                    }}
                  >
                    <strong style={{ color: "#f3d675" }}>
                      {i18n("section11.website")}:
                    </strong>{" "}
                    proxy.luxe
                  </p>
                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#CCCCCC",
                      marginBottom: "8px",
                    }}
                  >
                    <strong style={{ color: "#f3d675" }}>
                      {i18n("section11.name")}:
                    </strong>{" "}
                    {i18n("section11.fullName")}
                  </p>
                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#CCCCCC",
                      marginBottom: "8px",
                    }}
                  >
                    <strong style={{ color: "#f3d675" }}>
                      {i18n("section11.inn")}:
                    </strong>{" "}
                    590621469075
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "8px",
                    padding: isMobile ? "12px" : "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#CCCCCC",
                      marginBottom: "8px",
                    }}
                  >
                    <strong style={{ color: "#f3d675" }}>
                      {i18n("section11.phone")}:
                    </strong>{" "}
                    +79155472727
                  </p>
                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#CCCCCC",
                      marginBottom: "8px",
                    }}
                  >
                    <strong style={{ color: "#f3d675" }}>
                      {i18n("section11.email")}:
                    </strong>{" "}
                    admin@proxy.luxe
                  </p>
                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.6",
                      color: "#CCCCCC",
                    }}
                  >
                    <strong style={{ color: "#f3d675" }}>
                      {i18n("section11.telegram")}:
                    </strong>{" "}
                    <a
                      href="https://t.me/andreyproxy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#f3d675",
                        textDecoration: "none",
                      }}
                    >
                      @andreyproxy
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: isMobile ? "20px" : "30px",
            right: isMobile ? "20px" : "30px",
            width: isMobile ? "40px" : "50px",
            height: isMobile ? "40px" : "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(243, 214, 117, 0.2)",
            border: "1px solid rgba(243, 214, 117, 0.5)",
            color: "#f3d675",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 100,
            transition: "all 0.3s ease",
          }}
          aria-label="Back to top"
        >
          <ChevronUp size={isMobile ? 20 : 24} />
        </button>
      )}
    </main>
  );
}
