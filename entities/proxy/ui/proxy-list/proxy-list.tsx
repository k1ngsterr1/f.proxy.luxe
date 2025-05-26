"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  Download,
  Edit,
  FileJson,
  FileText,
  Key,
  Trash2,
  Check,
} from "lucide-react";
import { usePopupStore } from "@/shared/store/use-popup.store";
import EditProxyPopup from "../edit-proxy-popup/edit-proxy-popup";
import { useDeleteProxy } from "@/entities/residental-proxy/api/hooks/mutations/use-delete-resident-proxy.mutation";
import NotificationPopup from "../notification-popup/notification-popup";
import { useProlongProxy } from "@/entities/residental-proxy/api/hooks/mutations/use-prolong-proxy.mutatuion";
import { useTranslations } from "next-intl";

interface ProxyListItem {
  export: { ports: number; ext: string };
  login: string;
  password: string;
}

interface Proxy {
  id: string;
  ip: string;
  type: string;
  ports?: number[] | string;
  protocol: string;
  port_http?: number | string;
  port_socks?: number | string;
  country: string;
  login: string;
  password: string;
  title?: string;
  package_list: ProxyListItem[];
  order_number?: string;
  order_id?: string;
  package_key?: string;
  orderId?: string;
  date_end?: string;
}

export interface Props {
  proxies: Proxy[] | undefined;
  type: string;
  onDelete?: (proxyId: string, packageKey?: string) => void;
  onEdit?: (proxy: Proxy) => void;
  availableCountries?: { code: string; name: string }[];
  selectedProxies?: string[];
  onSelectProxy?: (proxyId: string) => void;
  onSelectAll?: () => void;
}

