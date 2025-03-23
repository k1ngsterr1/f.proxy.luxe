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
import { useRouter } from "next/navigation";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { Button } from "@/shared/ui/button";

interface FormValues {
  email: string;
  password: string;
  repeatPassword: string;
  general?: string;
}

export const RegisterAuthForm = () => {
  const navigate = useRouter();
  const { closePopup } = usePopupStore();
  const { saveAccessToken } = useAuthStore();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Некорректный email")
      .required("Поле email обязательно"),
    password: Yup.string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .matches(/[a-zA-Z]/, "Пароль должен содержать хотя бы одну букву")
      .required("Поле пароль обязательно"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Повторите пароль"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      const registerData = await register({
        email: values.email,
        password: values.password,
      });
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
            setErrors({ email: "Пользователь с таким email уже существует" });
          } else {
            setErrors({ general: message || "Ошибка регистрации" });
          }
        } else {
          setErrors({ general: "Неизвестная ошибка. Попробуйте снова." });
        }
      } else {
        setErrors({ general: "Ошибка сети или сервера. Попробуйте позже." });
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
          <Form className="auth-form">
            <Field
              type="email"
              name="email"
              className="auth-inp auth-mail"
              placeholder="E-mail"
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

            <Field
              type="password"
              name="repeatPassword"
              className="auth-inp auth-pass"
              placeholder="Повторите пароль"
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
                name={isSubmitting ? "Вход..." : "Войти"}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
