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
import { Button } from "@/shared/ui/button";
import { useTranslations } from "next-intl";

export const LoginAuthForm = () => {
  const navigate = useRouter();
  const { closePopup } = usePopupStore();
  const { saveAccessToken, saveRefreshToken } = useAuthStore();
  const i18n = useTranslations();
  const validationI18n = useTranslations("validation");

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(validationI18n("email.invalid"))
      .required(validationI18n("email.required")),
    password: Yup.string()
      .min(8, validationI18n("password.minLength"))
      .required(validationI18n("password.required")),
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
      setErrors({ general: validationI18n("general.invalidCredentials") });
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
        <Form
          className="auth-form"
          style={{
            maxWidth: 920,
            margin: "auto",
          }}
        >
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
            placeholder="Password"
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
            {i18n("forgot-password.title")}
          </Link>
          <div className="btn-wrap">
            <Button
              type="submit"
              variant="big"
              style={{
                marginTop: 16,
              }}
              disabled={isSubmitting}
              name={isSubmitting ? i18n("auth.login.processing") : i18n("auth.login.button")}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
