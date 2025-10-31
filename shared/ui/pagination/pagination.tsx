"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const t = useTranslations();

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      className={`pagination ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        marginTop: "32px",
        marginBottom: "32px",
      }}
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 500,
          background:
            currentPage === 1
              ? "rgba(243, 214, 117, 0.05)"
              : "linear-gradient(135deg, rgba(243, 214, 117, 0.1) 0%, rgba(243, 214, 117, 0.05) 100%)",
          color: currentPage === 1 ? "#666" : "#f3d675",
          border:
            currentPage === 1
              ? "1px solid rgba(243, 214, 117, 0.1)"
              : "1px solid rgba(243, 214, 117, 0.3)",
          borderRadius: "8px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(243, 214, 117, 0.2) 0%, rgba(243, 214, 117, 0.1) 100%)";
            e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.5)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(243, 214, 117, 0.1) 0%, rgba(243, 214, 117, 0.05) 100%)";
            e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        <ChevronLeft size={16} />
        {t("pagination.previous", { defaultValue: "Назад" })}
      </button>

      {/* Page Numbers */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span
                style={{
                  padding: "8px 4px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                style={{
                  minWidth: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 600,
                  background:
                    currentPage === page
                      ? "linear-gradient(135deg, rgba(243, 214, 117, 0.3) 0%, rgba(243, 214, 117, 0.2) 100%)"
                      : "linear-gradient(135deg, rgba(243, 214, 117, 0.05) 0%, rgba(243, 214, 117, 0.02) 100%)",
                  color: currentPage === page ? "#f3d675" : "#999",
                  border:
                    currentPage === page
                      ? "2px solid rgba(243, 214, 117, 0.6)"
                      : "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(243, 214, 117, 0.15) 0%, rgba(243, 214, 117, 0.08) 100%)";
                    e.currentTarget.style.borderColor =
                      "rgba(243, 214, 117, 0.4)";
                    e.currentTarget.style.color = "#f3d675";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(243, 214, 117, 0.05) 0%, rgba(243, 214, 117, 0.02) 100%)";
                    e.currentTarget.style.borderColor =
                      "rgba(243, 214, 117, 0.2)";
                    e.currentTarget.style.color = "#999";
                  }
                }}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: 500,
          background:
            currentPage === totalPages
              ? "rgba(243, 214, 117, 0.05)"
              : "linear-gradient(135deg, rgba(243, 214, 117, 0.1) 0%, rgba(243, 214, 117, 0.05) 100%)",
          color: currentPage === totalPages ? "#666" : "#f3d675",
          border:
            currentPage === totalPages
              ? "1px solid rgba(243, 214, 117, 0.1)"
              : "1px solid rgba(243, 214, 117, 0.3)",
          borderRadius: "8px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(243, 214, 117, 0.2) 0%, rgba(243, 214, 117, 0.1) 100%)";
            e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.5)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(243, 214, 117, 0.1) 0%, rgba(243, 214, 117, 0.05) 100%)";
            e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        {t("pagination.next", { defaultValue: "Вперед" })}
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
