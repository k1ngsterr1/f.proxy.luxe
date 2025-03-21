"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ProxyList from "@/entities/proxy/ui/proxy-list/proxy-list";
import { useProxyList } from "@/entities/proxy/hooks/queries/use-get-all-proxies";
import { AlertMessage } from "@/shared/ui/alert";
import Link from "next/link";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { useIsMobile } from "@/shared/utils/use-is-mobile";

export default function ProxyPage() {
  const [proxyType, setProxyType] = useState<"isp" | "ipv6" | "resident">(
    "isp"
  );
  const { data } = useGetUser();
  const { data: proxies, isLoading, isError, error } = useProxyList(proxyType);
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        width: isMobile ? "100%" : "75%",
        padding: isMobile ? 0 : "50px",
        marginTop: isMobile ? 64 : 0,
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
        <Link
          href="/personal-account"
          style={{
            padding: "8px 16px",
            backgroundColor: "#f3d675",
            borderRadius: "4px",
            fontSize: "14px",
            color: "#000000",
            textDecoration: "none",
          }}
        >
          Пополнение баланса
        </Link>
      </div>

      {/* ✅ Proxy Type Selection Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {["isp", "ipv6", "resident"].map((type) => (
          <button
            key={type}
            onClick={() => setProxyType(type as "isp" | "ipv6" | "resident")}
            style={{
              padding: "10px 20px",
              backgroundColor:
                proxyType === type ? "#f3d675" : "rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#000000",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              transition: "background 0.2s",
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ✅ Loading State */}
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

      {/* ✅ Error State */}
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
      {!isLoading &&
      !isError &&
      proxies?.data?.items &&
      Array.isArray(proxies.data.items) &&
      proxies.data.items.length > 0 ? (
        <ProxyList proxies={proxies.data.items} />
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
