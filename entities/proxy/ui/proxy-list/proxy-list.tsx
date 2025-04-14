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
}

const ProxyList: React.FC<Props> = ({
  proxies,
  type,
  onDelete,
  onEdit,
  availableCountries = [],
  selectedProxies: externalSelectedProxies,
  onSelectProxy,
}) => {
  const t = useTranslations('proxyList');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingProxy, setEditingProxy] = useState<Proxy | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
    showRefresh: boolean;
  } | null>(null);

  // Add a new state for the prolong popup
  const [prolongProxy, setProlongProxy] = useState<Proxy | null>(null);
  const [prolongPeriod, setProlongPeriod] = useState<string>("1m");

  // Add states for checkbox selection
  const [internalSelectedProxies, setInternalSelectedProxies] = useState<
    Set<string>
  >(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [batchActionMenuOpen, setBatchActionMenuOpen] = useState(false);
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

  // Update selectAllChecked when all proxies are selected
  useEffect(() => {
    if (
      uniqueProxies.length > 0 &&
      (externalSelectedProxies
        ? externalSelectedProxies.length === uniqueProxies.length
        : internalSelectedProxies.size === uniqueProxies.length)
    ) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [externalSelectedProxies, internalSelectedProxies, uniqueProxies]);

  const { openPopup } = usePopupStore() as {
    openPopup: (name: string, params?: Record<string, any>) => void;
  };

  const { deleteProxy, isDeleting, deleteError } = useDeleteProxy();
  const {
    prolongProxy: prolongProxyHook,
    isProlonging,
    prolongError,
  } = useProlongProxy();

  // Function to handle checkbox selection
  const handleCheckboxChange = (proxyId: string) => {
    console.log("handleCheckboxChange called with proxyId:", proxyId);

    // Find the proxy with this ID
    const proxy = uniqueProxies.find((p) => p.id === proxyId);

    if (!proxy) {
      console.error("Proxy not found with ID:", proxyId);
      return;
    }

    console.log("Found proxy:", proxy);
    const orderId = proxy.order_id || proxy.orderId;
    console.log("Order ID:", orderId);

    if (!orderId) {
      console.log("No order_id found, using single selection");
      // Fall back to single selection if no order_id is available
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
      return;
    }

    // If we have an external handler, use it
    if (onSelectProxy) {
      console.log("Using external onSelectProxy handler");
      onSelectProxy(proxyId);
    } else {
      // Find all proxies with the same order_id
      const proxiesWithSameOrderId = uniqueProxies.filter(
        (p) => p.order_id === orderId || p.orderId === orderId
      );
      console.log("Proxies with same order_id:", proxiesWithSameOrderId.length);

      // Get all proxy IDs with this order_id
      const proxyIdsWithSameOrderId = proxiesWithSameOrderId.map((p) => p.id);
      console.log("Proxy IDs with same order_id:", proxyIdsWithSameOrderId);

      setInternalSelectedProxies((prev) => {
        const newSelected = new Set(prev);
        // Check if the clicked proxy is already selected
        if (newSelected.has(proxyId)) {
          console.log(
            "Proxy is already selected, deselecting all in this order"
          );
          // Deselect all proxies with this order_id
          proxyIdsWithSameOrderId.forEach((id) => {
            newSelected.delete(id);
          });
        } else {
          console.log("Proxy is not selected, selecting all in this order");
          // Select all proxies with this order_id
          proxyIdsWithSameOrderId.forEach((id) => {
            newSelected.add(id);
          });
        }
        console.log("New selected proxies:", Array.from(newSelected));
        return newSelected;
      });
    }
  };

  // Function to handle select all
  const handleSelectAll = () => {
    if (onSelectProxy && externalSelectedProxies) {
      // If we're using external selection, we need to call onSelectProxy for each proxy
      if (selectAllChecked) {
        // Deselect all - we'll just select the first one to trigger the parent's logic
        if (uniqueProxies.length > 0) {
          onSelectProxy(uniqueProxies[0].id);
        }
      } else {
        // Select all - we'll just select the first one to trigger the parent's logic
        if (uniqueProxies.length > 0) {
          onSelectProxy(uniqueProxies[0].id);
        }
      }
    } else {
      // Using internal selection
      if (selectAllChecked) {
        setInternalSelectedProxies(new Set());
      } else {
        const allIds = uniqueProxies.map((proxy) => proxy.id);
        setInternalSelectedProxies(new Set(allIds));
      }
    }
    setSelectAllChecked(!selectAllChecked);
  };

  // Function to handle batch prolong
  const handleBatchProlong = () => {
    if (selectedProxies.length < 1) {
      setNotification({
        show: true,
        message: t('prolongBatchError'),
        type: "error",
        showRefresh: false,
      });
      return;
    }

    // Open prolong popup with the first selected proxy
    const firstSelectedId = selectedProxies[0];
    const firstSelectedProxy = uniqueProxies.find(
      (p) => p.id === firstSelectedId
    );
    if (firstSelectedProxy) {
      setProlongProxy({
        ...firstSelectedProxy,
        isBatchOperation: true,
      } as Proxy & { isBatchOperation: boolean });
    }
  };

  // Function to confirm batch prolong
  const confirmBatchProlong = () => {
    if (!prolongProxy) return;

    setIsSubmittingBatchProlong(true);

    // Get all selected proxies
    const selectedProxiesArray = uniqueProxies.filter((proxy) =>
      selectedProxies.includes(proxy.id)
    );

    // Track progress
    let successCount = 0;
    let failCount = 0;
    const totalCount = selectedProxiesArray.length;

    // Process each proxy sequentially
    const processProxy = (index: number) => {
      if (index >= selectedProxiesArray.length) {
        // All proxies processed
        setNotification({
          show: true,
          message: t('prolongBatchResult', { success: successCount, fail: failCount }),
          type: successCount > 0 ? "success" : "error",
          showRefresh: true,
        });
        setProlongProxy(null);
        setIsSubmittingBatchProlong(false);
        setInternalSelectedProxies(new Set());
        return;
      }

      const proxy = selectedProxiesArray[index];

      if (!proxy.order_id) {
        // Skip this proxy and move to the next
        failCount++;
        processProxy(index + 1);
        return;
      }

      prolongProxyHook(
        {
          orderId: proxy.orderId as any,
          type: proxy.type,
          id: proxy.id,
          periodId: prolongPeriod,
        },
        {
          onSuccess: () => {
            successCount++;
            processProxy(index + 1);
          },
          onError: () => {
            failCount++;
            processProxy(index + 1);
          },
        }
      );
    };

    // Start processing
    processProxy(0);
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

  // Optional: ISO 3166-1 alpha-2 codes
  const validCountryCodes = [
    "AF",
    "AL",
    "DZ",
    "AS",
    "AD",
    "AO",
    "AI",
    "AQ",
    "AG",
    "AR",
    "AM",
    "AW",
    "AU",
    "AT",
    "AZ",
    "BS",
    "BH",
    "BD",
    "BB",
    "BY",
    "BE",
    "BZ",
    "BJ",
    "BM",
    "BT",
    "BO",
    "BA",
    "BW",
    "BR",
    "BN",
    "BG",
    "BF",
    "BI",
    "KH",
    "CM",
    "CA",
    "CV",
    "KY",
    "CF",
    "TD",
    "CL",
    "CN",
    "CO",
    "KM",
    "CG",
    "CD",
    "CR",
    "HR",
    "CU",
    "CY",
    "CZ",
    "DK",
    "DJ",
    "DM",
    "DO",
    "EC",
    "EG",
    "SV",
    "GQ",
    "ER",
    "EE",
    "SZ",
    "ET",
    "FJ",
    "FI",
    "FR",
    "GA",
    "GM",
    "GE",
    "DE",
    "GH",
    "GR",
    "GD",
    "GT",
    "GN",
    "GW",
    "GY",
    "HT",
    "HN",
    "HU",
    "IS",
    "IN",
    "ID",
    "IR",
    "IQ",
    "IE",
    "IL",
    "IT",
    "CI",
    "JM",
    "JP",
    "JO",
    "KZ",
    "KE",
    "KI",
    "KP",
    "KR",
    "KW",
    "KG",
    "LA",
    "LV",
    "LB",
    "LS",
    "LR",
    "LY",
    "LI",
    "LT",
    "LU",
    "MG",
    "MW",
    "MY",
    "MV",
    "ML",
    "MT",
    "MH",
    "MR",
    "MU",
    "MX",
    "FM",
    "MD",
    "MC",
    "MN",
    "ME",
    "MA",
    "MZ",
    "MM",
    "NA",
    "NR",
    "NP",
    "NL",
    "NZ",
    "NI",
    "NE",
    "NG",
    "MK",
    "NO",
    "OM",
    "PK",
    "PW",
    "PA",
    "PG",
    "PY",
    "PE",
    "PH",
    "PL",
    "PT",
    "QA",
    "RO",
    "RU",
    "RW",
    "KN",
    "LC",
    "VC",
    "WS",
    "SM",
    "ST",
    "SA",
    "SN",
    "RS",
    "SC",
    "SL",
    "SG",
    "SK",
    "SI",
    "SB",
    "SO",
    "ZA",
    "SS",
    "ES",
    "LK",
    "SD",
    "SR",
    "SE",
    "CH",
    "SY",
    "TW",
    "TJ",
    "TZ",
    "TH",
    "TL",
    "TG",
    "TO",
    "TT",
    "TN",
    "TR",
    "TM",
    "TV",
    "UG",
    "UA",
    "AE",
    "GB",
    "US",
    "UY",
    "UZ",
    "VU",
    "VA",
    "VE",
    "VN",
    "YE",
    "ZM",
    "ZW",
  ];

  // Optional overrides
  const countryFlags: Record<string, string> = {
    UK: "🇬🇧", // United Kingdom (ISO code is GB)
    SU: "🇷🇺", // Soviet Union fallback
    AN: "🇳🇱", // Netherlands Antilles → Netherlands
  };

  const getCountryFlag = (countryCode: string): string => {
    if (!countryCode || typeof countryCode !== "string") return "🌐";

    const code = countryCode.toUpperCase().substring(0, 2);
    const normalizedCode = countryFlags[code] ? code : code;

    // Use override if available
    if (countryFlags[normalizedCode]) {
      return countryFlags[normalizedCode];
    }

    // Validate the code if you want to restrict to known ISO codes
    if (!validCountryCodes.includes(normalizedCode)) return "🌐";

    try {
      const regionalIndicatorA = 0x1f1e6;
      const asciiA = "A".charCodeAt(0);

      if (/^[A-Z]{2}$/.test(normalizedCode)) {
        const firstChar =
          normalizedCode.charCodeAt(0) - asciiA + regionalIndicatorA;
        const secondChar =
          normalizedCode.charCodeAt(1) - asciiA + regionalIndicatorA;

        return String.fromCodePoint(firstChar, secondChar);
      }
    } catch (e) {
      console.warn(`Couldn't generate flag for ${countryCode}:`, e);
    }

    return "🌐";
  };

  // Handle delete confirmation
  const handleDeleteClick = (proxyId: string) => {
    setDeleteConfirmId(proxyId);
  };

  // Update the confirmDelete function to use the deleteProxy function directly
  const confirmDelete = (proxyId: string, packageKey?: string) => {
    if (packageKey) {
      // If we have both the ID and package key, send the delete request
      deleteProxy(
        { listId: proxyId, packageKey },
        {
          onSuccess: () => {
            // Show success notification
            setNotification({
              show: true,
              message: t('deleteSuccess'),
              type: "success",
              showRefresh: true,
            });
          },
          onError: (error: any) => {
            // Show error notification
            setNotification({
              show: true,
              message: t('deleteError', { error: error?.message || "Неизвестная ошибка" }),
              type: "error",
              showRefresh: false,
            });
          },
        }
      );
    } else {
      // Find the package key for this proxy if not provided
      const proxy = uniqueProxies.find((p) => p.id === proxyId);
      if (proxy?.package_list?.[0]?.export?.ext) {
        deleteProxy(
          {
            listId: proxyId,
            packageKey: proxy.package_list[0].export.ext,
          },
          {
            onSuccess: () => {
              // Show success notification
              setNotification({
                show: true,
                message:
                  "Прокси был успешно удалён. Чтобы увидеть изменения, обновите страницу.",
                type: "success",
                showRefresh: true,
              });
            },
            onError: (error: any) => {
              // Show error notification
              setNotification({
                show: true,
                message: `Ошибка при удалении прокси: ${error?.message || "Неизвестная ошибка"
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
          message: t('deleteMissingKey'),
          type: "error",
          showRefresh: false,
        });
      }
    }

    // Still call the onDelete prop if provided (for compatibility)
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

      // Show success notification
      setNotification({
        show: true,
        message: t('editSuccess'),
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
        contentSocksSecondFormat += `socks5://${login}:${password}@${full_ip}\n`;
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

  // Add a function to handle the prolong button click
  const handleProlongClick = (proxy: Proxy) => {
    setProlongProxy(proxy);
  };

  // Add a function to handle the prolong action
  const confirmProlong = () => {
    // Check if we have the required data
    if (!prolongProxy?.order_id) {
      setNotification({
        show: true,
        message: t('prolongError'),
        type: "error",
        showRefresh: false,
      });
      setProlongProxy(null);
      return;
    }

    // Check if this is a batch operation
    if ((prolongProxy as any).isBatchOperation) {
      confirmBatchProlong();
      return;
    }

    prolongProxyHook(
      {
        orderId: prolongProxy.order_id,
        type: prolongProxy.type,
        id: prolongProxy.id,
        periodId: prolongPeriod,
      },
      {
        onSuccess: () => {
          setNotification({
            show: true,
            message: t('prolongSuccess'),
            type: "success",
            showRefresh: true,
          });
          setProlongProxy(null);
        },
        onError: (error: any) => {
          setNotification({
            show: true,
            message: t('prolongFailed'),
            type: "error",
            showRefresh: false,
          });
          setProlongProxy(null);
        },
      }
    );
  };

  // Add a function to cancel the prolong action
  const cancelProlong = () => {
    setProlongProxy(null);
    setIsSubmittingBatchProlong(false);
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

  // Add styles for the popup
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
    padding: "0", // Remove padding to allow table to fill the space
  };

  const tableContainerStyle: React.CSSProperties = {
    maxHeight: "400px", // Fixed height for scrolling
    overflow: "auto",
    // Custom scrollbar for Firefox
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(243, 214, 117, 0.3) rgba(0, 0, 0, 0.1)",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
  };

  const tableHeadStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.95)", // Slightly transparent to show content underneath
    position: "sticky",
    top: 0,
    zIndex: 10, // Ensure header stays above table content
    backdropFilter: "blur(4px)", // Add blur effect for modern browsers
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

  const flagStyle: React.CSSProperties = {
    marginRight: "8px",
  };

  // Export button styles
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

  // Delete confirmation styles
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

  // Loading skeleton styles
  const skeletonStyle: React.CSSProperties = {
    height: "16px",
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    borderRadius: "4px",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  // Empty state styles
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

  // Custom scrollbar styles
  const scrollbarStyles = `
    /* Webkit browsers like Chrome/Safari/Edge */
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
            <h3 style={cardTitleStyle}>{t('title')}</h3>
            <p style={cardDescriptionStyle}>
              {t('loading')}
            </p>
          </div>
        </div>
        <div style={cardContentStyle}>
          <div className="proxy-table-container" style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead style={tableHeadStyle}>
                <tr>
                  <th style={tableHeaderCellStyle}>{t('table.headers.ipAddress')}</th>
                  <th style={tableHeaderCellStyle}>{t('table.headers.protocol')}</th>
                  <th style={tableHeaderCellStyle}>{t('table.headers.httpPort')}</th>
                  <th style={tableHeaderCellStyle}>{t('table.headers.name')}</th>
                  <th style={tableHeaderCellStyle}>{t('table.headers.login')}</th>
                  <th style={tableHeaderCellStyle}>{t('table.headers.password')}</th>
                  <th style={tableHeaderCellStyle}>{t('table.headers.country')}</th>
                  <th style={tableHeaderCellStyle}>{t('table.headers.actions')}</th>
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
            <h3 style={cardTitleStyle}>{t('title')}</h3>
            <p style={cardDescriptionStyle}>{t('description')}</p>
          </div>
        </div>
        <div style={emptyStateContainerStyle}>
          <AlertCircle style={emptyStateIconStyle} />
          <h3 style={emptyStateTitleStyle}>{t('emptyTitle')}</h3>
          <p style={emptyStateDescriptionStyle}>
            {t('emptyDescription')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <style>{scrollbarStyles}</style>
      <div style={cardHeaderStyle}>
        <div>
          <h3 style={cardTitleStyle}>{t('title')}</h3>
          <p style={cardDescriptionStyle}>{t('description')}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {selectedProxies.length > 0 && (
            <button
              style={batchActionButtonStyle}
              onClick={handleBatchProlong}
              disabled={selectedProxies.length === 0}
            >
              <span>{t('prolongBatchTitle', { count: selectedProxies.length })}</span>
            </button>
          )}
          <div style={{ position: "relative" }}>
            <button
              style={exportButtonStyle}
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
            >
              <Download size={16} />
              <span>{t('export')}</span>
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
                <span>{t('exportHttp')}</span>
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
                <span>{t('exportSocks')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={cardContentStyle}>
        <div className="proxy-table-container" style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={tableHeadStyle}>
              <tr>
                <th style={{ ...tableHeaderCellStyle, width: "40px" }}>
                  <div
                    style={
                      selectAllChecked
                        ? checkboxCheckedStyle
                        : checkboxContainerStyle
                    }
                    onClick={handleSelectAll}
                  >
                    {selectAllChecked && <Check size={14} color="#f3d675" />}
                  </div>
                </th>
                {type === "resident" && (
                  <th style={tableHeaderCellStyle}>{t('table.headers.name')}</th>
                )}
                <th style={tableHeaderCellStyle}>{t('table.headers.ipAddress')}</th>
                <th style={tableHeaderCellStyle}>{t('table.headers.protocol')}</th>
                {type === "resident" && (
                  <th style={tableHeaderCellStyle}>{t('table.headers.ports')}</th>
                )}
                {type !== "resident" && (
                  <th style={tableHeaderCellStyle}>{t('table.headers.httpPort')}</th>
                )}
                {type !== "resident" && (
                  <th style={tableHeaderCellStyle}>{t('table.headers.socksPort')}</th>
                )}
                <th style={tableHeaderCellStyle}>{t('table.headers.login')}</th>
                <th style={tableHeaderCellStyle}>{t('table.headers.password')}</th>
                <th style={tableHeaderCellStyle}>{t('table.headers.country')}</th>
                <th style={tableHeaderCellStyle}>{t('table.headers.expiryDate')}</th>
                <th style={tableHeaderCellStyle}>{t('table.headers.actions')}</th>
              </tr>
            </thead>
            <tbody style={tableBodyStyle}>
              {uniqueProxies.map((proxy, index) => {
                // Get title from package_list if available
                const title =
                  proxy.package_list && proxy.package_list[0]
                    ? proxy.package_list[0].export.ext
                    : "—";

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
                          <span style={deleteConfirmTextStyle}>{t('deleteConfirm')}</span>
                          <button
                            style={deleteConfirmButtonStyle}
                            onClick={() =>
                              confirmDelete(proxy.id, proxy.package_key)
                            }
                          >
                            {t('deleteYes')}
                          </button>
                          <button
                            style={deleteCancelButtonStyle}
                            onClick={cancelDelete}
                          >
                            {t('deleteNo')}
                          </button>
                        </div>
                      ) : (
                        <div style={actionButtonsContainerStyle}>
                          <button
                            style={actionButtonStyle}
                            onClick={() => handleEditClick(proxy)}
                            title={t('table.buttons.edit')}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            style={actionButtonDangerStyle}
                            onClick={() => handleDeleteClick(proxy.id)}
                            title={t('table.buttons.delete')}
                          >
                            <Trash2 size={14} />
                          </button>
                          {type !== "resident" && (
                            <>
                              <button
                                style={actionButtonStyle}
                                onClick={() =>
                                  openPopup("ip-auth-enter", {
                                    order_number: proxy.order_number || "",
                                  })
                                }
                                title={t('table.buttons.auth')}
                              >
                                <Key size={14} />
                              </button>
                              <button
                                style={actionButtonStyle}
                                onClick={() => handleProlongClick(proxy)}
                                title={t('table.buttons.prolong')}
                              >
                                <span>{t('prolongConfirm')}</span>
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
                ? t('prolongBatchTitle', { count: selectedProxies.length })
                : t('prolongTitle')}
            </h3>
            <div style={popupFormGroupStyle}>
              <label style={popupLabelStyle}>{t('prolongSelect')}</label>
              <select
                style={popupSelectStyle}
                value={prolongPeriod}
                onChange={(e) => setProlongPeriod(e.target.value)}
              >
                <option value="1m">{t('table.period.1month')}</option>
              </select>
            </div>
            <div style={popupButtonsContainerStyle}>
              <button style={popupCancelButtonStyle} onClick={cancelProlong}>
                {t('prolongCancel')}
              </button>
              <button
                style={popupConfirmButtonStyle}
                onClick={confirmProlong}
                disabled={isSubmittingBatchProlong}
              >
                {isSubmittingBatchProlong ? t('prolongProcessing') : t('prolongConfirm')}
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
      {notification && notification.show && (
        <NotificationPopup
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
          showRefreshButton={notification.showRefresh}
          countdown={5}
        />
      )}
    </div>
  );
};

export default ProxyList;
