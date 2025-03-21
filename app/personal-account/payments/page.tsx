"use client";

import { useGetPaymentHistory } from "@/entities/payments/hooks/queries/use-get-payment-history.query";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { AlertMessage } from "@/shared/ui/alert";
import { useEffect, useState } from "react";
import {
  Loader,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Search,
  Filter,
} from "lucide-react";

// Define the payment interface based on the provided data structure
interface Payment {
  id: string;
  userId: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  status?: string; // Optional since it's not in the original data
}

export default function PaymentsPage() {
  const { data, isLoading: isUserLoading } = useGetUser();
  const {
    data: paymentsData,
    isLoading: isPaymentsLoading,
    error: paymentsError,
  } = useGetPaymentHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);

  useEffect(() => {
    console.log("data:", paymentsData, isUserLoading, isPaymentsLoading);
  }, [paymentsData, isUserLoading, isPaymentsLoading]);

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
        return {
          bg: "rgba(76, 175, 80, 0.1)",
          border: "rgba(76, 175, 80, 0.3)",
          color: "#4CAF50",
          icon: <CheckCircle size={14} />,
          text: "Успешно",
        };
      case "pending":
      case "processing":
        return {
          bg: "rgba(255, 193, 7, 0.1)",
          border: "rgba(255, 193, 7, 0.3)",
          color: "#FFC107",
          icon: <Clock size={14} />,
          text: "В обработке",
        };
      case "failed":
      case "error":
        return {
          bg: "rgba(255, 82, 82, 0.1)",
          border: "rgba(255, 82, 82, 0.3)",
          color: "#FF5252",
          icon: <XCircle size={14} />,
          text: "Ошибка",
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

  const filteredPayments = paymentsData?.data;

  useEffect(() => {
    console.log("payments data:", paymentsData);
  }, []);

  paymentsData?.filter((payment: Payment) => {
    const matchesSearch =
      searchTerm === "" ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());

    const paymentStatus = payment.status || "completed";
    const matchesStatus =
      statusFilter === "all" || paymentStatus.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      {data?.isVerified === false && (
        <AlertMessage
          type="warning"
          message="Вам необходимо подтвердить свой email введя код, указанной в письме."
        />
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
          ПЛАТЕЖИ
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
          Пополнить баланс
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
            placeholder="Поиск платежей..."
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
          <span>Загрузка платежей...</span>
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
          Ошибка при загрузке платежей:{" "}
          {paymentsError.message || "Неизвестная ошибка"}
        </div>
      )}

      {/* Payments Table */}
      {!isPaymentsLoading &&
      !paymentsError &&
      paymentsData &&
      paymentsData.length > 0 ? (
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
                  <th style={{ padding: "12px 16px" }}>ID</th>
                  <th style={{ padding: "12px 16px" }}>Дата</th>
                  <th style={{ padding: "12px 16px" }}>Сумма</th>
                  <th style={{ padding: "12px 16px" }}>Статус</th>
                </tr>
              </thead>
              <tbody>
                {paymentsData?.map((payment: Payment) => {
                  // Default to "completed" status if not provided
                  const statusBadge = getStatusBadge(
                    payment.status || "completed"
                  );

                  return (
                    <tr
                      key={payment.id}
                      style={{
                        borderTop: "1px solid rgba(243, 214, 117, 0.1)",
                        color: "#FFFFFF",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <td style={{ padding: "12px 16px" }}>{payment.id}</td>
                      <td style={{ padding: "12px 16px" }}>
                        {formatDate(payment.createdAt)}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "#f3d675",
                          fontWeight: "500",
                        }}
                      >
                        {formatCurrency(payment.price)}
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

          {/* Pagination or Summary */}
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
              Показано {filteredPayments?.length} из {paymentsData?.length}{" "}
              платежей
            </div>
            {paymentsData?.total > paymentsData?.length && (
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#f3d675",
                  cursor: "pointer",
                  fontSize: "12px",
                  textDecoration: "underline",
                }}
              >
                Загрузить еще
              </button>
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
            Ничего не найдено...
          </div>
        )
      )}

      {/* Payment Details Modal */}
    </div>
  );
}
