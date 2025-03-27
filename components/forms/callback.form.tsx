"use client";

import { FC, FormEventHandler, useState, useRef, useEffect } from "react";
import { Option } from "@/shared/interfaces/option.interface";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const getOptions = (i18n: any) => [
  { id: "1", text: i18n("support.option1") },
  { id: "2", text: i18n("support.option2") },
];

export const CallbackForm: FC = () => {
  const i18n = useTranslations("forms.callback");
  const [technicalSupport, setTechnicalSupport] = useState<
    string | undefined
  >();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const options = getOptions(i18n);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setTechnicalSupport(option.id);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler} className="question-form">
      <input
        name="name"
        type="text"
        className="question-input"
        placeholder={i18n("name.placeholder")}
        required
      />
      <input
        name="email"
        type="text"
        className="question-input"
        placeholder="E-mail"
        required
      />

      {/* Custom Select Dropdown */}
      <div
        ref={dropdownRef}
        style={{
          position: "relative",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0.75rem 1rem",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: `1px solid ${
              isOpen ? "rgba(212, 175, 55, 0.8)" : "rgba(212, 175, 55, 0.5)"
            }`,
            borderRadius: "6px",
            color: selectedOption ? "white" : "rgba(255, 255, 255, 0.6)",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: isOpen ? "0 0 10px rgba(212, 175, 55, 0.3)" : "none",
          }}
        >
          <span>
            {selectedOption ? selectedOption.text : i18n("support.placeholder")}
          </span>
          <ChevronDown
            size={18}
            style={{
              color: "rgba(212, 175, 55, 0.8)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 5px)",
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
              animation: "fadeIn 0.2s ease",
            }}
          >
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option)}
                style={{
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backgroundColor:
                    selectedOption?.id === option.id
                      ? "rgba(212, 175, 55, 0.2)"
                      : "transparent",
                  color:
                    selectedOption?.id === option.id
                      ? "rgba(212, 175, 55, 1)"
                      : "white",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(212, 175, 55, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    selectedOption?.id === option.id
                      ? "rgba(212, 175, 55, 0.2)"
                      : "transparent";
                }}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}

        {/* Animation for dropdown */}
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Custom scrollbar for dropdown */
          div::-webkit-scrollbar {
            width: 6px;
          }

          div::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
          }

          div::-webkit-scrollbar-thumb {
            background-color: rgba(212, 175, 55, 0.5);
            border-radius: 6px;
          }

          div::-webkit-scrollbar-thumb:hover {
            background-color: rgba(212, 175, 55, 0.8);
          }
        `}</style>
      </div>

      <textarea
        name="message"
        className="question-textarea"
        placeholder={i18n("message.placeholder")}
        required
      ></textarea>
      <button type="submit" className="question-btn btn-hover">
        {i18n("submit")}
      </button>
    </form>
  );
};
