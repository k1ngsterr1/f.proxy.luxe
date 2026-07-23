"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Download,
  Edit,
  FileJson,
  FileText,
  Key,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { usePopupStore } from "@/shared/store/use-popup.store";
import EditProxyPopup from "../edit-proxy-popup/edit-proxy-popup";
import { useDeleteProxy } from "@/entities/residental-proxy/api/hooks/mutations/use-delete-resident-proxy.mutation";
import NotificationPopup from "../notification-popup/notification-popup";
import { useProlongProxy } from "@/entities/residental-proxy/api/hooks/mutations/use-prolong-proxy.mutatuion";
import { useTranslations, useLocale } from "next-intl";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { apiClient } from "@/shared/config/apiClient";

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
  type: string; // "isp", "ipv6", "resident", etc.
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
  const locale = useLocale();
  const { data: userData } = useGetUser(); // Получаем данные пользователя с балансом
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

  const [internalSelectedProxies, setInternalSelectedProxies] = useState<
    Set<string>
  >(new Set());
  const [isSubmittingBatchProlong, setIsSubmittingBatchProlong] =
    useState(false);
  const [batchProlongProcessing, setBatchProlongProcessing] = useState(false);
  const [batchProlongCompleted, setBatchProlongCompleted] = useState(false);
  const [forceClosePopup, setForceClosePopup] = useState(false);

  const [uniqueProxies, setUniqueProxies] = useState<Proxy[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const selectedProxies =
    externalSelectedProxies || Array.from(internalSelectedProxies);

  // Функция для получения сообщения о недостаточном балансе с fallback
  const getInsufficientFundsMessage = (
    cost: number,
    userBalance: number,
    shortfall: number
  ): string => {
    // Используем fallback сообщения напрямую, пока не разберемся с переводами
    const isRussian = locale === "ru";
    return isRussian
      ? `Недостаточно средств для продления. Нужно: $${cost.toFixed(
          2
        )}, баланс: $${userBalance.toFixed(
          2
        )}, не хватает: $${shortfall.toFixed(2)}`
      : `Insufficient funds for prolongation. Required: $${cost.toFixed(
          2
        )}, balance: $${userBalance.toFixed(
          2
        )}, shortfall: $${shortfall.toFixed(2)}`;
  };

  // Function to calculate prolongation cost
  const calculateProlongationCost = (
    proxyType: string,
    period: string,
    count: number = 1
  ): number => {
    const prices: Record<string, number> = {
      isp: 2.4,
      ipv6: 0.08,
      ipv4: 2.4, // Assuming same as ISP
      resident: 2.4, // Default price for resident
    };

    // Use the passed type or default to component type
    const typeToUse = proxyType?.toLowerCase() || type?.toLowerCase() || "isp";
    const basePrice = prices[typeToUse] || 2.4;

    // Period multiplier - assuming 1m = 1 month base price
    let periodMultiplier = 1;
    switch (period) {
      case "1m":
        periodMultiplier = 1;
        break;
      case "2m":
        periodMultiplier = 2;
        break;
      case "3m":
        periodMultiplier = 3;
        break;
      default:
        periodMultiplier = 1;
    }

    return basePrice * periodMultiplier * count;
  };

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

  const sortedProxies = [...uniqueProxies].sort((a, b) => {
    const dateA = a.date_end ? new Date(a.date_end).getTime() : Number.NaN;
    const dateB = b.date_end ? new Date(b.date_end).getTime() : Number.NaN;
    const hasDateA = Number.isFinite(dateA);
    const hasDateB = Number.isFinite(dateB);

    if (!hasDateA && !hasDateB) return 0;
    if (!hasDateA) return 1;
    if (!hasDateB) return -1;

    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Auto-close popup when batch operation completes
  useEffect(() => {
    if (
      batchProlongCompleted &&
      prolongProxy &&
      (prolongProxy as any).isBatchOperation
    ) {
      console.log("Auto-closing popup due to batch completion");
      setProlongProxy(null);
      setBatchProlongCompleted(false);
    }
  }, [batchProlongCompleted, prolongProxy]);

  // Force close popup immediately when forceClosePopup is true
  useEffect(() => {
    if (forceClosePopup) {
      console.log("Force closing popup immediately");
      setProlongProxy(null);
      setForceClosePopup(false);
      setIsSubmittingBatchProlong(false);
      setBatchProlongProcessing(false);
    }
  }, [forceClosePopup]);

  const allSelected =
    uniqueProxies.length > 0 && selectedProxies.length === uniqueProxies.length;

  const { openPopup } = usePopupStore() as {
    openPopup: (name: string, params?: Record<string, any>) => void;
  };

  const { deleteProxy } = useDeleteProxy(); // Removed unused isDeleting, deleteError
  const {
    prolongProxy: prolongProxyHook,
    isProlonging,
    reset: resetProlongHook,
    // prolongError, // Removed unused prolongError
  } = useProlongProxy();

  // Direct API call function for batch operations to avoid hook conflicts
  const directProlongCall = async (params: {
    orderId: string;
    type: string;
    id: string;
    periodId: string;
  }): Promise<void> => {
    console.log("directProlongCall called with params:", params);

    try {
      const response = await apiClient.post("/api/v1/products/prolong", params);
      console.log("API response data:", response.data);
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  const handleCheckboxChange = (proxyId: string) => {
    if (onSelectProxy) {
      onSelectProxy(proxyId);
    } else {
      setInternalSelectedProxies((prev) => {
        const newSelected = new Set(prev);
        if (newSelected.has(proxyId)) {
          newSelected.delete(proxyId);
        } else {
          newSelected.add(proxyId);
        }
        return newSelected;
      });
    }
  };

  const handleSelectAll = () => {
    if (type === "resident") {
      return;
    }

    if (onSelectAll) {
      onSelectAll();
    } else {
      if (allSelected) {
        setInternalSelectedProxies(new Set());
      } else {
        const allIds = uniqueProxies.map((proxy) => proxy.id);
        setInternalSelectedProxies(new Set(allIds));
      }
    }
  };

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

    // Проверяем, есть ли данные о пользователе
    if (!userData) {
      setNotification({
        show: true,
        message: "Ошибка: не удалось получить данные пользователя",
        type: "error",
        showRefresh: false,
      });
      return;
    }

    // Проверяем баланс для группового продления
    const cost = calculateProlongationCost(
      type,
      prolongPeriod,
      selectedProxies.length
    );
    const userBalance = Number(userData?.balance) || 0;

    if (userBalance < cost) {
      const shortfall = cost - userBalance;

      setNotification({
        show: true,
        message: getInsufficientFundsMessage(cost, userBalance, shortfall),
        type: "error",
        showRefresh: false,
      });
      return;
    }

    setProlongProxy({
      id: "batch",
      type: type, // Pass the main component type
      isBatchOperation: true,
    } as Proxy & { isBatchOperation: boolean });
  };

  const confirmBatchProlong = async () => {
    if (!prolongProxy) return;
    if (isSubmittingBatchProlong || batchProlongProcessing) {
      console.log("Already submitting batch prolong, returning", {
        isSubmittingBatchProlong,
        batchProlongProcessing,
      });
      return;
    }

    console.log("Resetting prolong hook state before batch operation");
    resetProlongHook();

    console.log("Setting both batch states to true");
    setIsSubmittingBatchProlong(true);
    setBatchProlongProcessing(true);
    setBatchProlongCompleted(false);
    setForceClosePopup(false);
    console.log("Starting batch prolongation process");

    const selectedProxiesArray = uniqueProxies.filter((p) =>
      selectedProxies.includes(p.id)
    );

    console.log(
      "Starting batch prolong for proxies:",
      selectedProxiesArray.map((p) => ({
        id: p.id,
        order_id: p.order_id,
        orderId: p.orderId,
        type: p.type,
      }))
    );

    let itemsToProlong: {
      identifier: string; // This will be orderId or proxyId depending on type
      representativeProxy: Proxy;
    }[] = [];

    // Use the `type` prop passed to the ProxyList component to determine strategy
    if (type === "isp") {
      const orderMap = new Map<string, string[]>();
      selectedProxiesArray.forEach((proxy) => {
        const key = proxy.order_id ?? "no-order";
        const arr = orderMap.get(key) ?? [];
        arr.push(proxy.id);
        orderMap.set(key, arr);
      });

      itemsToProlong = Array.from(orderMap.entries()).map(([orderId, ids]) => {
        const rep = selectedProxiesArray.find((p) => p.order_id === orderId)!;
        return {
          identifier: ids.join(", "), // e.g. "isp1, isp2, isp3"
          representativeProxy: rep,
        };
      });

      console.log(
        "ISP – grouped IDs by orderId:",
        itemsToProlong.map(
          (item) =>
            `order ${item.representativeProxy.order_id}: ${item.identifier}`
        )
      );
    } else if (type === "ipv6") {
      const orderMap = new Map<string, string[]>();
      selectedProxiesArray.forEach((proxy) => {
        const key = proxy.order_id ?? "no-order";
        const arr = orderMap.get(key) ?? [];
        arr.push(proxy.id);
        orderMap.set(key, arr);
      });

      // Для каждого order_id делаем по одному элементу itemsToProlong
      itemsToProlong = Array.from(orderMap.entries()).map(([orderId, ids]) => {
        // representativeProxy — первый прокси из этой группы (если нужен)
        const rep = selectedProxiesArray.find((p) => p.order_id === orderId)!;
        return {
          identifier: ids.join(", "),
          representativeProxy: rep,
        };
      });

      console.log(
        "IPv6 – grouped IDs by orderId:",
        itemsToProlong.map(
          (item) =>
            `order ${item.representativeProxy.order_id}: ${item.identifier}`
        )
      );
    } else {
      // Handle other types or return if not applicable
      console.warn("Batch prolong not configured for type:", type);
      console.log("Setting both batch states to false (unsupported type)");
      setIsSubmittingBatchProlong(false);
      setBatchProlongProcessing(false);
      setProlongProxy(null); // Close popup
      return;
    }

    let successCount = 0;
    let failCount = 0;
    const results: { success: string[]; failed: string[] } = {
      success: [],
      failed: [],
    };

    const prolongPromises = itemsToProlong.map(async (item) => {
      const { identifier, representativeProxy } = item;
      const idForProlongHook = identifier;

      return new Promise<void>(async (resolve) => {
        try {
          console.log(`Starting prolongation for item: ${identifier}`);
          console.log(
            "Using orderId:",
            representativeProxy.orderId || representativeProxy.order_id
          );

          // Use direct API call instead of hook for batch operations
          await directProlongCall({
            orderId:
              representativeProxy.orderId ||
              (representativeProxy.order_id as string),
            type: representativeProxy.type,
            id: idForProlongHook as any,
            periodId: prolongPeriod,
          });

          console.log(`Successfully prolonged item ${identifier}`);
          results.success.push(identifier);
          resolve();
        } catch (error) {
          console.error(`Failed to prolong item ${identifier}:`, error);
          console.error("Error details:", {
            identifier,
            representativeProxy,
            prolongPeriod,
            error: error instanceof Error ? error.message : error,
          });
          results.failed.push(identifier);
          resolve();
        }
      });
    });

    try {
      console.log(`Starting Promise.all for ${prolongPromises.length} items`);
      await Promise.all(prolongPromises);
      console.log("Promise.all completed successfully");

      successCount = results.success.length;
      failCount = results.failed.length;

      console.log("Batch prolong completed:", {
        successCount,
        failCount,
        results,
      });

      // Immediately close popup and reset states
      console.log("Immediately closing popup and resetting states");
      setProlongProxy(null);
      setIsSubmittingBatchProlong(false);
      setBatchProlongProcessing(false);
      setForceClosePopup(false);

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
      if (successCount > 0) {
        if (onSelectAll) {
          onSelectAll();
        } else {
          setInternalSelectedProxies(new Set());
        }
      }
    } catch (error) {
      console.error("Error during batch prolong:", error);

      // Immediately close popup and reset states
      console.log(
        "Immediately closing popup and resetting states (error case)"
      );
      setProlongProxy(null);
      setIsSubmittingBatchProlong(false);
      setBatchProlongProcessing(false);
      setForceClosePopup(false);

      // Show error notification
      setNotification({
        show: true,
        message: "An error occurred during batch prolonging",
        type: "error",
        showRefresh: false,
      });
    }
  };

  const confirmProlong = () => {
    if (!prolongProxy) return;

    console.log("confirmProlong called with:", {
      isBatchOperation: (prolongProxy as any).isBatchOperation,
      isSubmittingBatchProlong,
      batchProlongProcessing,
      isProlonging,
    });

    // For batch operations, only check isSubmittingBatchProlong
    if ((prolongProxy as any).isBatchOperation) {
      if (isSubmittingBatchProlong || batchProlongProcessing) {
        console.log("Batch operation already in progress, returning");
        return;
      }
      console.log("Starting batch prolong");
      confirmBatchProlong();
      return;
    }

    // For single operations, check isProlonging
    if (isProlonging) {
      console.log("Single operation already in progress, returning");
      return;
    }

    console.log("Starting single prolong");

    // Проверяем, есть ли данные о пользователе
    if (!userData) {
      setNotification({
        show: true,
        message: "Ошибка: не удалось получить данные пользователя",
        type: "error",
        showRefresh: false,
      });
      setProlongProxy(null);
      return;
    }

    // Проверяем баланс еще раз перед отправкой запроса
    const cost = calculateProlongationCost(
      prolongProxy.type || type,
      prolongPeriod,
      1
    );
    const userBalance = Number(userData?.balance) || 0;

    if (userBalance < cost) {
      const shortfall = cost - userBalance;

      setNotification({
        show: true,
        message: getInsufficientFundsMessage(cost, userBalance, shortfall),
        type: "error",
        showRefresh: false,
      });
      setProlongProxy(null);
      return;
    }

    let idForSingleProlongHook: string | undefined;
    // Use prolongProxy.type which is set when prolongProxy state is set
    if (prolongProxy.type === "isp") {
      idForSingleProlongHook = prolongProxy.id;
    } else {
      idForSingleProlongHook = prolongProxy.order_id || prolongProxy.orderId;
    }

    if (!idForSingleProlongHook) {
      setNotification({
        show: true,
        message: t("prolongError"),
        type: "error",
        showRefresh: false,
      });
      setProlongProxy(null);
      return;
    }
    console.log("worked for single");

    prolongProxyHook(
      {
        orderId: prolongProxy.orderId as string,
        type: prolongProxy.type,
        id: idForSingleProlongHook as any,
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
          // Проверяем, является ли ошибка связанной с недостаточным балансом
          if (
            error?.response?.data?.message === "Insufficient balance" ||
            error?.message === "Insufficient balance"
          ) {
            const cost = calculateProlongationCost(
              prolongProxy.type || type,
              prolongPeriod,
              1
            );
            const userBalance = Number(userData?.balance) || 0;
            const shortfall = cost - userBalance;

            setNotification({
              show: true,
              message: getInsufficientFundsMessage(
                cost,
                userBalance,
                shortfall
              ),
              type: "error",
              showRefresh: false,
            });
          } else {
            setNotification({
              show: true,
              message: t("prolongFailed"),
              type: "error",
              showRefresh: false,
            });
          }
          setProlongProxy(null);
        },
      }
    );
  };

  const cancelProlong = () => {
    console.log("Canceling prolong - resetting all states");
    setProlongProxy(null);
    setIsSubmittingBatchProlong(false);
    setBatchProlongProcessing(false);
    setBatchProlongCompleted(false);
    setForceClosePopup(false);
  };

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
    const action = packageKey
      ? { listId: proxyId, packageKey }
      : {
          listId: proxyId,
          packageKey: uniqueProxies.find((p) => p.id === proxyId)
            ?.package_list?.[0]?.export?.ext,
        };

    if (!action.packageKey && type === "resident") {
      // Ensure resident proxies have a packageKey
      console.error("Could not find package key for resident proxy", proxyId);
      setNotification({
        show: true,
        message: t("deleteMissingKey"),
        type: "error",
        showRefresh: false,
      });
      setDeleteConfirmId(null);
      return;
    }

    deleteProxy(action as any, {
      onSuccess: () =>
        setNotification({
          show: true,
          message: t("deleteSuccess"),
          type: "success",
          showRefresh: true,
        }),
      onError: (error: any) =>
        setNotification({
          show: true,
          message: t("deleteError", {
            error: error?.message || "Unknown error",
          }),
          type: "error",
          showRefresh: false,
        }),
    });

    if (onDelete) onDelete(proxyId, packageKey);
    setDeleteConfirmId(null);
  };

  const cancelDelete = () => setDeleteConfirmId(null);
  const handleEditClick = (proxy: Proxy) => setEditingProxy(proxy);

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

  const handleCloseEdit = () => setEditingProxy(null);
  const closeNotification = () => setNotification(null);

  const exportToTxt = () => {
    if (!uniqueProxies || uniqueProxies.length === 0) return;
    let contentHttpFirstFormat = "";
    let contentHttpSecondFormat = "";
    uniqueProxies.forEach((proxy, index) => {
      if (proxy.type === "resident" && Array.isArray(proxy.package_list)) {
        if (index > 0 && type === "resident") return; // For resident, export only first package list
        proxy.package_list.forEach((item) => {
          const ip = "204.155.30.92";
          const login = item.login;
          const password = item.password;
          for (let port = 10000; port < 10000 + item.export.ports; port++) {
            contentHttpFirstFormat += `${ip}:${port}:${login}:${password}\n`;
            contentHttpSecondFormat += `${login}:${password}@${ip}:${port}\n`;
          }
        });
      } else {
        if (proxy.type === "isp") {
          const login = proxy.login || "user";
          const password = proxy.password || "pass";
          const full_ip =
            proxy.ip + (proxy.port_http ? `:${proxy.port_http}` : "");
          contentHttpFirstFormat += `${full_ip}:${login}:${password}\n`;
          contentHttpSecondFormat += `${login}:${password}@${full_ip}\n`;
        } else {
          const login = proxy.login || "user";
          const password = proxy.password || "pass";
          contentHttpFirstFormat += `${proxy.ip}:${login}:${password}\n`;
          contentHttpSecondFormat += `${login}:${password}@${proxy.ip}\n`;
        }
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
    if (fullContent.trim())
      createAndDownloadFile(fullContent, `proxy-http-${dateStr}.txt`);
    setExportMenuOpen(false);
  };

  const exportSocksToTxt = () => {
    if (!uniqueProxies || uniqueProxies.length === 0) return;
    let contentSocksFirstFormat = "";
    let contentSocksSecondFormat = "";
    uniqueProxies.forEach((proxy, index) => {
      if (proxy.type === "resident" && Array.isArray(proxy.package_list)) {
        if (index > 0 && type === "resident") return;
        proxy.package_list.forEach((item) => {
          const ip = "204.155.30.92";
          const login = item.login;
          const password = item.password;
          for (let port = 10000; port < 10000 + item.export.ports; port++) {
            contentSocksFirstFormat += `${ip}:${port}:${login}:${password}\n`;
            contentSocksSecondFormat += `socks5://${login}:${password}@${ip}:${port}\n`;
          }
        });
      } else {
        if (proxy.type === "isp") {
          const login = proxy.login || "user";
          const password = proxy.password || "pass";
          const full_ip =
            proxy.ip + (proxy.port_socks ? `:${proxy.port_socks}` : "");
          contentSocksFirstFormat += `${full_ip}:${login}:${password}\n`;
          const ip = proxy.ip;
          const port = proxy.port_socks;
          contentSocksSecondFormat += `socks5://${login}:${password}@${ip}:${port}\n`;
        } else {
          const login = proxy.login || "user";
          const password = proxy.password || "pass";
          contentSocksFirstFormat += `${proxy.ip}:${login}:${password}\n`;
          contentSocksSecondFormat += `socks5://${login}:${password}@${proxy.ip}\n`;
        }
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
    if (fullContent.trim())
      createAndDownloadFile(fullContent, `proxy-socks-${dateStr}.txt`);
    setExportMenuOpen(false);
  };

  const handleProlongClick = (proxy: Proxy) => {
    // Проверяем, есть ли данные о пользователе
    if (!userData) {
      setNotification({
        show: true,
        message: "Ошибка: не удалось получить данные пользователя",
        type: "error",
        showRefresh: false,
      });
      return;
    }

    // Проверяем баланс перед открытием модального окна продления
    const cost = calculateProlongationCost(
      proxy.type || type,
      prolongPeriod,
      1
    );
    const userBalance = Number(userData?.balance) || 0;

    if (userBalance < cost) {
      const shortfall = cost - userBalance;

      setNotification({
        show: true,
        message: getInsufficientFundsMessage(cost, userBalance, shortfall),
        type: "error",
        showRefresh: false,
      });
      return;
    }

    // Только если баланс достаточен, открываем модальное окно
    setProlongProxy(proxy);
  };
  const handleDeleteConfirm = () => {
    if (notification?.proxyToDelete) {
      const proxy = notification.proxyToDelete;
      confirmDelete(proxy.id, proxy.package_key);
      setNotification(null);
    }
  };

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
    position: "relative",
  };
  const popupTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#FFFFFF",
    marginTop: 0,
    marginBottom: "16px",
  };
  const popupCloseButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "transparent",
    border: "none",
    color: "#f3d675",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const popupHeaderStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: "16px",
  };
  const popupFormGroupStyle: React.CSSProperties = { marginBottom: "20px" };
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
    opacity: 1, // Will be controlled by disabled state
    cursor: "pointer", // Will be controlled by disabled state
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
  const cardContentStyle: React.CSSProperties = { padding: "0" };
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
  .proxy-table-container::-webkit-scrollbar { width: 8px; height: 8px; }
  .proxy-table-container::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); border-radius: 4px; }
  .proxy-table-container::-webkit-scrollbar-thumb { background: rgba(243, 214, 117, 0.3); border-radius: 4px; }
  .proxy-table-container::-webkit-scrollbar-thumb:hover { background: rgba(243, 214, 117, 0.5); }
  @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 0.3; } 100% { opacity: 0.6; } }
`;

  if (uniqueProxies === undefined) {
    return (
      <div style={cardStyle}>
        {" "}
        <style>{scrollbarStyles}</style>{" "}
        <div style={cardHeaderStyle}>
          {" "}
          <div>
            {" "}
            <h3 style={cardTitleStyle}>{t("title")}</h3>{" "}
            <p style={cardDescriptionStyle}>{t("loading")}</p>{" "}
          </div>{" "}
        </div>{" "}
        <div style={cardContentStyle}>
          {" "}
          <div className="proxy-table-container" style={tableContainerStyle}>
            {" "}
            <table style={tableStyle}>
              {" "}
              <thead style={tableHeadBaseStyle}>
                {" "}
                <tr>
                  {" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.ipAddress")}
                  </th>{" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.protocol")}
                  </th>{" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.httpPort")}
                  </th>{" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.name")}
                  </th>{" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.login")}
                  </th>{" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.password")}
                  </th>{" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.country")}
                  </th>{" "}
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.actions")}
                  </th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} style={tableRowStyle}>
                      {" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "120px" }}></div>
                      </td>{" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "80px" }}></div>
                      </td>{" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "60px" }}></div>
                      </td>{" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "100px" }}></div>
                      </td>{" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "80px" }}></div>
                      </td>{" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "80px" }}></div>
                      </td>{" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "100px" }}></div>
                      </td>{" "}
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "120px" }}></div>
                      </td>{" "}
                    </tr>
                  ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }

  if (uniqueProxies?.length === 0) {
    return (
      <div style={cardStyle}>
        {" "}
        <div style={cardHeaderStyle}>
          {" "}
          <div>
            {" "}
            <h3 style={cardTitleStyle}>{t("title")}</h3>{" "}
            <p style={cardDescriptionStyle}>{t("description")}</p>{" "}
          </div>{" "}
        </div>{" "}
        <div style={emptyStateContainerStyle}>
          {" "}
          <AlertCircle style={emptyStateIconStyle} />{" "}
          <h3 style={emptyStateTitleStyle}>{t("emptyTitle")}</h3>{" "}
          <p style={emptyStateDescriptionStyle}>{t("emptyDescription")}</p>{" "}
        </div>{" "}
      </div>
    );
  }

  const renderSelectAllCheckbox = () => {
    if (type === "resident") return null;
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
        {" "}
        <div style={checkboxStyle} onClick={handleSelectAll}>
          {" "}
          {icon}{" "}
        </div>{" "}
      </th>
    );
  };

  return (
    <div style={cardStyle}>
      {" "}
      <style>{scrollbarStyles}</style>{" "}
      <div style={cardHeaderStyle}>
        {" "}
        <div>
          {" "}
          <h3 style={cardTitleStyle}>{t("title")}</h3>{" "}
          <p style={cardDescriptionStyle}>
            {t("description")}
            {userData?.balance !== undefined && (
              <span
                style={{
                  marginLeft: "16px",
                  color: "#f3d675",
                  fontWeight: "500",
                }}
              >
                {t("balance")}: ${(Number(userData.balance) || 0).toFixed(2)}
              </span>
            )}
          </p>{" "}
        </div>{" "}
        <div style={{ display: "flex", gap: "10px" }}>
          {" "}
          {type !== "resident" && selectedProxies.length > 0 && (
            <button
              style={batchActionButtonStyle}
              onClick={handleBatchProlong}
              disabled={selectedProxies.length === 0}
            >
              {" "}
              <span>
                {t("prolongBatchTitle", { count: selectedProxies.length })} ($
                {calculateProlongationCost(
                  type,
                  prolongPeriod,
                  selectedProxies.length
                ).toFixed(2)}
                )
              </span>{" "}
            </button>
          )}{" "}
          <div style={{ position: "relative" }}>
            {" "}
            <button
              style={exportButtonStyle}
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
            >
              {" "}
              <Download size={16} /> <span>{t("export")}</span>{" "}
            </button>{" "}
            <div style={exportMenuStyle}>
              {" "}
              <div
                style={exportMenuItemStyle}
                onClick={exportToTxt}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(243, 214, 117, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {" "}
                <FileText size={16} /> <span>{t("exportHttp")}</span>{" "}
              </div>{" "}
              <div
                style={exportMenuItemStyle}
                onClick={exportSocksToTxt}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(243, 214, 117, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {" "}
                <FileJson size={16} /> <span>{t("exportSocks")}</span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div style={cardContentStyle}>
        {" "}
        <div className="proxy-table-container" style={tableContainerStyle}>
          {" "}
          <table style={tableStyle}>
            {" "}
            <thead style={tableHeadBaseStyle}>
              {" "}
              <tr>
                {" "}
                {renderSelectAllCheckbox()}{" "}
                {type === "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.name")}
                  </th>
                )}{" "}
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.ipAddress")}
                </th>{" "}
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.protocol")}
                </th>{" "}
                {type === "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.ports")}
                  </th>
                )}{" "}
                {type !== "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.httpPort")}
                  </th>
                )}{" "}
                {type !== "resident" && (
                  <th style={tableHeaderCellStyle}>
                    {t("table.headers.socksPort")}
                  </th>
                )}{" "}
                <th style={tableHeaderCellStyle}>{t("table.headers.login")}</th>{" "}
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.password")}
                </th>{" "}
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.country")}
                </th>{" "}
                <th
                  style={{ ...tableHeaderCellStyle, cursor: "pointer", userSelect: "none" }}
                  onClick={toggleSort}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {t("table.headers.expiryDate")}
                    {sortDirection === "asc" ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                  </span>
                </th>{" "}
                <th style={tableHeaderCellStyle}>
                  {t("table.headers.actions")}
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {sortedProxies.map((proxy, index) => {
                const isSelected = selectedProxies.includes(proxy.id);
                return (
                  <tr
                    key={proxy.id + "-" + index}
                    style={{
                      ...tableRowStyle,
                      backgroundColor: isSelected
                        ? "rgba(243, 214, 117, 0.07)"
                        : index % 2 === 0
                        ? "transparent"
                        : "rgba(243, 214, 117, 0.03)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.backgroundColor =
                          index % 2 === 0
                            ? "transparent"
                            : "rgba(243, 214, 117, 0.03)";
                    }}
                  >
                    {" "}
                    {type !== "resident" && (
                      <td style={tableCellStyle}>
                        {" "}
                        <div
                          style={
                            isSelected
                              ? checkboxCheckedStyle
                              : checkboxContainerStyle
                          }
                          onClick={() => handleCheckboxChange(proxy.id)}
                        >
                          {" "}
                          {isSelected && (
                            <Check size={14} color="#f3d675" />
                          )}{" "}
                        </div>{" "}
                      </td>
                    )}{" "}
                    {type === "resident" && (
                      <td style={tableCellEmphasisStyle}>
                        {proxy.title?.slice(0, 6).trim() + "..."}
                      </td>
                    )}{" "}
                    <td style={tableCellEmphasisStyle}>{proxy.ip}</td>{" "}
                    <td style={tableCellStyle}>
                      <span style={getProtocolStyles(proxy.protocol)}>
                        {proxy.protocol?.toUpperCase()}
                      </span>
                    </td>{" "}
                    {type === "resident" && (
                      <td style={tableCellMonoStyle}>{proxy.ports || "—"}</td>
                    )}{" "}
                    {type !== "resident" && (
                      <td style={tableCellMonoStyle}>
                        {proxy.port_http || "—"}
                      </td>
                    )}{" "}
                    {type !== "resident" && (
                      <td style={tableCellMonoStyle}>
                        {proxy.port_socks || "—"}
                      </td>
                    )}{" "}
                    <td style={tableCellMonoStyle}>{proxy.login || "—"}</td>{" "}
                    <td style={tableCellMonoStyle}>{proxy.password || "—"}</td>{" "}
                    <td style={tableCellStyle}>
                      <div style={countryContainerStyle}>{proxy.country}</div>
                    </td>{" "}
                    <td style={tableCellStyle}>{proxy.date_end || "—"}</td>{" "}
                    <td style={tableCellStyle}>
                      {" "}
                      {deleteConfirmId === proxy.id ? (
                        <div style={deleteConfirmContainerStyle}>
                          {" "}
                          <span style={deleteConfirmTextStyle}>
                            {t("deleteConfirm")}
                          </span>{" "}
                          <button
                            style={deleteConfirmButtonStyle}
                            onClick={() =>
                              confirmDelete(proxy.id, proxy.package_key)
                            }
                          >
                            {t("deleteYes")}
                          </button>{" "}
                          <button
                            style={deleteCancelButtonStyle}
                            onClick={cancelDelete}
                          >
                            {t("deleteNo")}
                          </button>{" "}
                        </div>
                      ) : (
                        <div style={actionButtonsContainerStyle}>
                          {" "}
                          <button
                            style={actionButtonStyle}
                            onClick={() => handleEditClick(proxy)}
                            title={t("table.buttons.edit")}
                          >
                            <Edit size={14} />
                          </button>{" "}
                          <button
                            style={actionButtonDangerStyle}
                            onClick={() => handleDeleteClick(proxy.id)}
                            title={t("table.buttons.delete")}
                          >
                            <Trash2 size={14} />
                          </button>{" "}
                          {type !== "resident" && (
                            <>
                              {" "}
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
                              </button>{" "}
                              <button
                                style={actionButtonStyle}
                                onClick={() => handleProlongClick(proxy)}
                                title={`${t(
                                  "table.buttons.prolong"
                                )} - $${calculateProlongationCost(
                                  proxy.type || type,
                                  prolongPeriod,
                                  1
                                ).toFixed(2)} за ${prolongPeriod}`}
                              >
                                <span>
                                  {t("prolongConfirm")} ($
                                  {calculateProlongationCost(
                                    proxy.type || type,
                                    prolongPeriod,
                                    1
                                  ).toFixed(2)}
                                  )
                                </span>
                              </button>{" "}
                            </>
                          )}{" "}
                        </div>
                      )}{" "}
                    </td>{" "}
                  </tr>
                );
              })}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>{" "}
      {prolongProxy && (
        <div
          style={popupOverlayStyle}
          onClick={(e) => {
            // Close popup when clicking on overlay
            if (e.target === e.currentTarget) {
              cancelProlong();
            }
          }}
        >
          {" "}
          <div style={popupContentStyle}>
            {" "}
            <div style={popupHeaderStyle}>
              {" "}
              <h3 style={popupTitleStyle}>
                {(prolongProxy as any).isBatchOperation
                  ? t("prolongBatchTitle", { count: selectedProxies.length })
                  : t("prolongTitle")}
              </h3>{" "}
              <button
                style={popupCloseButtonStyle}
                onClick={cancelProlong}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(243, 214, 117, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <X size={20} />
              </button>{" "}
            </div>{" "}
            <div style={popupFormGroupStyle}>
              {" "}
              <label style={popupLabelStyle}>{t("prolongSelect")}</label>{" "}
              <select
                style={popupSelectStyle}
                value={prolongPeriod}
                onChange={(e) => setProlongPeriod(e.target.value)}
              >
                {" "}
                <option value="1m">{t("table.period.1month")}</option>{" "}
                <option value="2m">{t("table.period.2months")}</option>{" "}
                <option value="3m">{t("table.period.3months")}</option>{" "}
              </select>{" "}
            </div>{" "}
            {/* Cost Display */}
            <div
              style={{
                ...popupFormGroupStyle,
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "16px",
                border: "1px solid rgba(243, 214, 117, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: "4px",
                }}
              >
                {t("prolongCost")}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                $
                {(prolongProxy as any).isBatchOperation
                  ? calculateProlongationCost(
                      type,
                      prolongPeriod,
                      selectedProxies.length
                    ).toFixed(2)
                  : calculateProlongationCost(
                      prolongProxy.type || type,
                      prolongPeriod,
                      1
                    ).toFixed(2)}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.7)",
                  marginTop: "4px",
                }}
              >
                {(prolongProxy as any).isBatchOperation
                  ? `${selectedProxies.length} ${
                      selectedProxies.length === 1 ? "proxy" : "proxies"
                    } × ${prolongPeriod}`
                  : `1 proxy × ${prolongPeriod}`}
              </div>
            </div>{" "}
            <div style={popupButtonsContainerStyle}>
              {" "}
              <button style={popupCancelButtonStyle} onClick={cancelProlong}>
                {t("prolongCancel")}
              </button>{" "}
              <button
                style={popupConfirmButtonStyle}
                onClick={confirmProlong}
                disabled={
                  (prolongProxy as any).isBatchOperation
                    ? isSubmittingBatchProlong || batchProlongProcessing
                    : isProlonging
                }
              >
                {(prolongProxy as any).isBatchOperation
                  ? isSubmittingBatchProlong || batchProlongProcessing
                    ? t("prolongProcessing")
                    : t("prolongConfirm")
                  : isProlonging
                  ? t("prolongProcessing")
                  : t("prolongConfirm")}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {editingProxy && (
        <EditProxyPopup
          proxy={editingProxy}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
          availableCountries={availableCountries}
        />
      )}{" "}
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
      )}{" "}
    </div>
  );
};

export default ProxyList;
