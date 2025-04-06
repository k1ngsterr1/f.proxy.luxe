"use client";

import { useGetPaymentHistory } from "@/entities/payments/hooks/queries/use-get-payment-history.query";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { AlertMessage } from "@/shared/ui/alert";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Loader,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Define the payment interface based on the provided data structure
interface Payment {
  id: string;
  userId: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  status?: string; // Optional since it's not in the original data
  type: "replenishment"; // Payments are replenishments
}

// Define the order interface
interface Order {
  id: string;
  totalPrice: string;
  createdAt: string;
  status: string;
  type: "write-off"; // Orders are write-offs
}

// Combined type for table display
type TransactionItem = (Payment | Order) & {
  displayPrice?: string;
};

export default function PaymentsPage() {
  const { data, isLoading: isUserLoading } = useGetUser();
  const {
    data: paymentsData,
    isLoading: isPaymentsLoading,
    error: paymentsError,
  } = useGetPaymentHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionItem | null>(null);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const [combinedTransactions, setCombinedTransactions] = useState<
    TransactionItem[]
  >([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const t = useTranslations("personal-payments");

  useEffect(() => {
    if (paymentsData) {
      // Process payments data
      const payments =
        paymentsData.payments?.map((payment: any) => ({
          ...payment,
          type: "replenishment",
          displayPrice: `+${payment.price}`,
        })) || [];

      // Process orders data
      const orders =
        paymentsData.orders?.map((order: any) => ({
          ...order,
          type: "write-off",
          displayPrice: `-${order.totalPrice}`,
        })) || [];

      // Combine and sort by date (newest first)
      const combined = [...payments, ...orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setCombinedTransactions(combined);
      // Reset to first page when data changes
      setCurrentPage(1);
    }
  }, [paymentsData]);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to format currency
  const formatCurrency = (amount: string, currency = "USD") => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(Number(amount));
  };

  // Get status badge style based on payment status
  const getStatusBadge = (status = "completed") => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
      case "paid":
        return {
          bg: "rgba(76, 175, 80, 0.1)",
          border: "rgba(76, 175, 80, 0.3)",
          color: "#4CAF50",
          icon: <CheckCircle size={14} />,
          text: t("status.success"),
        };
      case "pending":
      case "processing":
        return {
          bg: "rgba(255, 193, 7, 0.1)",
          border: "rgba(255, 193, 7, 0.3)",
          color: "#FFC107",
          icon: <Clock size={14} />,
          text: t("status.pending"),
        };
      case "failed":
      case "error":
        return {
          bg: "rgba(255, 82, 82, 0.1)",
          border: "rgba(255, 82, 82, 0.3)",
          color: "#FF5252",
          icon: <XCircle size={14} />,
          text: t("status.failed"),
        };
      default:
        return {
          bg: "rgba(158, 158, 158, 0.1)",
          border: "rgba(158, 158, 158, 0.3)",
          color: "#9E9E9E",
          icon: null,
          text: status,
        };
    }
  };

  // Get type badge style based on transaction type
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "replenishment":
        return {
          bg: "rgba(76, 175, 80, 0.1)",
          border: "rgba(76, 175, 80, 0.3)",
          color: "#4CAF50",
          icon: <ArrowUpCircle size={14} />,
          text: t("type.replenishment"),
        };
      case "write-off":
        return {
          bg: "rgba(255, 82, 82, 0.1)",
          border: "rgba(255, 82, 82, 0.3)",
          color: "#FF5252",
          icon: <ArrowDownCircle size={14} />,
          text: t("type.write-off"),
        };
      default:
        return {
          bg: "rgba(158, 158, 158, 0.1)",
          border: "rgba(158, 158, 158, 0.3)",
          color: "#9E9E9E",
          icon: null,
          text: type,
        };
    }
  };

  const filteredTransactions = combinedTransactions.filter((transaction) => {
    const matchesSearch =
      searchTerm === "" ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());

    const transactionStatus = transaction.status || "completed";
    const matchesStatus =
      statusFilter === "all" ||
      transactionStatus.toLowerCase() === statusFilter;

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers

    if (totalPages <= maxPagesToShow) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page numbers to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        maxWidth: "920px",
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      {data?.isVerified === false && (
        <AlertMessage type="warning" isEmail message={t("verify-email")} />
      )}

      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {t("title")}
        </h1>

        <button
          onClick={() => setIsAddFundsModalOpen(true)}
          style={{
            backgroundColor: "#f3d675",
            color: "#000000",
            border: "none",
            padding: "10px 16px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {t("add-funds")}
        </button>
      </div>

      {/* Search and Filter */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: "1",
            minWidth: "200px",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#f3d675",
              opacity: 0.7,
            }}
          />
          <input
            type="text"
            placeholder={t("search-placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Type filter */}
        <div style={{ minWidth: "150px" }}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
              appearance: "none",
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23f3d675" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: "16px",
            }}
          >
            <option value="all">{t("filter.all-types")}</option>
            <option value="replenishment">{t("type.replenishment")}</option>
            <option value="write-off">{t("type.write-off")}</option>
          </select>
        </div>

        {/* Items per page selector */}
        <div style={{ minWidth: "120px" }}>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
              appearance: "none",
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23f3d675" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: "16px",
            }}
          >
            <option value="5">5 {t("per-page")}</option>
            <option value="10">10 {t("per-page")}</option>
            <option value="20">20 {t("per-page")}</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isPaymentsLoading && (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            padding: "24px",
            textAlign: "center",
            borderRadius: "4px",
            color: "#f3d675",
            fontSize: "14px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Loader size={20} className="animate-spin" />
          <span>{t("loading")}</span>
        </div>
      )}

      {/* Error State */}
      {paymentsError && (
        <div
          style={{
            backgroundColor: "rgba(255, 82, 82, 0.1)",
            padding: "24px",
            textAlign: "center",
            borderRadius: "4px",
            color: "#FF5252",
            fontSize: "14px",
            border: "1px solid rgba(255, 82, 82, 0.2)",
          }}
        >
          {t("error")} {paymentsError.message || t("unknown-error")}
        </div>
      )}

      {/* Transactions Table */}
      {!isPaymentsLoading &&
      !paymentsError &&
      combinedTransactions.length > 0 ? (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.05)",
            borderRadius: "4px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "12px 16px" }}>{t("table.id")}</th>
                  <th style={{ padding: "12px 16px" }}>{t("table.date")}</th>
                  <th style={{ padding: "12px 16px" }}>{t("table.type")}</th>
                  <th style={{ padding: "12px 16px" }}>{t("table.amount")}</th>
                  <th style={{ padding: "12px 16px" }}>{t("table.status")}</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => {
                  // Default to "completed" status if not provided
                  const statusBadge = getStatusBadge(
                    transaction.status || "completed"
                  );
                  const typeBadge = getTypeBadge(transaction.type);

                  // Determine price display
                  const priceDisplay =
                    transaction.type === "replenishment"
                      ? `+${
                          transaction.price || (transaction as any).totalPrice
                        }`
                      : `-${
                          (transaction as any).totalPrice ||
                          (transaction as any).price
                        }`;

                  // Determine price color
                  const priceColor =
                    transaction.type === "replenishment"
                      ? "#4CAF50"
                      : "#FF5252";

                  return (
                    <tr
                      key={transaction.id}
                      style={{
                        borderTop: "1px solid rgba(243, 214, 117, 0.1)",
                        color: "#FFFFFF",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <td style={{ padding: "12px 16px" }}>{transaction.id}</td>
                      <td style={{ padding: "12px 16px" }}>
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: typeBadge.bg,
                            color: typeBadge.color,
                            border: `1px solid ${typeBadge.border}`,
                          }}
                        >
                          {typeBadge.icon}
                          {typeBadge.text}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: priceColor,
                          fontWeight: "500",
                        }}
                      >
                        {formatCurrency(
                          transaction.type === "replenishment"
                            ? transaction.price
                            : (transaction as any).totalPrice
                        )}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: statusBadge.bg,
                            color: statusBadge.color,
                            border: `1px solid ${statusBadge.border}`,
                          }}
                        >
                          {statusBadge.icon}
                          {statusBadge.text}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(243, 214, 117, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#999999",
              fontSize: "12px",
            }}
          >
            <div>
              {t("showing")} {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredTransactions.length)} {t("of")}{" "}
              {filteredTransactions.length} {t("transactions")}
            </div>

            {totalPages > 1 && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  style={{
                    backgroundColor:
                      currentPage === 1
                        ? "rgba(243, 214, 117, 0.05)"
                        : "rgba(243, 214, 117, 0.1)",
                    color: currentPage === 1 ? "#666666" : "#f3d675",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "4px",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {getPageNumbers().map((number, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof number === "number" ? paginate(number) : null
                    }
                    style={{
                      backgroundColor:
                        currentPage === number
                          ? "rgba(243, 214, 117, 0.2)"
                          : "rgba(243, 214, 117, 0.05)",
                      color:
                        typeof number === "number"
                          ? currentPage === number
                            ? "#f3d675"
                            : "#f3d675"
                          : "#999999",
                      border:
                        currentPage === number
                          ? "1px solid rgba(243, 214, 117, 0.4)"
                          : "1px solid rgba(243, 214, 117, 0.1)",
                      borderRadius: "4px",
                      minWidth: "28px",
                      height: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor:
                        typeof number === "number" ? "pointer" : "default",
                      fontWeight: currentPage === number ? "600" : "normal",
                      fontSize: "12px",
                    }}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  style={{
                    backgroundColor:
                      currentPage === totalPages
                        ? "rgba(243, 214, 117, 0.05)"
                        : "rgba(243, 214, 117, 0.1)",
                    color: currentPage === totalPages ? "#666666" : "#f3d675",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "4px",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        !isPaymentsLoading &&
        !paymentsError && (
          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              padding: "24px",
              textAlign: "center",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
              border: "1px solid rgba(243, 214, 117, 0.2)",
            }}
          >
            {t("empty")}
          </div>
        )
      )}

      {/* Payment Details Modal */}
    </div>
  );
}
