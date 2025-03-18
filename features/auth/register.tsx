"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Fancybox } from "@fancyapps/ui";
import { register } from "@/entities/auth/model/post/register.api";

export const RegisterAuthForm = () => {
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
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      await register({ email: values.email, password: values.password });
      Fancybox.close(); // ✅ Close Fancybox on successful registration
    } catch (error) {
      console.error("Ошибка регистрации:", error);
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
          {/* Password Input */}
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

          {/* General Error Message */}
          {errors.general && (
            <div
              style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}
            >
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
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
