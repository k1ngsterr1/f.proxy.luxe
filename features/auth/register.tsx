"use client";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import { register } from "@/entities/auth/api/post/register.api";
import { useRouter, useSearchParams } from "next/navigation";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { Button } from "@/shared/ui/button";
import { useTranslations } from "next-intl";

interface FormValues {
  email: string;
  password: string;
  repeatPassword: string;
  general?: string;
}

export const RegisterAuthForm = () => {

  const searchParams = useSearchParams();
  const referralId = searchParams.get("ref");

  console.log("referral id из ссылки:", referralId);

  const navigate = useRouter();
  const { closePopup } = usePopupStore();
  const { saveAccessToken } = useAuthStore();
  const i18n = useTranslations();
  const validationI18n = useTranslations("validation");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(validationI18n("email.invalid"))
      .required(validationI18n("email.required")),
    password: Yup.string()
      .min(8, validationI18n("password.minLength"))
      .matches(/[a-zA-Z]/, validationI18n("password.letterRequired"))
      .required(validationI18n("password.required")),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], validationI18n("confirmPassword.match"))
      .required(validationI18n("confirmPassword.required")),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      const registerData = await register({
        email: values.email,
        password: values.password,
        referralId: referralId,
      });

      console.log(registerData)

      localStorage.setItem("email", values.email);
      saveAccessToken(registerData.accessToken);
      closePopup("auth-reg");
      navigate.push("/verification-code");
    } catch (error: any) {
      console.error("Ошибка регистрации:", error);

      if (error.response && error.response.data) {
        const { statusCode, message } = error.response.data;

        if (statusCode === 400) {
          if (message.includes("User with this email already exists")) {
            setErrors({ email: i18n("auth.errors.emailExists") });
          } else {
            setErrors({
              general: message || i18n("auth.errors.registrationError"),
            });
          }
        } else {
          setErrors({ general: i18n("auth.errors.unknownError") });
        }
      } else {
        setErrors({ general: i18n("auth.errors.networkError") });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        email: "",
        password: "",
        repeatPassword: "",
        general: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<FormValues>) => {
        const { isSubmitting, errors } = formikProps;

        return (
          <Form className="auth-form" autoComplete="off">
            <Field
              type="email"
              name="email"
              className="auth-inp auth-mail"
              placeholder={i18n("auth.email.placeholder")}
              style={errors.email ? { border: "2px solid red" } : {}}
            />
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

            <Field
              type="password"
              name="password"
              className="auth-inp auth-pass"
              placeholder={i18n("auth.password.placeholder")}
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

            <Field
              type="password"
              name="repeatPassword"
              className="auth-inp auth-pass"
              placeholder={i18n("auth.confirmPassword.placeholder")}
              style={errors.repeatPassword ? { border: "2px solid red" } : {}}
            />
            <ErrorMessage name="repeatPassword">
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

            {/* General Error Message */}
            {errors.general && (
              <div
                style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}
              >
                {errors.general}
              </div>
            )}

            <div className="btn-wrap">
              <Button
                type="submit"
                variant="big"
                disabled={isSubmitting}
                name={
                  isSubmitting
                    ? i18n("auth.register.processing")
                    : i18n("auth.register.button")
                }
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