const ProxyList: React.FC<Props> = ({
  proxies,
  type,
  onDelete,
  onEdit,
  availableCountries = [],
  selectedProxies: externalSelectedProxies,
  onSelectProxy,
  onSelectAll,
}) => {
  const t = useTranslations("proxyList");
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingProxy, setEditingProxy] = useState<Proxy | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
    showRefresh: boolean;
    isDeleteConfirmation?: boolean;
    proxyToDelete?: Proxy;
  } | null>(null);

  const [prolongProxy, setProlongProxy] = useState<Proxy | null>(null);
  const [prolongPeriod, setProlongPeriod] = useState<string>("1m");

  // Simplified selection state - just track selected proxy IDs
  const [internalSelectedProxies, setInternalSelectedProxies] = useState<
    Set<string>
  >(new Set());
  const [isSubmittingBatchProlong, setIsSubmittingBatchProlong] =
    useState(false);

  // Store unique proxies by ID to avoid duplicates
  const [uniqueProxies, setUniqueProxies] = useState<Proxy[]>([]);

  // Use either external or internal selected proxies
  const selectedProxies =
    externalSelectedProxies || Array.from(internalSelectedProxies);

  // Process proxies to ensure uniqueness by ID
  useEffect(() => {
    if (proxies) {
      const uniqueProxiesMap = new Map<string, Proxy>();
      proxies.forEach((proxy) => {
        if (!uniqueProxiesMap.has(proxy.id)) {
          uniqueProxiesMap.set(proxy.id, proxy);
        }
      });
      setUniqueProxies(Array.from(uniqueProxiesMap.values()));
    }
  }, [proxies]);

  // Calculate if all proxies are selected
  const allSelected =
    uniqueProxies.length > 0 && selectedProxies.length === uniqueProxies.length;
  const someSelected = selectedProxies.length > 0;

  const { openPopup } = usePopupStore() as {
    openPopup: (name: string, params?: Record<string, any>) => void;
  };

  const { deleteProxy, isDeleting, deleteError } = useDeleteProxy();
  const {
    prolongProxy: prolongProxyHook,
    isProlonging,
    prolongError,
  } = useProlongProxy();

  // Simplified checkbox change handler
  const handleCheckboxChange = (proxyId: string) => {
    console.log("handleCheckboxChange called with proxyId:", proxyId);

    if (onSelectProxy) {
      // Use external handler - just call it directly
      onSelectProxy(proxyId);
    } else {
      // Use internal selection - update the Set properly
      setInternalSelectedProxies((prev) => {
        const newSelected = new Set(prev);
        if (newSelected.has(proxyId)) {
          newSelected.delete(proxyId);
          console.log("Deselected proxy:", proxyId);
        } else {
          newSelected.add(proxyId);
          console.log("Selected proxy:", proxyId);
        }
        console.log("New internal selection:", Array.from(newSelected));
        return newSelected;
      });
    }
  };

  // Simplified select all handler
  const handleSelectAll = () => {
    console.log("ProxyList handleSelectAll called");

    // Skip if we're showing residential proxies
    if (type === "resident") {
      return;
    }

    if (onSelectAll) {
      // Use external handler if provided
      onSelectAll();
    } else {
      // Using internal selection
      if (allSelected) {
        console.log("Deselecting all proxies internally");
        setInternalSelectedProxies(new Set());
      } else {
        console.log("Selecting all proxies internally");
        const allIds = uniqueProxies.map((proxy) => proxy.id);
        setInternalSelectedProxies(new Set(allIds));
      }
    }
  };

  // Function to handle batch prolong
  const handleBatchProlong = () => {
    if (selectedProxies.length < 1) {
      setNotification({
        show: true,
        message: t("prolongBatchError"),
        type: "error",
        showRefresh: false,
      });
      return;
    }

    // Open prolong popup for batch operation
    setProlongProxy({
      id: "batch",
      type: type,
      isBatchOperation: true,
    } as Proxy & { isBatchOperation: boolean });
  };

  // Function to confirm batch prolong
  const confirmBatchProlong = async () => {
    if (!prolongProxy) return;

    setIsSubmittingBatchProlong(true);

    // Get all selected proxies
    const selectedProxiesArray = uniqueProxies.filter((proxy) =>
      selectedProxies.includes(proxy.id)
    );

    console.log(
      "Starting batch prolong for proxies:",
      selectedProxiesArray.map((p) => ({
        id: p.id,
        order_id: p.order_id,
        orderId: p.orderId,
      }))
    );

    // For IPv6 proxies, get unique order IDs only
    let uniqueOrderIds: string[] = [];
    if (type === "ipv6") {
      const orderIdSet = new Set<string>();
      selectedProxiesArray.forEach((proxy) => {
        const orderId = proxy.orderId || proxy.order_id;
        if (orderId) {
          orderIdSet.add(orderId);
        }
      });
      uniqueOrderIds = Array.from(orderIdSet);
      console.log("IPv6 unique order IDs:", uniqueOrderIds);
    } else {
      // For other proxy types, use all selected proxies
      uniqueOrderIds = selectedProxiesArray
        .map((proxy) => proxy.orderId || proxy.order_id)
        .filter((orderId): orderId is string => Boolean(orderId));
    }

    // Track progress
    let successCount = 0;
    let failCount = 0;
    const results: { success: string[]; failed: string[] } = {
      success: [],
      failed: [],
    };

    // Process requests based on unique order IDs
    const prolongPromises = uniqueOrderIds.map(async (orderId, index) => {
      // For IPv6, use the first proxy with this order ID as representative
      const representativeProxy = selectedProxiesArray.find(
        (proxy) => (proxy.orderId || proxy.order_id) === orderId
      );

      if (!representativeProxy) {
        console.warn(`No representative proxy found for order ID: ${orderId}`);
        results.failed.push(orderId);
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        prolongProxyHook(
          {
            orderId: orderId as any,
            type: representativeProxy.type,
            id: representativeProxy.id,
            periodId: prolongPeriod,
          },
          {
            onSuccess: () => {
              console.log(`Successfully prolonged order ${orderId}`);
              results.success.push(orderId);
              resolve();
            },
            onError: (error) => {
              console.error(`Failed to prolong order ${orderId}:`, error);
              results.failed.push(orderId);
              resolve();
            },
          }
        );
      });
    });

    try {
      await Promise.all(prolongPromises);

      successCount = results.success.length;
      failCount = results.failed.length;

      console.log("Batch prolong completed:", {
        successCount,
        failCount,
        results,
      });

      // Show notification
      setNotification({
        show: true,
        message: t("prolongBatchResult", {
          success: successCount,
          fail: failCount,
        }),
        type: successCount > 0 ? "success" : "error",
        showRefresh: true,
      });

      // Clear selection after successful batch operation
      if (successCount > 0) {
        if (onSelectAll) {
          // If we have external select all handler, call it to clear selection
          onSelectAll();
        } else {
          setInternalSelectedProxies(new Set());
        }
      }
    } catch (error) {
      console.error("Error during batch prolong:", error);
      setNotification({
        show: true,
        message: "An error occurred during batch prolonging",
        type: "error",
        showRefresh: false,
      });
    } finally {
      // Always close the popup and reset state
      setProlongProxy(null);
      setIsSubmittingBatchProlong(false);
    }
  };

  // Function to confirm single prolong
  const confirmProlong = () => {
    if (!prolongProxy) return;

    // Check if this is a batch operation
    if ((prolongProxy as any).isBatchOperation) {
      confirmBatchProlong();
      return;
    }

    // Check if we have the required data for single prolong
    // For ISP/IPv6 proxies, use orderId; for resident proxies, use order_id
    const orderId = prolongProxy.orderId || prolongProxy.order_id;

    if (!orderId) {
      setNotification({
        show: true,
        message: t("prolongError"),
        type: "error",
        showRefresh: false,
      });
      setProlongProxy(null);
      return;
    }

    prolongProxyHook(
      {
        orderId: orderId as any,
        type: prolongProxy.type,
        id: prolongProxy.id,
        periodId: prolongPeriod,
      },
      {
        onSuccess: () => {
          setNotification({
            show: true,
            message: t("prolongSuccess"),
            type: "success",
            showRefresh: true,
          });
          setProlongProxy(null);
        },
        onError: (error: any) => {
          setNotification({
            show: true,
            message: t("prolongFailed"),
            type: "error",
            showRefresh: false,
          });
          setProlongProxy(null);
        },
      }
    );
  };

  // Function to cancel the prolong action
  const cancelProlong = () => {
    setProlongProxy(null);
    setIsSubmittingBatchProlong(false);
  };

  // Function to get protocol badge styles
  const getProtocolStyles = (protocol: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: 500,
      border: "1px solid",
    };

    switch (protocol?.toLowerCase()) {
      case "http":
        return {
          ...baseStyle,
          backgroundColor: "rgba(243, 214, 117, 0.1)",
          color: "#f3d675",
          borderColor: "rgba(243, 214, 117, 0.3)",
        };
      case "https":
        return {
          ...baseStyle,
          backgroundColor: "rgba(243, 214, 117, 0.15)",
          color: "#f3d675",
          borderColor: "rgba(243, 214, 117, 0.4)",
        };
      case "socks5":
        return {
          ...baseStyle,
          backgroundColor: "rgba(243, 214, 117, 0.2)",
          color: "#f3d675",
          borderColor: "rgba(243, 214, 117, 0.5)",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "#999999",
          borderColor: "rgba(255, 255, 255, 0.2)",
        };
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (proxyId: string) => {
    const proxy = uniqueProxies.find((p) => p.id === proxyId);

    if (proxy && proxy.type === "resident") {
      setNotification({
        show: true,
        message: t("deleteConfirm"),
        type: "info",
        showRefresh: false,
        isDeleteConfirmation: true,
        proxyToDelete: proxy,
      });
    } else {
      setDeleteConfirmId(proxyId);
    }
  };

  const confirmDelete = (proxyId: string, packageKey?: string) => {
    if (packageKey) {
      deleteProxy(
        { listId: proxyId, packageKey },
        {
          onSuccess: () => {
            setNotification({
              show: true,
              message: t("deleteSuccess"),
              type: "success",
              showRefresh: true,
            });
          },
          onError: (error: any) => {
            setNotification({
              show: true,
              message: t("deleteError", {
                error: error?.message || "Unknown error",
              }),
              type: "error",
              showRefresh: false,
            });
          },
        }
      );
    } else {
      const proxy = uniqueProxies.find((p) => p.id === proxyId);
      if (proxy?.package_list?.[0]?.export?.ext) {
        deleteProxy(
          {
            listId: proxyId,
            packageKey: proxy.package_list[0].export.ext,
          },
          {
            onSuccess: () => {
              setNotification({
                show: true,
                message:
                  "Proxy was successfully deleted. Refresh the page to see changes.",
                type: "success",
                showRefresh: true,
              });
            },
            onError: (error: any) => {
              setNotification({
                show: true,
                message: `Error deleting proxy: ${
                  error?.message || "Unknown error"
                }`,
                type: "error",
                showRefresh: false,
              });
            },
          }
        );
      } else {
        console.error("Could not find package key for proxy", proxyId);
        setNotification({
          show: true,
          message: t("deleteMissingKey"),
          type: "error",
          showRefresh: false,
        });
      }
    }

    if (onDelete) {
      onDelete(proxyId, packageKey);
    }

    setDeleteConfirmId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const handleEditClick = (proxy: Proxy) => {
    setEditingProxy(proxy);
  };

  const handleSaveEdit = (updatedProxy: Proxy) => {
    if (onEdit) {
      onEdit(updatedProxy);
      setNotification({
        show: true,
        message: t("editSuccess"),
        type: "success",
        showRefresh: true,
      });
    }
    setEditingProxy(null);
  };

  const handleCloseEdit = () => {
    setEditingProxy(null);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const exportToTxt = () => {
    if (!uniqueProxies || uniqueProxies.length === 0) return;

    let contentHttpFirstFormat = "";
    let contentHttpSecondFormat = "";

    uniqueProxies.forEach((proxy, index) => {
      if (proxy.type === "resident" && Array.isArray(proxy.package_list)) {
        if (index > 0) return;
        proxy.package_list.forEach((item) => {
          const ip = "185.162.130.86";
          const login = item.login;
          const password = item.password;
          for (let port = 10000; port < 10000 + item.export.ports; port++) {
            contentHttpFirstFormat += `${ip}:${port}:${login}:${password}\n`;
            contentHttpSecondFormat += `${login}:${password}@${ip}:${port}\n`;
          }
        });
      } else {
        const login = proxy.login || "user";
        const password = proxy.password || "pass";
        const full_ip =
          proxy.ip + (proxy.type === "isp" ? `:${proxy.port_http}` : "");

        contentHttpFirstFormat += `${full_ip}:${login}:${password}\n`;
        contentHttpSecondFormat += `${login}:${password}@${full_ip}\n`;
      }
    });

    const fullContent = `${contentHttpFirstFormat}\n${contentHttpSecondFormat}`;

    const createAndDownloadFile = (content: string, fileName: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const dateStr = new Date().toISOString().split("T")[0];

    if (fullContent.trim()) {
      createAndDownloadFile(fullContent, `proxy-http-${dateStr}.txt`);
    }

    setExportMenuOpen(false);
  };

  const exportSocksToTxt = () => {
    if (!uniqueProxies || uniqueProxies.length === 0) return;

    let contentSocksFirstFormat = "";
    let contentSocksSecondFormat = "";

    uniqueProxies.forEach((proxy, index) => {
      if (proxy.type === "resident" && Array.isArray(proxy.package_list)) {
        if (index > 0) return;
        proxy.package_list.forEach((item) => {
          const ip = "185.162.130.86";
          const login = item.login;
          const password = item.password;
          for (let port = 10000; port < 10000 + item.export.ports; port++) {
            contentSocksFirstFormat += `${ip}:${port}:${login}:${password}\n`;
            contentSocksSecondFormat += `socks5://${login}:${password}@${ip}:${port}\n`;
          }
        });
      } else {
        const login = proxy.login || "user";
        const password = proxy.password || "pass";
        const full_ip =
          proxy.ip + (proxy.type === "isp" ? `:${proxy.port_socks}` : "");

        contentSocksFirstFormat += `${full_ip}:${login}:${password}\n`;
        const ip = proxy.ip;
        const port = proxy.port_socks;
        contentSocksSecondFormat += `socks5://${login}:${password}@${ip}:${port}\n`;
      }
    });

    const fullContent = `${contentSocksFirstFormat}\n${contentSocksSecondFormat}`;

    const createAndDownloadFile = (content: string, fileName: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const dateStr = new Date().toISOString().split("T")[0];

    if (fullContent.trim()) {
      createAndDownloadFile(fullContent, `proxy-socks-${dateStr}.txt`);
    }

    setExportMenuOpen(false);
  };

  const handleProlongClick = (proxy: Proxy) => {
    setProlongProxy(proxy);
  };

  const handleDeleteConfirm = () => {
    if (notification?.proxyToDelete) {
      const proxy = notification.proxyToDelete;
      confirmDelete(proxy.id, proxy.package_key);
      setNotification(null);
    }
  };

  // Checkbox styles
  const checkboxContainerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    border: "1px solid rgba(243, 214, 117, 0.3)",
    backgroundColor: "rgba(243, 214, 117, 0.05)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const checkboxCheckedStyle: React.CSSProperties = {
    ...checkboxContainerStyle,
    backgroundColor: "rgba(243, 214, 117, 0.2)",
    borderColor: "rgba(243, 214, 117, 0.5)",
  };

  const checkboxIndeterminateStyle: React.CSSProperties = {
    ...checkboxContainerStyle,
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    borderColor: "rgba(243, 214, 117, 0.4)",
  };

  // Batch action button styles
  const batchActionButtonStyle: React.CSSProperties = {
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    color: "#f3d675",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: selectedProxies.length > 0 ? "pointer" : "not-allowed",
    fontSize: "14px",
    opacity: selectedProxies.length > 0 ? 1 : 0.5,
  };

  // Popup styles
  const popupOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const popupContentStyle: React.CSSProperties = {
    backgroundColor: "#111111",
    borderRadius: "8px",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    padding: "24px",
    width: "400px",
    maxWidth: "90%",
  };

  const popupTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#FFFFFF",
    marginTop: 0,
    marginBottom: "16px",
  };

  const popupFormGroupStyle: React.CSSProperties = {
    marginBottom: "20px",
  };

  const popupLabelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    color: "#f3d675",
    marginBottom: "8px",
  };

  const popupSelectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    backgroundColor: "#000000",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    color: "#FFFFFF",
    fontSize: "14px",
  };

  const popupButtonsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  };

  const popupButtonStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    border: "1px solid rgba(243, 214, 117, 0.2)",
  };

  const popupConfirmButtonStyle: React.CSSProperties = {
    ...popupButtonStyle,
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    color: "#f3d675",
    opacity: isSubmittingBatchProlong ? 0.5 : 1,
    cursor: isSubmittingBatchProlong ? "not-allowed" : "pointer",
  };

  const popupCancelButtonStyle: React.CSSProperties = {
    ...popupButtonStyle,
    backgroundColor: "transparent",
    color: "#FFFFFF",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#000000",
    borderRadius: "8px",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    overflow: "hidden",
  };

  const cardHeaderStyle: React.CSSProperties = {
    padding: "16px 24px",
    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#FFFFFF",
    margin: 0,
  };

  const cardDescriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#f3d675",
    marginTop: "4px",
    marginBottom: 0,
  };

  const cardContentStyle: React.CSSProperties = {
    padding: "0",
  };

  const tableContainerStyle: React.CSSProperties = {
    maxHeight: "400px",
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(243, 214, 117, 0.3) rgba(0, 0, 0, 0.1)",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
  };

  const tableHeadBaseStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    backdropFilter: "blur(4px)",
  };

  const tableHeaderCellStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 500,
    color: "#f3d675",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
  };

  const tableBodyStyle: React.CSSProperties = {};

  const tableRowStyle: React.CSSProperties = {
    borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
    transition: "background-color 0.2s",
  };

  const tableCellStyle: React.CSSProperties = {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#FFFFFF",
  };

  const tableCellEmphasisStyle: React.CSSProperties = {
    ...tableCellStyle,
    fontWeight: 500,
    color: "#f3d675",
  };

  const tableCellMonoStyle: React.CSSProperties = {
    ...tableCellStyle,
    fontFamily: "monospace",
  };

  const countryContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const exportButtonStyle: React.CSSProperties = {
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    color: "#f3d675",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    position: "relative",
  };

  const actionButtonStyle: React.CSSProperties = {
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    color: "#f3d675",
    padding: "6px 10px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    fontSize: "12px",
    marginRight: "6px",
  };

  const actionButtonDangerStyle: React.CSSProperties = {
    ...actionButtonStyle,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderColor: "rgba(255, 59, 48, 0.2)",
    color: "#ff3b30",
  };

  const actionButtonsContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const exportMenuStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "4px",
    backgroundColor: "#111111",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    padding: "8px 0",
    zIndex: 20,
    minWidth: "150px",
    display: exportMenuOpen ? "block" : "none",
  };

  const exportMenuItemStyle: React.CSSProperties = {
    padding: "8px 16px",
    color: "#FFFFFF",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const deleteConfirmContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const deleteConfirmTextStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#ff3b30",
  };

  const deleteConfirmButtonStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    border: "1px solid rgba(255, 59, 48, 0.2)",
    borderRadius: "4px",
    color: "#ff3b30",
    padding: "4px 8px",
    fontSize: "12px",
    cursor: "pointer",
  };

  const deleteCancelButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    color: "#f3d675",
    padding: "4px 8px",
    fontSize: "12px",
    cursor: "pointer",
  };

  const skeletonStyle: React.CSSProperties = {
    height: "16px",
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    borderRadius: "4px",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  const emptyStateContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
    textAlign: "center",
  };

  const emptyStateIconStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    color: "#f3d675",
    marginBottom: "16px",
  };

  const emptyStateTitleStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: 500,
    color: "#FFFFFF",
    margin: 0,
  };

  const emptyStateDescriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#999999",
    marginTop: "4px",
  };

  const scrollbarStyles = `
    .proxy-table-container::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .proxy-table-container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    
    .proxy-table-container::-webkit-scrollbar-thumb {
      background: rgba(243, 214, 117, 0.3);
      border-radius: 4px;
    }
    
    .proxy-table-container::-webkit-scrollbar-thumb:hover {
      background: rgba(243, 214, 117, 0.5);
    }

    @keyframes pulse {
      0% {
        opacity: 0.6;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0.6;
      }
    }
  `;

  // Loading state
  if (uniqueProxies === undefined) {
    return (
      <div style={cardStyle}>
        <style>{scrollbarStyles}</style>
        <div style={cardHeaderStyle}>
          <div>
            <h3 style={cardTitleStyle}>{t("title")}</h3>
            <p style={cardDescriptionStyle}>{t("loading")}</p>
          </div>
        </div>
        <div style={cardContentStyle}>
          <div className="proxy-table-container" style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead style={tableHeadBaseStyle}>
                <tr>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.ipAddress")}
                  </th>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.protocol")}
                  </th>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.httpPort")}
                  </th>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.name")}
                  </th>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.login")}
                  </th>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.password")}
                  </th>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.country")}
                  </th>
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.actions")}
                  </th>
                </tr>
              </thead>
              <tbody style={tableBodyStyle}>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} style={tableRowStyle}>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "120px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "80px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "60px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "100px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "80px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "80px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "100px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "120px" }}></div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (uniqueProxies?.length === 0) {
    return (
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <div>
            <h3 style={cardTitleStyle}>{t("title")}</h3>
            <p style={cardDescriptionStyle}>{t("description")}</p>
          </div>
        </div>
        <div style={emptyStateContainerStyle}>
          <AlertCircle style={emptyStateIconStyle} />
          <h3 style={emptyStateTitleStyle}>{t("emptyTitle")}</h3>
          <p style={emptyStateDescriptionStyle}>{t("emptyDescription")}</p>
        </div>
      </div>
    );
  }

  // Render the select all checkbox with proper state
  const renderSelectAllCheckbox = () => {
    if (type === "resident") return null;

    // Recalculate states to ensure they're current
    const currentAllSelected =
      uniqueProxies.length > 0 &&
      selectedProxies.length === uniqueProxies.length;
    const currentSomeSelected =
      selectedProxies.length > 0 &&
      selectedProxies.length < uniqueProxies.length;

    let checkboxStyle = checkboxContainerStyle;
    let icon = null;

    if (currentAllSelected) {
      checkboxStyle = checkboxCheckedStyle;
      icon = <Check size={14} color="#f3d675" />;
    } else if (currentSomeSelected) {
      checkboxStyle = checkboxIndeterminateStyle;
      icon = (
        <div
          style={{
            width: "8px",
            height: "2px",
            backgroundColor: "#f3d675",
            borderRadius: "1px",
          }}
        />
      );
    }

    return (
      <th style={{ ...tableHeaderCellStyle, width: "40px" }}>
        <div style={checkboxStyle} onClick={handleSelectAll}>
          {icon}
        </div>
      </th>
    );
  };

  return (
    <div style={cardStyle}>
      <style>{scrollbarStyles}</style>
      <div style={cardHeaderStyle}>
        <div>
          <h3 style={cardTitleStyle}>{t("title")}</h3>
          <p style={cardDescriptionStyle}>{t("description")}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Only show batch prolong button for non-resident proxies */}
          {type !== "resident" && selectedProxies.length > 0 && (
            <button
              style={batchActionButtonStyle}
              onClick={handleBatchProlong}
              disabled={selectedProxies.length === 0}
            >
              <span>
                {t("prolongBatchTitle", { count: selectedProxies.length })}
              </span>
            </button>
          )}
          <div style={{ position: "relative" }}>
            <button
              style={exportButtonStyle}
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
            >
              <Download size={16} />
              <span>{t("export")}</span>
            </button>
            <div style={exportMenuStyle}>
              <div
                style={exportMenuItemStyle}
                onClick={exportToTxt}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(243, 214, 117, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <FileText size={16} />
                <span>{t("exportHttp")}</span>
              </div>
              <div
                style={exportMenuItemStyle}
                onClick={exportSocksToTxt}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(243, 214, 117, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <FileJson size={16} />
                <span>{t("exportSocks")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={cardContentStyle}>
        <div className="proxy-table-container" style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={tableHeadBaseStyle}>
              <tr>
                {renderSelectAllCheckbox()}
                {type === "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.name")}
                  </th>
                )}
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.ipAddress")}
                </th>
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.protocol")}
                </th>
                {type === "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.ports")}
                  </th>
                )}
                {type !== "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.httpPort")}
                  </th>
                )}
                {type !== "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.socksPort")}
                  </th>
                )}
                <th style={tableHeaderCellStyle}>{t("table.headers.login")}</th>
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.password")}
                </th>
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.country")}
                </th>
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.expiryDate")}
                </th>
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.actions")}
                </th>
              </tr>
            </thead>
            <tbody style={tableBodyStyle}>
              {uniqueProxies.map((proxy, index) => {
                const isSelected = selectedProxies.includes(proxy.id);

                return (
                  <tr
                    key={index}
                    style={{
                      ...tableRowStyle,
                      backgroundColor: isSelected
                        ? "rgba(243, 214, 117, 0.07)"
                        : index % 2 === 0
                        ? "transparent"
                        : "rgba(243, 214, 117, 0.03)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor =
                          index % 2 === 0
                            ? "transparent"
                            : "rgba(243, 214, 117, 0.03)";
                      }
                    }}
                  >
                    {type !== "resident" && (
                      <td style={tableCellStyle}>
                        <div
                          style={
                            isSelected
                              ? checkboxCheckedStyle
                              : checkboxContainerStyle
                          }
                          onClick={() => handleCheckboxChange(proxy.id)}
                        >
                          {isSelected && <Check size={14} color="#f3d675" />}
                        </div>
                      </td>
                    )}
                    {type === "resident" && (
                      <td style={tableCellEmphasisStyle}>
                        {proxy.title?.slice(0, 6).trim() + "..."}
                      </td>
                    )}
                    <td style={tableCellEmphasisStyle}>{proxy.ip}</td>
                    <td style={tableCellStyle}>
                      <span style={getProtocolStyles(proxy.protocol)}>
                        {proxy.protocol?.toUpperCase()}
                      </span>
                    </td>
                    {type === "resident" && (
                      <td style={tableCellMonoStyle}>{proxy.ports || "—"}</td>
                    )}
                    {type !== "resident" && (
                      <td style={tableCellMonoStyle}>
                        {proxy.port_http || "—"}
                      </td>
                    )}
                    {type !== "resident" && (
                      <td style={tableCellMonoStyle}>
                        {proxy.port_socks || "—"}
                      </td>
                    )}
                    <td style={tableCellMonoStyle}>{proxy.login || "—"}</td>
                    <td style={tableCellMonoStyle}>{proxy.password || "—"}</td>
                    <td style={tableCellStyle}>
                      <div style={countryContainerStyle}>{proxy.country}</div>
                    </td>
                    <td style={tableCellStyle}>{proxy.date_end || "—"}</td>
                    <td style={tableCellStyle}>
                      {deleteConfirmId === proxy.id ? (
                        <div style={deleteConfirmContainerStyle}>
                          <span style={deleteConfirmTextStyle}>
                            {t("deleteConfirm")}
                          </span>
                          <button
                            style={deleteConfirmButtonStyle}
                            onClick={() =>
                              confirmDelete(proxy.id, proxy.package_key)
                            }
                          >
                            {t("deleteYes")}
                          </button>
                          <button
                            style={deleteCancelButtonStyle}
                            onClick={cancelDelete}
                          >
                            {t("deleteNo")}
                          </button>
                        </div>
                      ) : (
                        <div style={actionButtonsContainerStyle}>
                          <button
                            style={actionButtonStyle}
                            onClick={() => handleEditClick(proxy)}
                            title={t("table.buttons.edit")}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            style={actionButtonDangerStyle}
                            onClick={() => handleDeleteClick(proxy.id)}
                            title={t("table.buttons.delete")}
                          >
                            <Trash2 size={14} />
                          </button>
                          {/* Only show auth and prolong buttons for non-resident proxies */}
                          {type !== "resident" && (
                            <>
                              <button
                                style={actionButtonStyle}
                                onClick={() =>
                                  openPopup("ip-auth-enter", {
                                    order_number: proxy.order_number || "",
                                  })
                                }
                                title={t("table.buttons.auth")}
                              >
                                <Key size={14} />
                              </button>
                              <button
                                style={actionButtonStyle}
                                onClick={() => handleProlongClick(proxy)}
                                title={t("table.buttons.prolong")}
                              >
                                <span>{t("prolongConfirm")}</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prolong Popup */}
      {prolongProxy && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle}>
            <h3 style={popupTitleStyle}>
              {(prolongProxy as any).isBatchOperation
                ? t("prolongBatchTitle", { count: selectedProxies.length })
                : t("prolongTitle")}
            </h3>
            <div style={popupFormGroupStyle}>
              <label style={popupLabelStyle}>{t("prolongSelect")}</label>
              <select
                style={popupSelectStyle}
                value={prolongPeriod}
                onChange={(e) => setProlongPeriod(e.target.value)}
              >
                <option value="1m">{t("table.period.1month")}</option>
              </select>
            </div>
            <div style={popupButtonsContainerStyle}>
              <button style={popupCancelButtonStyle} onClick={cancelProlong}>
                {t("prolongCancel")}
              </button>
              <button
                style={popupConfirmButtonStyle}
                onClick={confirmProlong}
                disabled={isSubmittingBatchProlong}
              >
                {isSubmittingBatchProlong
                  ? t("prolongProcessing")
                  : t("prolongConfirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Proxy Popup */}
      {editingProxy && (
        <EditProxyPopup
          proxy={editingProxy}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
          availableCountries={availableCountries}
        />
      )}

      {/* Notification Popup */}
      {notification && notification.show && (
        <NotificationPopup
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
          showRefreshButton={
            notification.showRefresh && !notification.isDeleteConfirmation
          }
          countdown={5}
          showDeleteConfirmation={notification.isDeleteConfirmation}
          onDeleteConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ProxyList;
