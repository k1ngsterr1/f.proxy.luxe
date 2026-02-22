export interface LoginUser {
  email: string;
  password: string;
  captchaToken?: string;
}

export interface LoginRDO {
  accessToken: string;
  refreshToken: string;
}
