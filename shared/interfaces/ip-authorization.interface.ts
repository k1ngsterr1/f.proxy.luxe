export interface IpAuthRequest {
  orderNumber: string;
  ip: string;
}

export interface IpAuthResponse {
  success: boolean;
  message?: string;
  proxy_data?: {
    ip: string;
    port: number;
    status: "ACTIVE" | "INACTIVE";
  };
}
