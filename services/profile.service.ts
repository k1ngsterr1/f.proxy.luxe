import {BaseService} from "@/services/base.service";

export class ProfileService extends BaseService {
    async getProfile() {
        const response = await this.http.get('/v1/profile');
        return response.data
    }

    async getBalance() {
        const response = await this.http.get('/v1/profile/balance');
        return response.data.balance
    }
}