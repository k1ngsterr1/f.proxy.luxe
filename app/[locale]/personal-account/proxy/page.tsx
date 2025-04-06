"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ProxyList from "@/entities/proxy/ui/proxy-list/proxy-list";
import { useProxyList } from "@/entities/proxy/hooks/queries/use-get-all-proxies.queries";
import type { Proxy as ApiProxy } from "@/entities/proxy/api/get/get-all-proxies.api";
import { AlertMessage } from "@/shared/ui/alert";
import Link from "next/link";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useTranslations } from "next-intl";
import { TrafficBar } from "@/features/traffic-bar/traffic-bar";
import { ResidentProxyConstructor } from "@/features/residental-proxy-constructor/residental-proxy-constructor";

export default function ProxyPage() {
  const t = useTranslations("personal-proxy");
  const [proxy, setProxy] = useState<string | null>(null);
  const [package_key, setPackage_key] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("proxy");
      setProxy(storedEmail);
    }
  }, []);

  const [proxyType, setProxyType] = useState<any>(
    proxy === null ? "isp" : proxy
  );

  const { data } = useGetUser();
  const { data: proxies, isLoading, isError, error } = useProxyList(proxyType);
  const isMobile = useIsMobile();

  const trafficData =
    proxies?.data?.items && proxies.data.items.length > 0
      ? {
          totalBandwidthGB:
            //@ts-ignore
            Number(proxies.data.items[0].package_info?.traffic_limit) /
            1073741824, // Convert bytes to GB
          usedBandwidthMB:
            //@ts-ignore
            Number(proxies.data.items[0].package_info?.traffic_usage) / 1048576, // Convert bytes to MB
          reserveBandwidthGB: 1.0, // Assuming a fixed value for reserve bandwidth
          reserveUsedMB: 0, // Assuming a fixed value for reserve used
          rotationType: "rotating" as const,
          rotationInterval: 60,
          autoRenewal: true,
        }
      : null;

  useEffect(() => {
    const packageInfo = proxies?.data?.items?.[0]?.package_info;
    if (packageInfo?.package_key) {
      setPackage_key(packageInfo.package_key);
    } else {
      setPackage_key(null);
    }
  }, [proxies]);

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
        <AlertMessage type="warning" isEmail message={t("verify-email")} />
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
          {t("title")}
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
          {t("add-funds")}
        </Link>
      </div>
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
      {proxyType === "resident" && trafficData && (
        <TrafficBar
          totalBandwidthGB={trafficData.totalBandwidthGB}
          usedBandwidthMB={trafficData.usedBandwidthMB}
          reserveBandwidthGB={trafficData.reserveBandwidthGB}
          reserveUsedMB={trafficData.reserveUsedMB}
          rotationType={trafficData.rotationType}
          rotationInterval={trafficData.rotationInterval}
          autoRenewal={trafficData.autoRenewal}
        />
      )}
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
          {t("proxies-loading")}
        </div>
      )}
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
          {t("proxies-error")}: {error?.message || t("proxies-unknown-error")}
        </div>
      )}
      {!isLoading &&
      !isError &&
      proxies?.data?.items &&
      Array.isArray(proxies.data.items) &&
      proxies.data.items.length > 0 ? (
        <ProxyList
          proxies={proxies.data.items.flatMap((item: ApiProxy): any => {
            if (proxyType === "resident" && item.package_list) {
              return item.package_list.map((pkg): any => ({
                id: pkg.id.toString(), // ✅ Обязательное поле
                ip: "185.162.130.86", // или pkg.ip если есть
                type: proxyType,
                ports:
                  pkg.export.ports >= 3
                    ? `10000,...,${10000 + pkg.export.ports - 1}` // ✅ string
                    : Array.from(
                        { length: pkg.export.ports },
                        (_, i) => 10000 + i
                      ).join(","), // ✅ тоже string
                protocol: "SOCKS5/HTTP",
                port_http: pkg.port_http ?? 0,
                port_socks: pkg.port_socks ?? 0,
                country: pkg.geo?.[0]?.country || "",
                login: pkg.login,
                password: pkg.password,
                title: pkg.title?.slice(0, 6).trim() + "...",
                package_list: item.package_list || [], // ✅ строго массив
              }));
            }

            // Для других типов прокси
            return {
              ...item,
              type: proxyType,
              login: item.login || "",
              password: item.password || "",
              order_number: item.order_number || "",
            };
          })}
          type={proxyType}
        />
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
            {t("empty")}
          </div>
        )
      )}
      {proxyType === "resident" && package_key && (
        <ResidentProxyConstructor package_key={package_key} />
      )}
    </div>
  );
}
