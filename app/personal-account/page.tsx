"use client";
import "@/assets/styles/style.css";
import { PayForm } from "@/components/forms/pay.form";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { AlertMessage } from "@/shared/ui/alert";
import { Loader } from "@/shared/ui/loader";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useIsFetching } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PersonalAccount() {
  const navigate = useRouter();
  const { token } = useAuthStore();
  const { data } = useGetUser();
  const isMobile = useIsMobile();
  const isFetching = useIsFetching();

  useEffect(() => {
    if (!token) {
      const timeout = setTimeout(() => {
        navigate.push("/");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [token, navigate]);

  return (
    <>
      {isFetching ? (
        <Loader fullScreen />
      ) : (
        <div
          className="personal_account"
          style={{
            display: "flex",
            flexDirection: "row",
            width: isMobile ? "100%" : "75%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginLeft: isMobile ? 0 : 64,
                marginBottom: 32,
              }}
            >
              {data?.isVerified === false && (
                <AlertMessage
                  type="warning"
                  message="Вам необходимо подтвердить свой email введя код, указанной в письме."
                />
              )}
            </div>
            <div
              className="main_cont"
              style={{
                width: "100%",
              }}
            >
              <PayForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
