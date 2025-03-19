"use client";

import { useState } from "react";
import { Loader2, MoreVertical } from "lucide-react";
import ProxyList from "@/entities/proxy/ui/proxy-list/proxy-list";
import { useProxyList } from "@/entities/proxy/hooks/queries/use-get-all-proxies";
import { AlertMessage } from "@/shared/ui/alert";

export default function ProxyPage() {
  const { data: proxies, isLoading, isError, error } = useProxyList();

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      <AlertMessage
        type="warning"
        message="Вам необходимо подтвердить свой email перейдя по ссылке, указанной в письме."
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
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
          ПРОКСИ
        </h1>
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#f3d675",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#000000",
            }}
          >
            Пополнение баланса
          </button>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              border: "1px solid #f3d675",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#f3d675",
            }}
          >
            Купить прокси
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Продлить", count: 0 },
          { label: "Автопродление", count: 0 },
          { label: "Изменить тип", count: 0 },
          { label: "Привязка к IP" },
          { label: "Экспорт" },
          { label: "Блокнот" },
        ].map((button, index) => (
          <button
            key={index}
            style={{
              padding: "8px 12px",
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#f3d675",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "400",
            }}
          >
            {button.label}
            {typeof button.count === "number" && (
              <span
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.2)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                {button.count}
              </span>
            )}
          </button>
        ))}
        <button
          style={{
            padding: "8px",
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
          }}
        >
          <MoreVertical size={16} color="#f3d675" />
        </button>
      </div>
      {isLoading && (
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
          <Loader2 size={20} className="animate-spin" />
          Загрузка прокси...
        </div>
      )}

      {/* Error State */}
      {isError && (
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
          Ошибка при загрузке списка прокси:{" "}
          {error?.message || "Неизвестная ошибка"}
        </div>
      )}

      {/* Proxy List */}
      {!isLoading && !isError && proxies?.data !== undefined ? (
        <ProxyList proxies={proxies.data} />
      ) : (
        !isLoading &&
        !isError && (
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
    </div>
  );
}
