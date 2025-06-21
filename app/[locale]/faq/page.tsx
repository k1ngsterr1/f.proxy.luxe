"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Search, Plus, Minus, HelpCircle, BookOpen } from "lucide-react";

export default function Faq() {
  const i18n = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [openQuestions, setOpenQuestions] = useState<number[]>([0]); // First question open by default
  const [filteredQuestions, setFilteredQuestions] = useState<string[]>([]);
  const faqContentRef = useRef<HTMLDivElement>(null);

  // FAQ categories
  const categories = [
    {
      id: 0,
      name: i18n("faq.categories.general"),
      icon: <HelpCircle size={18} />,
    },
    {
      id: 1,
      name: i18n("faq.categories.technical"),
      icon: <BookOpen size={18} />,
    },
  ];

  // All FAQ questions from both columns combined
  const allQuestions = [
    i18n("faq.faqtext2"),
    i18n("faq.faqtext3"),
    i18n("faq.faqtext4"),
    i18n("faq.faqtext5"),
    i18n("faq.faqtext6"),
    i18n("faq.faqtext7"),
    i18n("faq.faqtext8"),
    i18n("faq.faqtext9"),
    i18n("faq.faqtext10"),
    i18n("faq.faqtext11"),
    i18n("faq.faqtext12"),
    i18n("faq.faqtext13"),
    i18n("faq.faqtext14"),
    i18n("faq.faqtext15"),
    i18n("faq.faqtext16"),
    i18n("faq.faqtext17"),
    i18n("faq.faqtext18"),
    i18n("faq.faqtext19"),
    i18n("faq.faqtext20"),
    i18n("faq.faqtext21"),
    i18n("faq.faqtext22"),
    i18n("faq.faqtext23"),
  ];

  // FAQ content with questions and answers
  const faqContent = [
    {
      question: i18n("faq.faqtext24"),
      answer: (
        <>
          <p>
            <strong>{i18n("faq.faqtext25")}</strong> {i18n("faq.faqtext26")}
          </p>
          <p>
            <strong>{i18n("faq.faqtext27")}</strong> {i18n("faq.faqtext28")}
          </p>
          <p>
            <strong>{i18n("faq.faqtext29")}</strong> {i18n("faq.faqtext30")}
          </p>
          <p>
            <strong>{i18n("faq.faqtext31")}</strong> {i18n("faq.faqtext32")}
          </p>
        </>
      ),
    },
    {
      question: i18n("faq.faqtext33"),
      answer: (
        <>
          <p>
            <strong>{i18n("faq.faqtext34")}</strong>
          </p>
          <p>{i18n("faq.faqtext35")}</p>
        </>
      ),
    },
    {
      question: i18n("faq.faqtext36"),
      answer: (
        <>
          <p>{i18n("faq.faqtext37")}</p>
          <p>{i18n("faq.faqtext38")}</p>
          <p>{i18n("faq.faqtext39")}</p>
          <p>{i18n("faq.faqtext40")}</p>
          <p>{i18n("faq.faqtext41")}</p>
        </>
      ),
    },
    {
      question: i18n("faq.faqtext42"),
      answer: (
        <p>
          {i18n("faq.faqtext43")}
          <span style={{ color: "#f3d675" }}>"{i18n("faq.faqtext44")}"</span>
          {i18n("faq.faqtext45")}
          <span style={{ color: "#f3d675" }}>"{i18n("faq.faqtext46")}"</span>
          {i18n("faq.faqtext47")}
        </p>
      ),
    },
    {
      question: i18n("faq.faqtext48"),
      answer: <p>{i18n("faq.faqtext49")}</p>,
    },
    {
      question: `${i18n("faq.faqtext50")} ${i18n("faq.faqtext51")}`,
      answer: <p>{i18n("faq.faqtext52")}</p>,
    },
    {
      question: i18n("faq.faqtext53"),
      answer: (
        <>
          <p>{i18n("faq.faqtext54")}</p>
          <p>{i18n("faq.faqtext55")}</p>
          <p>{i18n("faq.faqtext56")}</p>
        </>
      ),
    },
    // Add new FAQ items here
    {
      question: i18n("faq.faqtext9"),
      answer: <p>{i18n("faq.answer.yes")}</p>,
    },
    {
      question: i18n("faq.faqtext10"),
      answer: <p>{i18n("faq.answer.no-bookmakers")}</p>,
    },
    {
      question: i18n("faq.faqtext12"),
      answer: <p>{i18n("faq.answer.min-period")}</p>,
    },
    {
      question: i18n("faq.faqtext13"),
      answer: <p>{i18n("faq.answer.ipv6-sites")}</p>,
    },
    {
      question: i18n("faq.faqtext14"),
      answer: <p>{i18n("faq.answer.ipv6-parsing")}</p>,
    },
    {
      question: i18n("faq.faqtext15"),
      answer: <p>{i18n("faq.answer.ipv6-difference")}</p>,
    },
    {
      question: i18n("faq.faqtext16"),
      answer: <p>{i18n("faq.answer.ipv6-tunnel")}</p>,
    },
    {
      question: i18n("faq.faqtext17"),
      answer: (
        <p style={{ whiteSpace: "pre-line" }}>
          {i18n("faq.answer.proxy-speed")}
        </p>
      ),
    },
    {
      question: i18n("faq.faqtext18"),
      answer: <p>{i18n("faq.answer.proxy-format")}</p>,
    },
    {
      question: i18n("faq.faqtext19"),
      answer: <p>{i18n("faq.answer.authorization")}</p>,
    },
    {
      question: i18n("faq.faqtext20"),
      answer: <p>{i18n("faq.answer.usage-limits")}</p>,
    },
    {
      question: i18n("faq.faqtext21"),
      answer: <p>{i18n("faq.answer.ipv6-support-check")}</p>,
    },
    {
      question: i18n("faq.faqtext22"),
      answer: <p>{i18n("faq.answer.proxy-replacement")}</p>,
    },
    {
      question: i18n("faq.faqtext23"),
      answer: <p>{i18n("faq.answer.refund-policy")}</p>,
    },
  ];

  // Filter questions based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredQuestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allQuestions.filter((q) =>
      q.toLowerCase().includes(query)
    );
    setFilteredQuestions(filtered);
  }, [searchQuery]);

  // Toggle question accordion
  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Scroll to FAQ content when clicking on a question link
  const scrollToContent = () => {
    if (faqContentRef.current) {
      faqContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle category selection
  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <main
      className="inner-page"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      <title>{i18n("faqs.title")}</title>
      <meta
        name="keywords"
        content="купить прокси, ipv6 прокси, ipv4 прокси, индивидуальные прокси, персональные прокси, анонимные прокси, прокси дешево, купить proxy, proxy ru, https прокси, socks5 прокси, быстрые прокси, стабильные прокси, резидентские прокси, ISP, резидентные"
      />
      <meta
        name="description"
        content="Купить прокси дешево, индивидуальные резидентские и анонимные. IPv4, IPv6, резидентские прокси. HTTPs, Socks5 прокси. Прокси для социальных сетей."
      />
      <section className="faq" style={{ padding: "60px 0" }}>
        <div
          className="scontainer"
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          {/* Header */}
          <h1
            className="section-header"
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "40px",
              textAlign: "center",
              position: "relative",
              lineHeight: 1.2,
            }}
          >
            <span
              style={{
                color: "#f3d675",
                position: "relative",
                display: "inline-block",
                padding: "0 20px",
              }}
            >
              {i18n("faq.faqtext1")}
            </span>
          </h1>

          {/* Search Bar */}
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto 40px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder={i18n("faq.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 20px 14px 50px",
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "30px",
                  color: "#f3d675",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "rgba(243, 214, 117, 0.15)";
                  e.target.style.borderColor = "rgba(243, 214, 117, 0.4)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(243, 214, 117, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "rgba(243, 214, 117, 0.1)";
                  e.target.style.borderColor = "rgba(243, 214, 117, 0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <Search
                size={20}
                style={{
                  position: "absolute",
                  left: "20px",
                  color: "#f3d675",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  title={i18n("faq.clear")}
                  style={{
                    position: "absolute",
                    right: "20px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#f3d675",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  {i18n("faq.clear")}
                </button>
              )}
            </div>

            {/* Search Results */}
            {filteredQuestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#111111",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "8px",
                  marginTop: "8px",
                  padding: "10px 0",
                  zIndex: 10,
                  maxHeight: "300px",
                  overflowY: "auto",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                {filteredQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      scrollToContent();
                      setSearchQuery("");
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 20px",
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor:
                    activeCategory === category.id
                      ? "#f3d675"
                      : "rgba(243, 214, 117, 0.1)",
                  color: activeCategory === category.id ? "#000000" : "#f3d675",
                  border: "1px solid rgba(243, 214, 117, 0.3)",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: activeCategory === category.id ? "600" : "400",
                  transition: "all 0.2s ease",
                }}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Links */}
          <div
            className="faq-list"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              backgroundColor: "rgba(243, 214, 117, 0.03)",
              borderRadius: "12px",
              border: "1px solid rgba(243, 214, 117, 0.1)",
              padding: "30px",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {allQuestions
                .slice(0, Math.ceil(allQuestions.length / 2))
                .map((question, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "12px",
                    }}
                  >
                    <a
                      href="#faq-content"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToContent();
                        toggleQuestion(index % faqContent.length);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#f3d675",
                        textDecoration: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        transition: "all 0.2s ease",
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.1)";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.05)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <ChevronRight size={16} />
                      <span>{question}</span>
                    </a>
                  </li>
                ))}
            </ul>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {allQuestions
                .slice(Math.ceil(allQuestions.length / 2))
                .map((question, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "12px",
                    }}
                  >
                    <a
                      href="#faq-content"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToContent();
                        toggleQuestion(
                          (index + Math.ceil(allQuestions.length / 2)) %
                            faqContent.length
                        );
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#f3d675",
                        textDecoration: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        transition: "all 0.2s ease",
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.1)";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.05)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <ChevronRight size={16} />
                      <span>{question}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div
            id="faq-content"
            ref={faqContentRef}
            className="faq-inner"
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.03)",
              borderRadius: "12px",
              border: "1px solid rgba(243, 214, 117, 0.1)",
              padding: "30px",
              marginTop: "30px",
            }}
          >
            {faqContent.map((faq, index) => (
              <div
                key={index}
                style={{
                  marginBottom: index === faqContent.length - 1 ? 0 : "20px",
                  borderBottom:
                    index === faqContent.length - 1
                      ? "none"
                      : "1px solid rgba(243, 214, 117, 0.1)",
                  paddingBottom: index === faqContent.length - 1 ? 0 : "20px",
                }}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left",
                    padding: "16px",
                    backgroundColor: openQuestions.includes(index)
                      ? "rgba(243, 214, 117, 0.1)"
                      : "transparent",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "8px",
                    color: "#f3d675",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!openQuestions.includes(index)) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!openQuestions.includes(index)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span>{faq.question}</span>
                  {openQuestions.includes(index) ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>

                <div
                  style={{
                    maxHeight: openQuestions.includes(index) ? "1000px" : "0",
                    overflow: "hidden",
                    transition: "all 0.5s ease",
                    opacity: openQuestions.includes(index) ? 1 : 0,
                    padding: openQuestions.includes(index)
                      ? "20px 16px"
                      : "0 16px",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "#E0E0E0",
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#999999",
                fontSize: "16px",
              }}
            >
              <a
                href="mailto:admin@proxy.luxe"
                style={{
                  color: "#f3d675",
                  textDecoration: "none",
                  borderBottom: "1px dotted #f3d675",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderBottomColor = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#f3d675";
                  e.currentTarget.style.borderBottomColor = "#f3d675";
                }}
              >
                admin@proxy.luxe
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// Custom ChevronRight component
function ChevronRight({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
