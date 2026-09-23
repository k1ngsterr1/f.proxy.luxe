"use client";

import { Check, Loader2, Trash2, X } from "lucide-react";
import { createElement as h, useState } from "react";
import { useDeleteIpAuthorization } from "@/entities/auth/hooks/mutations/use-delete-ip-authorization.mutation";
import { useIpAuthorizations } from "@/entities/auth/hooks/queries/use-ip-authorizations.query";
import { useTranslations } from "next-intl";

interface IpAuthorizationListProps {
  orderId: string;
  providerProxyId?: string;
}

const rowStyle = {
  alignItems: "center",
  borderBottom: "1px solid rgba(243, 214, 117, 0.16)",
  display: "flex",
  gap: "12px",
  justifyContent: "space-between",
  minHeight: "56px",
  padding: "10px 0",
} as const;

const iconButtonStyle = {
  alignItems: "center",
  background: "transparent",
  border: "1px solid rgba(243, 214, 117, 0.35)",
  borderRadius: "6px",
  color: "#f3d675",
  cursor: "pointer",
  display: "inline-flex",
  height: "36px",
  justifyContent: "center",
  padding: 0,
  width: "36px",
} as const;

export function IpAuthorizationList({
  orderId,
  providerProxyId,
}: IpAuthorizationListProps) {
  const t = useTranslations("proxyList.ipAuth");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const { data, error, isLoading } = useIpAuthorizations(
    orderId,
    providerProxyId,
  );
  const deleteMutation = useDeleteIpAuthorization();

  const renderActions = (authorizationId: string, ip: string) => {
    const isConfirming = confirmingId === authorizationId;
    const isDeleting = isConfirming && deleteMutation.isPending;
    const isComplete = isConfirming && deleteMutation.isSuccess;
    const isMutationSettled = isDeleting || isComplete;

    if (!isConfirming) {
      const removeLabel = t("remove", { ip });
      return h(
        "button",
        {
          "aria-label": removeLabel,
          disabled: deleteMutation.isPending,
          onClick: () => {
            deleteMutation.reset();
            setConfirmingId(authorizationId);
          },
          style: {
            ...iconButtonStyle,
            color: "#ff7b7b",
            opacity: deleteMutation.isPending ? 0.55 : 1,
          },
          title: removeLabel,
          type: "button",
        },
        h(Trash2, { "aria-hidden": true, size: 16 }),
      );
    }

    return [
      h(
        "button",
        {
          "aria-label": t("confirmRemove"),
          disabled: isMutationSettled,
          key: "confirm",
          onClick: () => {
            deleteMutation.mutate({
              orderId,
              authorizationId,
              ...(providerProxyId && { providerProxyId }),
            });
          },
          style: { ...iconButtonStyle, opacity: isMutationSettled ? 0.55 : 1 },
          title: t("confirmRemove"),
          type: "button",
        },
        isDeleting
          ? h(Loader2, {
              "aria-hidden": true,
              className: "animate-spin",
              size: 16,
            })
          : h(Check, { "aria-hidden": true, size: 16 }),
      ),
      h(
        "button",
        {
          "aria-label": t("cancelRemove"),
          disabled: isDeleting,
          key: "cancel",
          onClick: () => setConfirmingId(null),
          style: { ...iconButtonStyle, opacity: isDeleting ? 0.55 : 1 },
          title: t("cancelRemove"),
          type: "button",
        },
        h(X, { "aria-hidden": true, size: 16 }),
      ),
    ];
  };

  return h(
    "section",
    {
      "aria-labelledby": "current-ip-authorizations",
      style: {
        borderTop: "1px solid rgba(243, 214, 117, 0.24)",
        marginTop: "24px",
        paddingTop: "20px",
        width: "100%",
      },
    },
    h(
      "h3",
      {
        id: "current-ip-authorizations",
        style: { color: "#f3d675", fontSize: "14px", margin: "0 0 8px" },
      },
      t("currentAuthorizations"),
    ),
    isLoading &&
      h(
        "div",
        {
          role: "status",
          style: {
            alignItems: "center",
            color: "#f3d675",
            display: "flex",
            gap: "8px",
            minHeight: "56px",
          },
        },
        h(Loader2, { "aria-hidden": true, className: "animate-spin", size: 16 }),
        t("currentAuthorizations"),
      ),
    !isLoading &&
      error &&
      h(
        "p",
        {
          role: "alert",
          style: {
            color: "#ff7b7b",
            margin: 0,
            minHeight: "56px",
            paddingTop: "16px",
          },
        },
        t("loadError"),
      ),
    !isLoading &&
      !error &&
      data?.items.length === 0 &&
      h(
        "p",
        {
          style: {
            color: "rgba(255, 255, 255, 0.72)",
            margin: 0,
            minHeight: "56px",
            paddingTop: "16px",
          },
        },
        t("emptyAuthorizations"),
      ),
    !isLoading &&
      !error &&
      data?.items.map((authorization) => {
        const isConfirming = confirmingId === authorization.id;
        const hasDeleteError = isConfirming && deleteMutation.isError;
        const hasDeleteSuccess = isConfirming && deleteMutation.isSuccess;

        return h(
          "div",
          { key: authorization.id, style: rowStyle },
          h(
            "div",
            { style: { minWidth: 0 } },
            h(
              "div",
              {
                style: {
                  color: "#FFFFFF",
                  fontFamily: "monospace",
                  overflowWrap: "anywhere",
                },
              },
              authorization.ip,
            ),
            h(
              "div",
              {
                style: {
                  color: authorization.active
                    ? "#8ddc8d"
                    : "rgba(255, 255, 255, 0.62)",
                  fontSize: "12px",
                  marginTop: "2px",
                },
              },
              authorization.active ? t("active") : t("inactive"),
            ),
            hasDeleteError &&
              h(
                "div",
                {
                  role: "alert",
                  style: { color: "#ff7b7b", fontSize: "12px", marginTop: "4px" },
                },
                t("removeError"),
              ),
            hasDeleteSuccess &&
              h(
                "div",
                {
                  role: "status",
                  style: { color: "#8ddc8d", fontSize: "12px", marginTop: "4px" },
                },
                t("removeSuccess"),
              ),
          ),
          h(
            "div",
            {
              style: {
                alignItems: "center",
                display: "flex",
                flexShrink: 0,
                gap: "8px",
                minHeight: "36px",
              },
            },
            renderActions(authorization.id, authorization.ip),
          ),
        );
      }),
  );
}
