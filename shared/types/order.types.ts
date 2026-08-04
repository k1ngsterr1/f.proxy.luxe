export interface Orders {
  country?: string;
  quantity: number;
  periodDays: string;
  totalPrice: number;
  proxyType?: "HTTPS" | "SOCKS5";
  tariff?: string;
  type: string;
}
