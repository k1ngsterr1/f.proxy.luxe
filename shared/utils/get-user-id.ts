import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (): string | null => {
  try {
    const storage = localStorage.getItem("auth-storage");
    if (!storage) throw new Error("❌ No JWT found in localStorage");

    const token = JSON.parse(storage)?.state?.token;
    if (!token) throw new Error("❌ Token not found in storage");

    const decoded: any = jwtDecode(token);
    return decoded?.sub ?? null;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};
