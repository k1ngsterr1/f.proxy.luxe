"use client";

import "@/assets/styles/style.css";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { AlertMessage } from "@/shared/ui/alert";
import { Loader } from "@/shared/ui/loader";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { PayForm } from "@/widgets/forms/pay-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PersonalAccount() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data, isLoading, isError } = useGetUser();
  const isMobile = useIsMobile();
  const i18n = useTranslations("personal-account");
  const t = useTranslations();
  const [isClient, setIsClient] = useState(false);

  // This ensures we only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle authentication check
  useEffect(() => {
    // Only run this effect on the client side after hydration
    if (!isClient) return;

    // If not authenticated, redirect immediately
    if (!isAuthenticated()) {
      router.replace("/");
    }
  }, [isAuthenticated, router, isClient]);

  // If we're not on the client yet, show nothing to prevent flash of content
  if (!isClient) {
    return null;
  }

  // If not authenticated, show loading while redirecting
  if (!isAuthenticated()) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <AlertMessage
          type="error"
          message={i18n("error-loading") || "Error loading user data"}
        />
      </div>
    );
  }

  // If no data is available, show an error
  if (!data) {
    return (
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <AlertMessage
          type="error"
          message={i18n("no-user-data") || "No user data available"}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className="personal_account"
        style={{
          display: "flex",
          flexDirection: "row",
          width: isMobile ? "100%" : "75%",
        }}
      >
        <title>{t("personal-accounts.title")}</title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              marginLeft: isMobile ? 0 : 64,
              marginBottom: 32,
            }}
          >
            {data.isVerified === false && (
              <AlertMessage
                type="warning"
                isEmail={true}
                message={i18n("verify-alert")}
              />
            )}
          </div>
          <div
            className="main_cont"
            style={{
              width: "100%",
            }}
          >
            {data.id && <PayForm userId={data.id as string} />}
          </div>
        </div>
      </div>
    </>
  );
}
