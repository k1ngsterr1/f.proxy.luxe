"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useRouter } from "next/navigation";
import { Fancybox } from "@fancyapps/ui";
import { login } from "@/entities/auth/api/post/login.api";
import Link from "next/link";
import { useEffect } from "react";
import { usePopupStore } from "@/shared/store/use-popup.store";

export const LoginAuthForm = () => {
  const navigate = useRouter();
  const { closePopup } = usePopupStore();
  const { saveAccessToken, saveRefreshToken } = useAuthStore();

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Некорректный email")
      .required("Поле email обязательно"),
    password: Yup.string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Поле пароль обязательно"),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      event?.preventDefault();
      const loginData = await login(values);
      saveAccessToken(loginData.accessToken);
      closePopup("auth-enter");
      navigate.push("/personal-account");
    } catch {
      setErrors({ general: "Неверный email или пароль" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }: any) => (
        <Form className="auth-form">
          <Field
            type="email"
            name="email"
            className="auth-inp auth-mail"
            placeholder="E-mail"
            style={errors.email ? { border: "2px solid red" } : {}}
          />
          <div
            style={{
              marginBottom: 12,
            }}
          >
            <ErrorMessage name="email">
              {(msg) => (
                <div
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </div>
          <Field
            type="password"
            name="password"
            className="auth-inp auth-pass"
            placeholder="Пароль"
            style={errors.password ? { border: "2px solid red" } : {}}
          />
          <ErrorMessage name="password">
            {(msg) => (
              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginBottom: "6px",
                }}
              >
                {msg}
              </div>
            )}
          </ErrorMessage>
          {errors.general && (
            <div
              style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}
            >
              {errors.general}
            </div>
          )}
          <Link
            href="/forgot-password"
            style={{
              marginTop: 4,
              fontSize: 16,
              color: "#fade4c",
            }}
          >
            Забыли пароль?
          </Link>
          <div className="btn-wrap">
            <button
              type="submit"
              className="auth-btn btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Вход..." : "Войти"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
