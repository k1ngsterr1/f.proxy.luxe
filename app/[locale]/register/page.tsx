import { RegisterAuthForm } from "@/features/auth/register";

export default function RegisterPage() {
  return (
    <main className="inner-page">
      <title>Proxy Luxe | Регистрация</title>
      <div style={{ maxWidth: "40%", margin: "auto" }}>
        <RegisterAuthForm />
      </div>
    </main>
  );
}
