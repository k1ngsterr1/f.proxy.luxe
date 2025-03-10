"use client";

import { register } from "@/hooks/register";
import { useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Fixed typo

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear error if passwords match
    register({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
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
      <input
        type="password"
        className="auth-inp auth-pass"
        placeholder="Повторить пароль"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {error && (
        <p
          className="text-red-500"
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}
      <div className="btn-wrap">
        <button className="auth-btn btn" type="submit">
          регистрация
        </button>
      </div>
    </form>
  );
};
