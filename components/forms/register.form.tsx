"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Fancybox } from "@fancyapps/ui";
import { register } from "@/hooks/register";

export const RegisterForm = () => {
  // ✅ Validation Schema
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

  // ✅ Handle Form Submission
  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      await register(values);
      Fancybox.close(); // ✅ Close Fancybox on successful registration
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", repeatPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className="auth-form">
          {/* Email Input */}
          <Field
            type="text"
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
                <div style={{ color: "red", fontSize: "14px" }}>{msg}</div>
              )}
            </ErrorMessage>
          </div>

          {/* Password Input */}
          <div
            style={{
              marginBottom: 12,
            }}
          >
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
          </div>
          {/* Repeat Password Input */}
          <Field
            type="password"
            name="repeatPassword"
            className="auth-inp auth-pass"
            placeholder="Повторить пароль"
            style={errors.repeatPassword ? { border: "2px solid red" } : {}}
          />
          <ErrorMessage name="repeatPassword">
            {(msg) => (
              <div
                style={{ color: "red", fontSize: "14px", marginBottom: "6px" }}
              >
                {msg}
              </div>
            )}
          </ErrorMessage>

          {/* Submit Button */}
          <div className="btn-wrap">
            <button
              type="submit"
              className="auth-btn btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Регистрация..." : "Регистрация"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
