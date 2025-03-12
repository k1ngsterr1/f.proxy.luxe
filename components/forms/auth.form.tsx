"use client";

import { useState } from "react";
import { login } from "@/hooks/login";
import { useAuthStore } from "@/store/use-auth-store";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Некорректный email");
      return;
    }
    if (password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов");
      return;
    }

    setIsSubmitting(true);

    try {
      const loginData = await login({ email, password });

      setToken(loginData.accessToken);

      localStorage.setItem("refreshToken", loginData.refreshToken);
    } catch {
      setError("Неверный email или пароль");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="email"
        className="auth-inp auth-mail"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="auth-inp auth-pass"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}

      <div className="btn-wrap">
        <button type="submit" className="auth-btn btn" disabled={isSubmitting}>
          {isSubmitting ? "Вход..." : "Войти"}
        </button>
      </div>
    </form>
  );
};
