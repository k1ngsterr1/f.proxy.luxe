import axios from "axios";

const BASE_URL = "https://aproxyluxe-production.up.railway.app";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const decoded: { exp: number } = jwtDecode(token);
//     const currentTime = Math.floor(Date.now() / 1000);
//     return decoded.exp < currentTime;
//   } catch (err) {
//     console.error("Failed to decode JWT:", err);
//     return true;
//   }
// };

// // ✅ **Request Interceptor: Attach JWT from `localStorage`**
// apiClient.interceptors.request.use(
//   (config) => {
//     const jwtToken = localStorage.getItem("jwt"); // Get token from localStorage

//     if (jwtToken && !isTokenExpired(jwtToken)) {
//       config.headers.Authorization = `Bearer ${jwtToken}`; // Attach token
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ **Response Interceptor: Handle Expired Token**
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const jwtToken = localStorage.getItem("jwt");

//     if (
//       window.location.pathname === "/login" ||
//       window.location.pathname === "/" ||
//       window.location.pathname === "/registration" ||
//       window.location.pathname === "/like"
//     ) {
//       return Promise.reject(error);
//     }

//     if (jwtToken) {
//       if (isTokenExpired(jwtToken)) {
//         console.log("JWT is expired. Redirecting to /login.");
//         localStorage.removeItem("jwt"); // Remove expired token
//         // window.location.href = "/login"; // Uncomment if needed
//       }
//     } else {
//       console.log("No JWT token found. Redirecting to /login.");
//       // window.location.href = "/login"; // Uncomment if needed
//     }

//     return Promise.reject(error);
//   }
// );
