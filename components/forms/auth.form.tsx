"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "@/hooks/login";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { Fancybox } from "@fancyapps/ui";

export const AuthForm = () => {
  const navigate = useRouter();
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

  // ✅ Handle Form Submission
  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const loginData = await login(values);
      saveAccessToken(loginData.accessToken);
      // saveRefreshToken(loginData.refreshToken);
      Fancybox.close();

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
          {/* Email Input */}
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
                style={{ color: "red", fontSize: "14px", marginBottom: "6px" }}
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
