"use client";

import { useState, useEffect, useCallback } from "react";
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
import { useUpdateProxy } from "@/entities/residental-proxy/api/hooks/mutations/use-update-list-resident.mutation";
import { useIsTablet } from "@/shared/utils/use-is-tablet";
import { useIsSmallerTablet } from "@/shared/utils/use-is-smaller-tablet";

export default function ProxyPage() {
  const i18n = useTranslations();
  const t = useTranslations("personal-proxy");
  const [proxy, setProxy] = useState<string | null>(null);
  const [package_key, setPackage_key] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallerTablet = useIsSmallerTablet();
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [allProxies, setAllProxies] = useState<any[]>([]);
  const [selectedProxies, setSelectedProxies] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("proxy");
      setProxy(storedEmail);

      // Track window width for responsive adjustments
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const [proxyType, setProxyType] = useState<any>(
    proxy === null ? "isp" : proxy
  );

  const { updateProxy, isUpdating } = useUpdateProxy();

  // Handle proxy edit with the correct parameters
  const handleEditProxy = (proxy: any) => {
    // Extract the numeric listId from the proxy.id
    const listId = Number.parseInt(proxy.id, 10);

    if (isNaN(listId)) {
      console.error("Invalid proxy ID:", proxy.id);
      return;
    }

    updateProxy({
      listId: listId,
      title: proxy.title,
      rotation: proxy.rotation,
      packageKey: proxy.package_key,
    });
  };

  const { data } = useGetUser();
  const { data: proxies, isLoading, isError, error } = useProxyList(proxyType);

  // Calculate total traffic limit and find max expiry date
  const trafficData =
    proxies?.data?.items && proxies.data.items.length > 0
      ? {
          totalBandwidthGB:
            proxies.data.items.reduce((sum, item) => {
              // Sum up all traffic limits
              return sum + (Number(item.package_info?.traffic_limit) || 0);
            }, 0) / 1073741824, // Convert bytes to GB
          usedBandwidthMB:
            //@ts-ignore
            Number(proxies.data.items[0].package_info?.traffic_usage) / 1048576, // Convert bytes to MB
          // Determine rotation type based on package_info.rotation
          rotationType:
            proxies.data.items[0].package_info?.rotation === -1
              ? "sticky"
              : ("rotating" as const),
          // Use the actual rotation value from package_info
          rotationInterval: proxies.data.items[0].package_info?.rotation || 60,
          autoRenewal: true,
          expiryDate:
            proxies.data.items
              .reduce((maxDate, item) => {
                // Find the maximum expiry date
                if (!item.package_info?.expired_at?.date) return maxDate;
                const currentDate = new Date(item.package_info.expired_at.date);
                return !maxDate || currentDate > maxDate
                  ? currentDate
                  : maxDate;
              }, null as Date | null)
              ?.toISOString()
              .split("T")[0] || "",
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

  // Process proxies into a flat list
  useEffect(() => {
    if (proxies?.data?.items && Array.isArray(proxies.data.items)) {
      const flatProxies: any[] = [];

      proxies.data.items.forEach((item: ApiProxy) => {
        //@ts-ignore
        const orderId = item.order_id || "unknown";

        if (proxyType === "resident" && item.package_list) {
          item.package_list.forEach((pkg) => {
            flatProxies.push({
              id: pkg.id.toString(),
              ip: "185.162.130.86",
              type: proxyType,
              ports:
                pkg.export.ports >= 3
                  ? `10000,...,${10000 + pkg.export.ports - 1}`
                  : Array.from(
                      { length: pkg.export.ports },
                      (_, i) => 10000 + i
                    ).join(","),
              protocol: "SOCKS5/HTTP",
              port_http: pkg.port_http ?? 0,
              port_socks: pkg.port_socks ?? 0,
              country: pkg.geo?.[0]?.country || "",
              login: pkg.login,
              password: pkg.password,
              title: pkg.title,
              package_list: item.package_list || [],
              package_key: item.package_info.package_key,
              rotation: pkg.rotation,
              order_id: orderId,
              order_number: item.order_number || "",
              //@ts-ignore
              can_prolong: item.can_prolong || false,
              //@ts-ignore
              date_end: item.date_end || "",
            });
          });
        } else {
          flatProxies.push({
            ...item,
            type: proxyType,
            login: item.login || "",
            password: item.password || "",
            order_id: orderId,
            order_number: item.order_number || "",
            //@ts-ignore
            can_prolong: item.can_prolong || false,
            //@ts-ignore
            date_end: item.date_end || "",
          });
        }
      });

      setAllProxies(flatProxies);
    }
  }, [proxies, proxyType]);

  // Handle selecting a single proxy - will select all with same order_id
  const handleSelectProxy = useCallback(
    (proxy: any) => {
      console.log("handleSelectProxy called with proxy:", proxy);
      console.log("Current device type:", isMobile ? "Mobile" : "Desktop");

      const orderId = proxy.order_id;
      console.log("Order ID:", orderId);

      const proxiesInThisOrder = allProxies.filter(
        (p) => p.order_id === orderId
      );
      console.log("Proxies in this order:", proxiesInThisOrder.length);

      const proxyIdsInThisOrder = proxiesInThisOrder.map((p) => p.id);
      console.log("Proxy IDs in this order:", proxyIdsInThisOrder);

      console.log("Current selected proxies:", selectedProxies);
      console.log("Current selected order IDs:", selectedOrderIds);

      // Check if this proxy is already selected
      if (selectedProxies.includes(proxy.id)) {
        console.log("Proxy is already selected, deselecting all in this order");
        // Deselect all proxies with this order_id
        const newSelectedProxies = selectedProxies.filter(
          (id) => !proxyIdsInThisOrder.includes(id)
        );
        console.log(
          "New selected proxies after deselection:",
          newSelectedProxies
        );

        setSelectedProxies(newSelectedProxies);

        const newSelectedOrderIds = selectedOrderIds.filter(
          (id) => id !== orderId
        );
        console.log(
          "New selected order IDs after deselection:",
          newSelectedOrderIds
        );

        setSelectedOrderIds(newSelectedOrderIds);
      } else {
        console.log("Proxy is not selected, selecting all in this order");
        // Select all proxies with this order_id
        const newSelectedProxies = [...selectedProxies];

        // Add all proxy IDs from this order that aren't already selected
        proxyIdsInThisOrder.forEach((id) => {
          if (!newSelectedProxies.includes(id)) {
            newSelectedProxies.push(id);
          }
        });

        console.log(
          "New selected proxies after selection:",
          newSelectedProxies
        );
        setSelectedProxies(newSelectedProxies);

        // Add the order ID if not already selected
        if (!selectedOrderIds.includes(orderId)) {
          const newSelectedOrderIds = [...selectedOrderIds, orderId];
          console.log(
            "New selected order IDs after selection:",
            newSelectedOrderIds
          );
          setSelectedOrderIds(newSelectedOrderIds);
        }
      }
    },
    [allProxies, selectedProxies, selectedOrderIds, isMobile]
  );

  // Handle bulk prolonging of selected proxies
  const handleBulkProlong = () => {
    // Implementation for bulk prolonging would go here
    console.log("Prolonging proxies with order IDs:", selectedOrderIds);
    console.log("Selected proxy IDs:", selectedProxies);
    // Reset selection after action
    setSelectedOrderIds([]);
    setSelectedProxies([]);
  };

  const containerStyle = isSmallerTablet
    ? "400px"
    : isTablet
    ? "600px"
    : "800px";

  const containerPadding = isMobile ? "0px" : "0px";
  const containerWidth = isMobile ? "100%" : "100%";
  const titleFontSize = isMobile ? "20px" : "32px";
  const buttonPadding = isMobile ? "8px 10px" : "10px 20px";
  const buttonFontSize = isMobile ? "12px" : "14px";
  const tabsGap = isMobile ? "4px" : "10px";
  const tabsMarginBottom = isMobile ? "16px" : "20px";
  const alertMarginBottom = isMobile ? "16px" : "24px";
  const contentPadding = isMobile ? "12px" : "24px";
  const marginTop = isMobile ? "60px" : "0";

  return (
    <div
      style={{
        width: containerWidth,
        padding: containerPadding,
        marginTop: marginTop,
        maxWidth: containerStyle as any,
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      <title>{i18n("personalProxy.title")}</title>
      {data?.isVerified === false && (
        <div style={{ marginBottom: alertMarginBottom }}>
          <AlertMessage type="warning" isEmail message={t("verify-email")} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          marginBottom: isMobile ? "16px" : "24px",
          gap: isMobile ? "12px" : "0",
        }}
      >
        <h1
          style={{
            fontSize: titleFontSize,
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
            fontSize: buttonFontSize,
            color: "#000000",
            textDecoration: "none",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          {t("add-funds")}
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : "center",
          gap: tabsGap,
          marginBottom: tabsMarginBottom,
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {["isp", "ipv6", "resident"].map((type) => (
          <button
            key={type}
            onClick={() => setProxyType(type as "isp" | "ipv6" | "resident")}
            style={{
              padding: buttonPadding,
              backgroundColor:
                proxyType === type ? "#f3d675" : "rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: proxyType === type ? "#000000" : "#f3d675",
              fontSize: buttonFontSize,
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              transition: "background 0.2s",
              flex: isMobile ? "1 0 30%" : "0 1 auto",
              minWidth: isMobile ? "auto" : "100px",
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
      {proxyType === "resident" && trafficData && package_key && (
        <div style={{ marginBottom: isMobile ? "16px" : "24px" }}>
          <TrafficBar
            totalBandwidthGB={trafficData.totalBandwidthGB}
            usedBandwidthMB={trafficData.usedBandwidthMB}
            rotationType={trafficData.rotationType as "sticky" | "rotating"}
            rotationInterval={trafficData.rotationInterval}
            autoRenewal={trafficData.autoRenewal}
            expiryDate={trafficData.expiryDate}
            package_key={package_key}
          />
        </div>
      )}

      {isLoading && (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            padding: contentPadding,
            textAlign: "center",
            borderRadius: "4px",
            color: "#f3d675",
            fontSize: buttonFontSize,
            border: "1px solid rgba(243, 214, 117, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: isMobile ? "16px" : "24px",
          }}
        >
          <Loader2 size={isMobile ? 16 : 20} className="animate-spin" />
          {t("proxies-loading")}
        </div>
      )}

      {isError && (
        <div
          style={{
            backgroundColor: "rgba(255, 82, 82, 0.1)",
            padding: contentPadding,
            textAlign: "center",
            borderRadius: "4px",
            color: "#FF5252",
            fontSize: buttonFontSize,
            border: "1px solid rgba(255, 82, 82, 0.2)",
            marginBottom: isMobile ? "16px" : "24px",
          }}
        >
          {t("proxies-error")}: {error?.message || t("proxies-unknown-error")}
        </div>
      )}

      {!isLoading && !isError && allProxies.length > 0 ? (
        <div style={{ marginBottom: isMobile ? "16px" : "24px" }}>
          {/* Simple table layout */}
          <div
            style={{
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <ProxyList
              proxies={allProxies}
              type={proxyType}
              onEdit={handleEditProxy}
              selectedProxies={selectedProxies}
              onSelectProxy={(proxyId) => {
                console.log(
                  "ProxyList onSelectProxy called with proxyId:",
                  proxyId
                );
                handleSelectProxy(proxyId);
              }}
            />
          </div>
        </div>
      ) : (
        !isLoading &&
        !isError && (
          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              padding: contentPadding,
              textAlign: "center",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: buttonFontSize,
              border: "1px solid rgba(243, 214, 117, 0.2)",
              marginBottom: isMobile ? "16px" : "24px",
            }}
          >
            {t("empty")}
          </div>
        )
      )}

      {proxyType === "resident" && package_key && (
        <div>
          <ResidentProxyConstructor package_key={package_key} />
        </div>
      )}
    </div>
  );
}
