export interface RegisterUser {
  email: string;
  password: string;
  referralId?: string | null;
  captchaToken?: string;
}
