export interface EmailDTO {
  email: string;
}

export interface SendVerifyCodeDTO {
  code: string;
  email: string | null;
}
