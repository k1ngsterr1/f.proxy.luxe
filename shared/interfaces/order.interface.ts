export interface FinishOrderDTO {
  orderId: string;
  promocode?: string;
  proxyType?: "HTTPS" | "SOCKS5";
}
