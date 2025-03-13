import { AuthService } from "@/services/auth.service";
import { PayService } from "@/services/pay.service";
import { ProfileService } from "@/services/profile.service";

export const Services = {
  Auth: new AuthService(),
  Pay: new PayService(),
  Profile: new ProfileService(),
};
