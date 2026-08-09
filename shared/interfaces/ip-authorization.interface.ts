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

export interface IpAuthorization {
  id: string;
  ip: string;
  active: boolean;
  orderNumber: string;
}

export interface IpAuthorizationListResponse {
  items: IpAuthorization[];
}
