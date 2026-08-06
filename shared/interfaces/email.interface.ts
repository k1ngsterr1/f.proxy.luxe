export interface EmailDTO {
  email: string;
}

export interface SendVerifyCodeDTO {
  code: string;
  email: string | null;
}

export interface SendResetEmailDTO {
  email: string;
  lang: "ru" | "en";
}
